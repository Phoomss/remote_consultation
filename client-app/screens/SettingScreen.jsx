import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { styles } from '../constants/styles';

export default function SettingScreen({ navigation }) {
  const { logout } = useAuth();

  return (
    <View style={styles.main}>
      <Text style={styles.header}>Setting</Text>
      <View style={styles.servicesContainer}>
        <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('Profile')} >
          <Text style={styles.buttonText}>ข้อมูลส่วนตัว</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceButtonTwo} onPress={() => navigation.navigate('จองคิวเข้าปรึกษา')}>
          <Text style={styles.buttonTextTwo}>ประวัติการรับบริการ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
