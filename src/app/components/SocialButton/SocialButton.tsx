import { Pressable, StyleSheet, Text, View } from "react-native"
import { Typography } from "../../theme/typography"
import { Colors } from "../../theme/colors"
import React, { ReactNode } from "react"

export interface SocialProps {
  title: string
  onClick: () => void
  icon?: React.ReactNode
}

const SocialButton = ({ title, onClick, icon }: SocialProps) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={styles.TextContainer}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  )
}

export default SocialButton

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  title: {
    ...Typography.button,
    color: Colors.black,
  },
  TextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
  },
  iconWrapper: {
    marginRight: 10,
  },
})
