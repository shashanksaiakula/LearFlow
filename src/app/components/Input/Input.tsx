import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import styles from "./styles";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconPress? : ()=> void;
   value?: string;
  onChangeText?: (text: string) => void;
}

const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry,
  rightIconPress,
  value, 
  onChangeText,
  onBlur =()=>{},
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )} */}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        <TextInput
          {...props}
          value={value}                
          onChangeText={onChangeText}
          placeholder={label}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={(event) => {
            setIsFocused(false)
            onBlur?.(event);
          }}
        />

        {rightIcon && (
          <Pressable
            onPress={rightIconPress}
            style={styles.rightIcon}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;