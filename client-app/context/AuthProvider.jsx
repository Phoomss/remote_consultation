import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// สร้าง Context
const AuthContext = createContext();

// สร้าง provider component เพื่อแชร์ข้อมูลไปยังคอมโพเนนต์ต่างๆ
export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false); // สถานะการล็อกอิน
  const [userToken, setUserToken] = useState(null); // สถานะของ token

  useEffect(() => {
    // เช็คสถานะการล็อกอินจาก AsyncStorage
    const checkSignInStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsSignedIn(true);
        setUserToken(token);
      }
    };

    checkSignInStatus();
  }, []);

  // ฟังก์ชันสำหรับล็อกอิน
  const login = async (token) => {
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
    setIsSignedIn(true);
  };

  // ฟังก์ชันสำหรับออกจากระบบ
  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ใช้ context ในคอมโพเนนต์ต่างๆ
export const useAuth = () => useContext(AuthContext);
