import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { assessmentStyle, styles } from '../constants/styles';
import userService from './../services/UserService';
import assessmentService from './../services/assessmentService';
import { useNavigation } from '@react-navigation/native';

export default function AssessmentScreen() {
  const [questions, setQuestions] = useState([]); // Store questions with their answers
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track answers for each question
  const [userId, setUserId] = useState(null); // Assume userId is set from auth context or prop
  const [userInfo, setUserInfo] = useState(null);

  const navigation = useNavigation();

  // Fetch all questions with answers on component mount
  useEffect(() => {
    fetchUserInfo();
    fetchQuestion();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await userService.userInfo();
      setUserInfo(res.data.data);
      setUserId(res.data.data.id); // Assuming `id` is the user ID
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  // Fetch question data and associated answers for each question
  const fetchQuestion = async () => {
    try {
      const res = await assessmentService.questionList();
      const questionsData = res.data.data;
      
      // Fetch answers for each question concurrently using Promise.all
      const questionsWithAnswers = await Promise.all(questionsData.map(async (question) => {
        const answerRes = await assessmentService.searchAnswer(question.id); // Assuming question.id is the questionId
        question.answerOptions = answerRes.data.data;
        return question;
      }));

      setQuestions(questionsWithAnswers);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบรหัสผู้ใช้');
      return;
    }
  
    // เตรียมคำตอบรวมถึงข้อมูลผู้ใช้
    const responses = Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
      userId,
      questionId,
      answerId,
    }));
  
    // รวมข้อมูลผู้ใช้เข้าไปใน payload
    const dataToSubmit = {
      userId,
      userInfo,
      responses,
    };
  
    // แสดงกล่องยืนยันก่อนส่ง
    Alert.alert(
      'ยืนยันการส่งคำตอบ',
      'คุณแน่ใจหรือไม่ว่าจะส่งคำตอบของคุณ?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('ยกเลิกการส่งคำตอบ'),
          style: 'cancel',
        },
        {
          text: 'ยืนยัน',
          onPress: async () => {
            try {
              await assessmentService.createResponse(dataToSubmit); // ส่งข้อมูลทั้งหมดรวมถึงข้อมูลผู้ใช้
              Alert.alert('สำเร็จ', 'ส่งคำตอบสำเร็จ', [
                {
                  text: 'ตกลง',
                  onPress: () => navigation.goBack()
                },
              ]);
            } catch (error) {
              console.error("เกิดข้อผิดพลาดในการส่งคำตอบ:", error);
              Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถส่งคำตอบได้');
            }
          },
        },
      ],
      { cancelable: false } // ป้องกันไม่ให้ปิดกล่องยืนยันหากคลิกนอกกล่อง
    );
  };  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.main}>
        <View style={styles.servicesContainer}>
          <Text style={assessmentStyle.headerText}>
            โปรดบันทึกข้อมูลที่เป็นความจริงเพื่อใช้ในการประเมินความเสี่ยง
          </Text>
          <Text style={assessmentStyle.descriptionText}>
            ข้อมูลของท่านจะถูกเก็บเป็นความลับ
          </Text>

          {/* Render each question with answer options */}
          {questions.map((question, index) => (
            <View key={question.id} style={assessmentStyle.cardAss}>
              <Text style={assessmentStyle.question}>
                {index + 1}. {question.ques_name}
              </Text>

              {/* Render dropdown for answer selection */}
              <Picker
                selectedValue={selectedAnswers[question.id]}
                onValueChange={(value) => handleAnswerSelect(question.id, value)}
                style={assessmentStyle.dropdown}
              >
                <Picker.Item label="Select an answer" value={null} />
                {question.answerOptions?.map((answer) => (
                  <Picker.Item key={answer.id} label={answer.answer_text} value={answer.id} />
                ))}
              </Picker>
            </View>
          ))}

          {/* Submit button */}
          <TouchableOpacity style={assessmentStyle.submitButton} onPress={handleSubmit}>
            <Text style={assessmentStyle.submitButtonText}>ยืนยันคำตอบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
