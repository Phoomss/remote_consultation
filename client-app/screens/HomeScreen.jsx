import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from '../constants/styles'
import ProfileCard from '../components/ProfileCard'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.main}>
            <ProfileCard />

            <View style={styles.servicesContainer}>
                <Text style={styles.servicesTitle}>เลือกรับบริการ</Text>
                <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('จองคิวเจาะเลือด')} >
                    <Text style={styles.buttonText}>จองคิวเจาะเลือด</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceButtonTwo} onPress={() => navigation.navigate('จองคิวเข้าปรึกษา')}>
                    <Text style={styles.buttonTextTwo}>จองคิวเข้าปรึกษา</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceButton}>
                    <Text style={styles.buttonText}>สรุปรายการนัดหมาย</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceButtonTwo} onPress={() => navigation.navigate('แบบประเมินความเสี่ยง')}>
                    <Text style={styles.buttonTextTwo}>แบบประเมินความเสี่ยง</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
