import { FlatList, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Lesson } from '../../../models/Lesson';
import styles from './style';
import CommonCard from '../../../components/common/CommonCard';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../../theme/colors';

interface CurriculumProps {
  lessons: Lesson[];
}

const Curiculam = ({ lessons }: CurriculumProps) => {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const toggleLesson = (id: string) => {
    setExpandedLessonId((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <FlatList
      showsVerticalScrollIndicator = {false}
        data={lessons}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isExpanded = item._id === expandedLessonId;

          return (
            <CommonCard>
              <Pressable onPress={() => toggleLesson(item._id)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialDesignIcons
                    name='play-circle'
                    color={Colors.primary}
                    size={22}
                    style={{ paddingHorizontal: 5 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '500' }}>{item.title}</Text>
                  </View>
                  <MaterialDesignIcons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    color={Colors.primary}
                    size={22}
                    style={{ paddingHorizontal: 5 }}
                  />
                </View>
              </Pressable>
              {isExpanded && (
                <View style={{ marginTop: 12, paddingHorizontal: 5, borderTopWidth: 0.5, borderTopColor: '#eee', paddingTop: 8 }}>
                  <Text style={{ color: '#666', lineHeight: 18 }}>
                    {item.description || "No description available for this lesson."}
                  </Text>
                  <Text style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                    ⏱️ Duration: {item.duration}
                  </Text>
                </View>
              )}
            </CommonCard>
          );
        }}
      />
    </View>
  );
};

export default Curiculam;
