import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ContinueLearning } from '../models/ContinieLearning';

// Convention: Use PascalCase for Interface names
interface ContinueLearningProps {
    continueLearning: ContinueLearning;
}

const ContinueLearningCard = ({continueLearning} : ContinueLearningProps) => {

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{continueLearning.title}</Text>
      
      {/* FIXED: Keeps the space safely enclosed inside the template literal template */}
      <Text style={styles.lessonStyle}>{`Lesson ${continueLearning.lessonId}`}</Text>
      
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: `${continueLearning.progress}%` }]} />
      </View>
      
      <Text style={styles.progressText}>{continueLearning.progress}% Completed</Text>
      <Text style={styles.continueStyle}>{"Continue ->"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 3, margin: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  progressBarTrack: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#2196F3' },
  progressText: { marginTop: 4, fontSize: 12, color: '#666' },
  lessonStyle: { paddingVertical: 8, paddingHorizontal: 0 }, // Changed padding to vertical to avoid stretching layout text awkwardly
  continueStyle: { width: "100%", textAlign: 'center', color: '#2196F3', fontWeight: 'bold', padding: 8, fontSize: 16 }
});

export default ContinueLearningCard;
