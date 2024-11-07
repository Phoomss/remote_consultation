import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthProvider';

export default function SettingScreen({ setIsSignedIn }) {
  const { logout } = useAuth();

  return (
      <View>
          <Text>Welcome to the Home Screen!</Text>
          {/* แสดงเมนูหรือข้อมูลของระบบที่ต้องการ */}
          <Button title="Logout" onPress={logout} />
      </View>
  );
}
