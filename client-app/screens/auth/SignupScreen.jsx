import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
// import { AuthStyle } from '../../constants/styles';
import auth_back from '../../assets/auth_back.png';
import authService from '../../services/AuthService';

export default function SignUpScreen({ navigation }) {
    const [signupData, setSignupData] = useState({
        title: '',
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
        if (!validateForm()) return;

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
            <View style={AuthStyle.containerSignup}>
                <Text style={AuthStyle.header}>ลงทะเบียน</Text>

                <Picker
                    selectedValue={signupData.title}
                    onValueChange={(itemValue) => handleChange('title', itemValue)}
                    style={AuthStyle.input}
                >
                    <Picker.Item label="นาย" value="นาย" />
                    <Picker.Item label="นาง" value="นาง" />
                    <Picker.Item label="นางสาว" value="นางสาว" />
                </Picker>

                <TextInput
                    style={AuthStyle.input}
                    placeholder="ชื่อ-นามสกุล"
                    placeholderTextColor="#aaa"
                    value={signupData.full_name}
                    onChangeText={(value) => handleChange('full_name', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="หมายเลขโทรศัพท์"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={signupData.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="อายุ"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={signupData.age}
                    onChangeText={(value) => handleChange('age', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="ชื่อผู้ใช้งาน"
                    placeholderTextColor="#aaa"
                    value={signupData.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="รหัสผ่าน"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={signupData.password}
                    onChangeText={(value) => handleChange('password', value)}
                />

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

export const AuthStyle = {
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40a8d4', // Light background color
        paddingVertical: 20,
    },
    containerSignup: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff', // White background for card effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: '#f1f1f1',
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#40a8d4',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
    },
    signUpLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
};
