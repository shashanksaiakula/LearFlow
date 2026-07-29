import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Typography } from '../../theme/typography';
import { Colors } from '../../theme/colors';

type  TextPressableProps ={
    text : string,
    color? : string
    //  typography?: any;
     fontweight? : string
     onPress : ()=> void
}

const TextPressable = ({text,fontweight ="bold", color=Colors.primary, onPress} :TextPressableProps) => {
    const style = {fontweight,color}
  return (
    <Pressable 
        onPress={onPress}
        style={({ pressed }) => [
        {
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
    >
      <Text style={style}>{text}</Text>
    </Pressable>
  )
}

export default TextPressable

const styles = StyleSheet.create({})