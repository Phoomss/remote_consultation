import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { AuthStyle } from '../../constants/styles';
import auth_back from '../../assets/auth_back.png';
import authService from '../../services/AuthService';

export default function SignUpScreen({ navigation }) {
    const [signupData, setSignupData] = useState({
        title: '',  // Store selected title
        full_name: '',
        phone: '',
        age: '',
        username: '',
        password: ''
    });

    const handleChange = (field, value) => {
        setSignupData({ ...signupData, [field]: value });
    };

    const validateForm = () => {
        const { title, full_name, phone, age, username, password } = signupData;
        if (!title || !full_name || !phone || !age || !username || !password) {
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return; // Validate before submission

        try {
            await authService.signup(signupData);
            Alert.alert('สำเร็จ', 'ลงทะเบียนสำเร็จแล้ว', [
                {
                    text: 'ตกลง',
                    onPress: () => navigation.navigate('Login'),
                },
            ]);
        } catch (error) {
            console.error('Signup error: ', error);
            Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถลงทะเบียนได้');
        }
    };

    return (
        <ScrollView contentContainerStyle={AuthStyle.scrollContainer}>
            <View style={AuthStyle.container}>
                <Image source={auth_back} style={AuthStyle.backgroundImage} />
                <Text style={AuthStyle.header}>ลงทะเบียน</Text>

                {/* Title Picker */}
                <Picker
                    selectedValue={signupData.title}
                    onValueChange={(itemValue) => handleChange('title', itemValue)}
                    style={AuthStyle.input}
                    placeholder="เลือกคำนำหน้า"
                >
                    <Picker.Item label="นาย" value="นาย" />
                    <Picker.Item label="นาง" value="นาง" />
                    <Picker.Item label="นางสาว" value="นางสาว" />
                </Picker>

                <TextInput
                    style={AuthStyle.input}
                    placeholder="ชื่อ-นามสกุล (Full Name)"
                    placeholderTextColor="#aaa"
                    value={signupData.full_name}
                    onChangeText={(value) => handleChange('full_name', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="หมายเลขโทรศัพท์ (Phone)"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={signupData.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="อายุ (Age)"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={signupData.age}
                    onChangeText={(value) => handleChange('age', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="ชื่อผู้ใช้งาน (Username)"
                    placeholderTextColor="#aaa"
                    value={signupData.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="รหัสผ่าน (Password)"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={signupData.password}
                    onChangeText={(value) => handleChange('password', value)}
                />

                {/* Submit Button */}
                <TouchableOpacity style={AuthStyle.button} onPress={handleSubmit}>
                    <Text style={AuthStyle.buttonText}>ลงทะเบียน</Text>
                </TouchableOpacity>

                <Text style={AuthStyle.signUpText}>
                    มีบัญชีอยู่แล้ว?{' '}
                    <Text style={AuthStyle.signUpLink} onPress={() => navigation.navigate('Login')}>
                        เข้าสู่ระบบ
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}
