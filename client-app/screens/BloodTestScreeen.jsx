import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Consult } from './../constants/styles';
import userService from "../services/UserService";

export default function BloodTestScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        setUser(res.data.data);
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date and time

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date); // Save the selected date and time
    hideDatePicker();
  };

  return (
    <View style={Consult.container}>
      {user ? (
        <View>
          <Text style={Consult.title}>ชื่อ-นามสกุล</Text>
          <TextInput style={Consult.input} placeholder="กรุณากรอกชื่อ-นามสกุล" value={`${user.title}.${user.full_name}`} />

          <Text style={Consult.title}>เบอร์โทรศัพท์</Text>
          <TextInput style={Consult.input} placeholder="กรุณากรอกเบอร์โทรศัพท์" keyboardType="phone-pad" value={user.phone} />
        </View>
      ) : (
        <View>
          <Text style={Consult.title}>ชื่อ-นามสกุล</Text>
          <TextInput style={Consult.input} placeholder="กรุณากรอกชื่อ-นามสกุล" />

          <Text style={Consult.title}>เบอร์โทรศัพท์</Text>
          <TextInput style={Consult.input} placeholder="กรุณากรอกเบอร์โทรศัพท์" keyboardType="phone-pad" />
        </View>
      )}

      <Text style={Consult.title}>กำหนดวัน และ เวลาที่ต้องการจอง</Text>
      <TouchableOpacity style={Consult.button} onPress={showDatePicker}>
        <Text style={Consult.buttonText}>เลือกวัน และ เวลาที่่ต้องการจอง</Text>
      </TouchableOpacity>

      {/* Display the selected date and time */}
      {selectedDate && (
        <TextInput
          value={selectedDate.toLocaleString()}
          style={Consult.input}
          editable={false}
        />
      )}

      <TouchableOpacity style={Consult.confirmButton}>
        <Text style={Consult.confirmButtonText}>ยืนยัน</Text>
      </TouchableOpacity>

      {/* DateTimePickerModal for date and time */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime" // Use 'datetime' for selecting both date and time
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
