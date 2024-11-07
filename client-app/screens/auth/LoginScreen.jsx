import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { AuthStyle } from '../../constants/styles';
import auth_back from '../../assets/auth_back.png';
import authService from '../../services/AuthService';
import { useAuth } from '../../context/AuthProvider';

export default function LoginScreen({ navigation }) {
    const [LoginData, setLoginData] = useState({ username: "", password: "" });
    const { login } = useAuth(); 

    const handleChange = (field, value) => {
        setLoginData({ ...LoginData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const res = await authService.login(LoginData);
            if (res.status === 200 && res.data?.data?.token) {
                const token = res.data.data.token;
                login(token);
                console.log(token)
                console.log(res.data.data.username)
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.log('Error logging in:', error);
        }
    };

    return (
        <View style={AuthStyle.container}>
            <Image source={auth_back} style={AuthStyle.backgroundImage} />
            <Text style={AuthStyle.header}>เข้าสู่ระบบ</Text>

            {/* Username Input */}
            <TextInput
                style={AuthStyle.input}
                placeholder="ชื่อผู้ใช้งาน"
                placeholderTextColor="#aaa"
                value={LoginData.username}
                onChangeText={(value) => handleChange('username', value)}
            />

            {/* Password Input */}
            <TextInput
                style={AuthStyle.input}
                placeholder="รหัสผ่าน"
                secureTextEntry={true}
                placeholderTextColor="#aaa"
                value={LoginData.password}
                onChangeText={(value) => handleChange('password', value)}
            />

            {/* Submit Button */}
            <TouchableOpacity style={AuthStyle.button} onPress={handleSubmit}>
                <Text style={AuthStyle.buttonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            {/* SignUp Link */}
            <Text style={AuthStyle.signUpText}>
                คุณมีบัญชีใช้งานหรือยัง?{' '}
                <Text style={AuthStyle.signUpLink} onPress={() => navigation.navigate('SignUp')}>
                    Sign up
                </Text>
            </Text>
        </View>
    );
}
