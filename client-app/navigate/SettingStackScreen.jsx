import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'
import SettingScreen from '../screens/SettingScreen'

const SettingStack = createNativeStackNavigator()

export default function SettingStackScreen() {
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen
                name='setting'
                component={SettingScreen}
                options={{ headerShown: false }}
            />
            <SettingStack.Screen 
            name='Profile'
            component={ProfileScreen}
            options={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#69AFEF', // Background color
                  elevation: 0, // Removes shadow on Android
                  shadowOpacity: 0, // Removes shadow on iOS
                },
                headerTintColor: '#fff', 
              }}
             />
        </SettingStack.Navigator>
    )
}