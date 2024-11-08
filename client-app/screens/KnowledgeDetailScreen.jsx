import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import contentService from '../services/ContentService';
import { ContentStyle, styles } from '../constants/styles';
import Loading from './../components/Loading';

export default function KnowledgeDetailScreen({ route, navigation }) {
  const { contentId } = route.params; // รับค่าจาก navigate

  const [contentDetail, setContentDetail] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await contentService.contentDetail(contentId);
        setContentDetail(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log('Error fetching content:', error);
      }
    };
    fetchContent();
  }, [contentId]);

  return (
    <View style={styles.main}>
      <View style={styles.servicesContainer}>
        {contentDetail ? (
          <View style={ContentStyle.container}>
            <Text style={ContentStyle.header}>{contentDetail.content_name}</Text>
            <ScrollView>
              <View style={ContentStyle.contentCard}>
                <Text style={ContentStyle.text}>{contentDetail.content_detail}</Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              style={ContentStyle.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={ContentStyle.backButtonText}>ย้อนกลับ</Text>
            </TouchableOpacity>
          </View>

        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
}
