import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { AuthStyle } from '../../constants/styles';
import auth_back from '../../assets/auth_back.png';
import authService from '../../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    // State to store the login data
    const [LoginData, setLoginData] = useState({ username: "", password: "" });

    // Handle input changes
    const handleChange = (field, value) => {
        setLoginData({ ...LoginData, [field]: value });
    };

    const navigation = useNavigation();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await authService.login(LoginData);
            // After a successful login, store the token in AsyncStorage
            if (res.status === 200) {
                // Assuming the response contains a token
                const token = res.data.data.token;
                console.log(token)
                await AsyncStorage.setItem('userToken', token);  // Save token
                await AsyncStorage.setItem('username', LoginData.username);  // Save username
                
                // Navigate to Home screen after login
                navigation.navigate('Home');

            } else {
                // Handle errors if login fails
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
