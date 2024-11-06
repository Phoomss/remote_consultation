import { View, Text, Button } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen({ setIsSignedIn }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsSignedIn(false); // Reset the sign-in state
      navigation.replace('Login'); // Navigate to the login screen after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View>
      {/* Display text inside the Text component */}
      <Text>SettingScreen</Text>

      {/* Logout button */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
