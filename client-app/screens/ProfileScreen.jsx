import { View, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProfileStyle, styles } from '../constants/styles';
import logo from '../assets/user.png';
import userService from './../services/UserService';
import Feather from '@expo/vector-icons/Feather';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [formData, setFormData] = useState({
    title: '',
    full_name: '',
    phone: '',
    age: '',
    username: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        const userInfo = res.data.data;
        setUser(userInfo);
        setFormData({
          title: userInfo.title,
          full_name: userInfo.full_name,
          phone: userInfo.phone,
          age: userInfo.age,
          username: userInfo.username,
          password: '', // Password should be kept empty initially for security
          role: userInfo.role,
        });
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = { ...formData };
      // Omit password if not updated
      if (!formData.password) {
        delete updatedData.password;
      }
      
      const response = await userService.editProfile(updatedData);
      if (response.status === 200) {
        alert('โปรไฟล์ของคุณถูกอัปเดตแล้ว.'); // Success message
        setIsEditing(false); // Turn off edit mode
        setUser({ ...user, ...updatedData }); // Update user state with new data
      } else {
        alert('ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้.'); // Error message
      }
    } catch (error) {
      console.log(error);
      alert('ไม่สามารถอัปเดตโปรไฟล์ได้.'); // Error message
    }
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={[styles.servicesContainer, { alignItems: 'center', padding: 20 }]}>
          <Image
            source={logo}
            style={[
              ProfileStyle.profileImage,
              { borderWidth: 2, borderColor: '#ddd', borderRadius: 50, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
            ]}
          />
          {user ? (
            <Text style={[styles.greetingText, { marginTop: 10, fontSize: 20, fontWeight: 'bold', color: '#333' }]}>
              {user.title} {user.full_name}
            </Text>
          ) : (
            <Text style={[styles.greetingText, { marginTop: 10, fontSize: 20, color: '#777' }]}>User Not Found</Text>
          )}

          <TouchableOpacity
            style={ProfileStyle.btnEdit}
            onPress={() => setIsEditing(!isEditing)} // Toggle edit mode
          >
            <Feather name="edit" size={18} color="white" style={{ marginRight: 5 }} />
            <Text style={{ color: '#fff', fontSize: 16 }}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
          </TouchableOpacity>

          {/* Editable form */}
          {isEditing ? (
            <View style={{ width: '100%' }}>
              {[
                { label: 'Title', value: formData.title },
                { label: 'Full Name', value: formData.full_name },
                { label: 'Age', value: formData.age },
                { label: 'Phone', value: formData.phone },
                { label: 'Username', value: formData.username },
                { label: 'Password', value: formData.password, secureTextEntry: true },
                { label: 'Role', value: formData.role },
              ].map((field, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: '600', marginBottom: 5, color: '#555' }}>{field.label}</Text>
                  <TextInput
                    value={field.value}
                    style={ProfileStyle.input}
                    secureTextEntry={field.secureTextEntry || false}
                    onChangeText={(value) => handleChange(field.label.toLowerCase().replace(' ', '_'), value)}
                  />
                </View>
              ))}
              <TouchableOpacity onPress={handleSubmit} style={ProfileStyle.btnEdit}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Read-only fields
            <View style={{ width: '100%' }}>
              {[
                { label: 'Title', value: user?.title },
                { label: 'Full Name', value: user?.full_name },
                { label: 'Age', value: user?.age },
                { label: 'Phone', value: user?.phone },
                { label: 'Username', value: user?.username },
                { label: 'Role', value: user?.role },
              ].map((field, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: '600', marginBottom: 5, color: '#555' }}>{field.label}</Text>
                  <TextInput
                    value={field.value}
                    style={ProfileStyle.input}
                    editable={false} // Disable editing
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
