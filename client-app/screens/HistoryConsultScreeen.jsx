import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Consult, styles } from '../constants/styles';
import ProfileCard from '../components/ProfileCard';
import caseService from './../services/caseService';

export default function HistoryConsultScreeen() {
  const [caseInfo, setCaseInfo] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchCaseInfo = async () => {
      try {
        const data = await caseService.caseuserInfo();
        setCaseInfo(data.data.data);
      } catch (error) {
        console.error("Failed to fetch caseItem information", error);
        setError("ไม่สามารถดึงข้อมูลได้ในขณะนี้"); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCaseInfo();
  }, []);

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

  if (loading) {
    return (
      <View style={styles.main}>
        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
          กำลังโหลดข้อมูล...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <ProfileCard />
      <View style={[styles.servicesContainer, { paddingHorizontal: 16, paddingVertical: 10 }]}>
        <Text style={[Consult.header]}>ประวัติการเข้าปรึกษา</Text>
        <ScrollView style={{ marginTop: 10 }}>
          {error ? (
            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
          ) : caseInfo.length > 0 ? (
            caseInfo.map((caseItem, index) => (
              <View key={index} style={[Consult.card]}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#555' }}>
                  {formatDateTime(caseItem.createdAt)}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 4, color: '#777' }}>
                  เจ้าหน้าที่ให้คำปรึกษา: {caseItem.physician.title}{caseItem.physician.full_name}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 4, color: '#777' }}>
                  เจ้าหน้าที่: {caseItem.officer.title}{caseItem.officer.full_name}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 4, color: '#777' }}>
                  สถานะ: {caseItem.case_status === 'completed'? 'เข้ารับการปรึกษาแล้ว':'not found'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center' }}>ไม่พบข้อมูลรายการนัดหมาย</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
