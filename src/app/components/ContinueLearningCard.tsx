import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ContinueLearning } from '../models/ContinieLearning';
import { Colors } from '../theme/colors';
import { BASE_URL } from '../api/apiClinet';

// Convention: Use PascalCase for Interface names
interface ContinueLearningProps {
  continueLearning: ContinueLearning
}


const ContinueLearningCard = ({ continueLearning }: ContinueLearningProps) => {


  return (
    <TouchableOpacity style={styles.card}>
      <View>
        <Image source={{ uri: `${BASE_URL}${continueLearning.thumbnail}` }}
          style={styles.thumbnail}
        />
      </View>
      <View style={styles.sideText}>
        <Text style={styles.title}>{continueLearning.title}</Text>
        {/* FIXED: Keeps the space safely enclosed inside the template literal template */}

        <Text style={styles.progressText}>{continueLearning.progress}% Completed</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${continueLearning.progress}%` }]} />
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, padding: 12, backgroundColor: Colors.white, borderRadius: 8, elevation: 3, margin: 16, flexDirection: "row" },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  progressBarTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary },
  progressText: { marginVertical: 4, fontSize: 14},
  lessonStyle: { paddingVertical: 8, paddingHorizontal: 0 }, // Changed padding to vertical to avoid stretching layout text awkwardly
  continueStyle: { width: "100%", textAlign: 'center', color: Colors.primary, fontWeight: 'bold', padding: 8, fontSize: 16 },
  thumbnail: {
    width: 90,
    height: 90,
    resizeMode: 'stretch',
    borderRadius: 10
  },
  sideText: {
    flex: 1,
    marginHorizontal: 8,
    // paddingRight:5,
    justifyContent: 'flex-end'
  }
});

export default ContinueLearningCard;
