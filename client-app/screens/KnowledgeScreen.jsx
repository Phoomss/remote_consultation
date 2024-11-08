import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react';
import { styles } from '../constants/styles';

export default function KnowledgeScreen() {
  return (
    <View style={styles.main}>
    <Text style={styles.header}>Setting</Text>
    <View style={styles.servicesContainer}>
      <TouchableOpacity style={styles.serviceButton} >
        <Text style={styles.buttonText}>ข้อมูลส่วนตัว</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.serviceButtonTwo} >
        <Text style={styles.buttonTextTwo}>ประวัติการรับบริการ</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}