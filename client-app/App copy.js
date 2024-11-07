import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import KnowledgeScreen from './screens/KnowledgeScreen';
import SettingScreen from './screens/SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './navigate/HomeStackScreen';
import AuthStackScreen from './navigate/AuthStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Tab = createBottomTabNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsSignedIn(!!token); // Check if token exists, set login status
      } catch (error) {
        console.error("Error fetching token: ", error);
        setIsSignedIn(false);
      }
    };

    checkSignInStatus();
  }, []);


  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              console.log(route.name); // Log the route name for debugging
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'สาระน่ารู้') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Setting') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ffff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#69AFEF',
              paddingBottom: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name="สาระน่ารู้" component={KnowledgeScreen} />
          <Tab.Screen
            name="Setting"
            component={(props) => <SettingScreen {...props} setIsSignedIn={setIsSignedIn} />}
          />
        </Tab.Navigator>
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
}
