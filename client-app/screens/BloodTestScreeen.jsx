import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Consult } from './../constants/styles';
import userService from "../services/UserService";
import bookingService from './../services/BookingService';
import { useNavigation } from '@react-navigation/native';

export default function BloodTestScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [bookingData, setBookingData] = useState({
    userId: '',
    appointment: '',
    booking_type: "bloodTest"
  });

  const handleChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await bookingService.createBooking(bookingData);
      Alert.alert('สำเร็จ', 'ลงทะเบียนสำเร็จแล้ว', [
        {
          text: 'ตกลง',
          onPress: () => navigation.goBack,
        },
      ]);
    } catch (error) {
      console.error('booking error: ', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถจองคิวได้');
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        setUser(res.data.data);
        setBookingData((prev) => ({
          ...prev,
          userId: res.data.data.id, // Assuming `id` is the user ID
        }));
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    handleChange('appointment', date.toISOString()); // Format date for bookingData
    hideDatePicker();
  };

  return (
    <View style={Consult.container}>
      {user ? (
        <View>
          <Text style={Consult.title}>ชื่อ-นามสกุล</Text>
          <TextInput
            style={Consult.input}
            placeholder="กรุณากรอกชื่อ-นามสกุล"
            value={`${user.title}.${user.full_name}`}
            editable={false}
          />

          <Text style={Consult.title}>เบอร์โทรศัพท์</Text>
          <TextInput
            style={Consult.input}
            placeholder="กรุณากรอกเบอร์โทรศัพท์"
            keyboardType="phone-pad"
            value={user.phone}
            editable={false}
          />
        </View>
      ) : (
        <View>
          <Text style={Consult.title}>ชื่อ-นามสกุล</Text>
          <TextInput style={Consult.input} placeholder="กรุณากรอกชื่อ-นามสกุล" />

          <Text style={Consult.title}>เบอร์โทรศัพท์</Text>
          <TextInput style={Consult.input} placeholder="กรุณากรอกเบอร์โทรศัพท์" keyboardType="phone-pad" />
        </View>
      )}

      <Text style={Consult.title}>กำหนดวัน และ เวลาที่ต้องการจอง</Text>
      <TouchableOpacity style={Consult.button} onPress={showDatePicker}>
        <Text style={Consult.buttonText}>เลือกวัน และ เวลาที่่ต้องการจอง</Text>
      </TouchableOpacity>

      {selectedDate && (
        <TextInput
          value={selectedDate.toLocaleString()}
          style={Consult.input}
          editable={false}
        />
      )}

      <TouchableOpacity style={Consult.confirmButton} onPress={handleSubmit}>
        <Text style={Consult.confirmButtonText}>ยืนยัน</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
