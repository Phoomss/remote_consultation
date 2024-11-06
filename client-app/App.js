import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import KnowledgeScreen from './screens/KnowledgeScreen'
import SettingScreen from './screens/SettingScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeStackScreen from './navigate/HomeStackScreen'

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'สาระน่ารู้') {
              iconName = focused ? 'book' : 'book-outline'
            } else if (route.name === 'Setting') {
              iconName = focused ? 'settings' : 'settings-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />

          },
          tabBarActiveTintColor: '#ffff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: "#69AFEF",
            paddingBottom: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name='สาระน่ารู้' component={KnowledgeScreen} />
        <Tab.Screen name='Setting' component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}