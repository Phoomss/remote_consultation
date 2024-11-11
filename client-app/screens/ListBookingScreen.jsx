import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Consult, styles } from '../constants/styles';
import ProfileCard from '../components/ProfileCard';
import bookingService from './../services/BookingService';

export default function ListBookingScreen() {
  const [bookingInfo, setBookingInfo] = useState([]);

  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const data = await bookingService.bookingInfo();
        setBookingInfo(data);
      } catch (error) {
        console.error("Failed to fetch booking information", error);
      }
    };

    fetchBookingInfo();
  }, []);

  const handleDelete = async (bookingId) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณต้องการลบการจองนี้ใช่หรือไม่?",
      [
        { text: "ยกเลิก", style: "cancel" },
        { 
          text: "ลบ", 
          onPress: async () => {
            try {
              await bookingService.deleteBooking(bookingId);
              setBookingInfo(prevInfo => prevInfo.filter(booking => booking.id !== bookingId));
              Alert.alert("สำเร็จ", "การจองถูกลบแล้ว");
            } catch (error) {
              console.error("Failed to delete booking", error);
              Alert.alert("ผิดพลาด", "ไม่สามารถลบการจองได้");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  // Function to format date and time
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('th-TH', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  return (
    <View style={styles.main}>
      <ProfileCard />
      <View style={[styles.servicesContainer, { paddingHorizontal: 16, paddingVertical: 10 }]}>
        <Text style={[Consult.header]}>
          สรุปรายการนัดหมาย
        </Text>
        <ScrollView style={{ marginTop: 10 }}>
          {bookingInfo.map((booking, index) => (
            <View key={index} style={[Consult.card]}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: '#555' }}>
                {formatDateTime(booking.appointment)}
              </Text>
              <Text style={{ fontSize: 16, marginTop: 4, color: '#777' }}>
                {booking.booking_type === 'bloodTest' ? 'จองคิวเจาะเลือด' : 'จองคิวปรึกษา'}
              </Text>
              <Text style={{ fontSize: 16, marginTop: 4, color: '#777' }}>
                {booking.booking_detail}
              </Text>
              <TouchableOpacity onPress={() => handleDelete(booking.id)} style={{ marginTop: 10 }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>ลบการจอง</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
