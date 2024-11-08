import { View, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProfileStyle, styles } from '../constants/styles';
import logo from '../assets/user.png';
import userService from './../services/UserService';
import Feather from '@expo/vector-icons/Feather';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        setUser(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={[styles.servicesContainer, { alignItems: 'center', padding: 20 }]}>
          <Image source={logo} style={[ProfileStyle.profileImage, { borderWidth: 2, borderColor: '#ddd', borderRadius: 50, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } }]} />

          {user ? (
            <Text style={[styles.greetingText, { marginTop: 10, fontSize: 20, fontWeight: 'bold', color: '#333' }]}>
              {user.title} {user.full_name}
            </Text>
          ) : (
            <Text style={[styles.greetingText, { marginTop: 10, fontSize: 20, color: '#777' }]}>User Not Found</Text>
          )}

          <TouchableOpacity style={ProfileStyle.btnEdit}>
            <Feather name="edit" size={18} color="white" style={{ marginRight: 5 }} />
            <Text style={{ color: '#fff', fontSize: 16 }}>Edit Profile</Text>
          </TouchableOpacity>

          <View style={{ width: '100%' }}>
            {[
              { label: 'Title', value: user?.title },
              { label: 'Full Name', value: user?.full_name },
              { label: 'Age', value: user?.age },
              { label: 'Phone', value: user?.phone },
              { label: 'Username', value: user?.username },
              { label: 'Password', value: user?.password, secureTextEntry: true },
              { label: 'Role', value: user?.role }
            ].map((field, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: '600', marginBottom: 5, color: '#555' }}>{field.label}</Text>
                <TextInput
                  value={field.value}
                  style={ProfileStyle.input}
                  secureTextEntry={field.secureTextEntry || false}
                  editable={false}  // Set to false to prevent editing directly
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
