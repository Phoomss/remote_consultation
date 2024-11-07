import { View, Text, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { styles } from '../constants/styles'
import logo from '../assets/user.png'
import userService from '../services/UserService'

export default function ProfileCard() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await userService.userInfo()
                setUser(res.data.data)
            } catch (error) {
                console.log('Error fetching user info:', error);
            }
        }
        fetchUserInfo()
    }, [])

    return (
        <View style={styles.profileCard}>
            <Image source={logo} style={styles.profileImage} />
            {user ? (
                <Text style={styles.greetingText}>สวัสดี {user.full_name}</Text>
            ) : (
                <Text style={styles.greetingText}>Loading...</Text>
            )}
        </View>
    )
}