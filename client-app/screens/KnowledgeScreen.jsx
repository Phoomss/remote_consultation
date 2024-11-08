import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../constants/styles';
import contentService from '../services/ContentService';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';

export default function KnowledgeScreen() {
  const navigation = useNavigation()
  const [contentList, setContentList] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await contentService.contentList();
        setContentList(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.header}>สาระน่ารู้</Text>
      <View style={styles.servicesContainer}>
        {contentList ? (
          contentList.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.serviceButton,
                { backgroundColor: index % 2 === 0 ? '#69AFEF' : '#288CE866' }
              ]}
              onPress={() => navigation.navigate('สาระน่ารู้', { contentId: item.id })}
            >
              <Text style={[styles.buttonText,
              { color: index % 2 === 0 ? '#ffff' : '#366189' }
              ]}>{item.content_name || 'No content name available'}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
}
