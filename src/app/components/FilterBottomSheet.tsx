import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Strings } from '../strings/String';

interface FilterBottomSheetProps {

  visible: boolean;
  onClose: (selected: string) => void;
  levels: string[]
}

const FilterBottomSheet = ({ visible, onClose, levels }: FilterBottomSheetProps) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const [selected, setSelected] = useState("All")

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 300,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  // Toggle selection: Select if new, clear state if clicked again
  const handleSelect = (item: string) => {
    if (selected === item) {
      setSelected("");
    } else {
      setSelected(item);
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={() => onClose(selected)}>
      <TouchableWithoutFeedback onPress={() => onClose(selected)}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        <View style={[styles.iconTextStyle, { justifyContent: 'space-between' }]}>
          <Text style={styles.title}>{Strings.filter_courses}</Text>
          <Pressable onPress={() => { onClose(selected) }}>
            <MaterialDesignIcons
              name="close"
              size={22}
              color={Colors.primary}
            />
          </Pressable>
        </View>
          <Text style={styles.subTitle}>{Strings.level}</Text>
        <FlatList
          data={levels}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isCurrentItemSelected = selected === item;
            return (
              <Pressable style={styles.iconTextStyle} onPress={() => handleSelect(item)}>
                <MaterialDesignIcons
                  name={isCurrentItemSelected ? "checkbox-marked" : "checkbox-blank-outline"}
                  size={22}
                  color={isCurrentItemSelected ? Colors.primary : Colors.secondary}
                />
                <Text style={styles.label}>{item}</Text>
              </Pressable>
            )
          }}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
   ...Typography.body1,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  closeLabel: {
    color: '#333',
    fontWeight: '600',
  }, iconTextStyle: {
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  label: {
    ...Typography.body1,
    paddingHorizontal: 10,
    fontWeight: 500
  },subTitle:{
     ...Typography.body1,
    fontWeight: '500',
    marginBottom: 8,
    color: Colors.primary
  }
});

export default FilterBottomSheet;