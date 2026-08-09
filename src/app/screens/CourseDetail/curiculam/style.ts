import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      container: {
    flex: 1, // 👈 Fix: Ensures the list has physical layout space to display and scroll
  },
  lessonRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  lessonDuration: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  }
})

export default styles