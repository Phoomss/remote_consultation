import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { AuthStyle } from '../../constants/styles';
import auth_back from '../../assets/auth_back.png';

export default function SignUpScreen({ navigation }) {
    const [form, setForm] = useState({
        title: '',  // Store selected title
        full_name: '',
        phone: '',
        age: '',
        username: '',
        password: ''
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    return (
        <ScrollView contentContainerStyle={AuthStyle.scrollContainer}>
            <View style={AuthStyle.container}>
                <Image source={auth_back} style={AuthStyle.backgroundImage} />
                <Text style={AuthStyle.header}>ลงทะเบียน</Text>

                {/* Title Picker */}
                <Picker
                    selectedValue={form.title}
                    onValueChange={(itemValue) => handleChange('title', itemValue)}
                    style={AuthStyle.input}
                >
                    <Picker.Item label="นาย" value="นาย" />
                    <Picker.Item label="นาง" value="นาง" />
                    <Picker.Item label="นางสาว" value="นางสาว" />
                </Picker>

                <TextInput
                    style={AuthStyle.input}
                    placeholder="ชื่อ-นามสกุล (Full Name)"
                    placeholderTextColor="#aaa"
                    value={form.full_name}
                    onChangeText={(value) => handleChange('full_name', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="หมายเลขโทรศัพท์ (Phone)"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={form.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="อายุ (Age)"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={form.age}
                    onChangeText={(value) => handleChange('age', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="ชื่อผู้ใช้งาน (Username)"
                    placeholderTextColor="#aaa"
                    value={form.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
                <TextInput
                    style={AuthStyle.input}
                    placeholder="รหัสผ่าน (Password)"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(value) => handleChange('password', value)}
                />

                <TouchableOpacity style={AuthStyle.button}>
                    <Text style={AuthStyle.buttonText}>ลงทะเบียน</Text>
                </TouchableOpacity>

                <Text style={AuthStyle.signUpText}>
                    มีบัญชีอยู่แล้ว?{' '}
                    <Text style={AuthStyle.signUpLink} onPress={() => navigation.navigate('LoginScreen')}>
                        เข้าสู่ระบบ
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}
