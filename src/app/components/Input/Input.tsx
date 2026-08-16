import React, { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import styles from "./styles";
import { Colors } from "../../theme/colors";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconPress? : ()=> void;
   value?: string;
  onChangeText?: (text: string) => void;
  disabled? :boolean,
  placeHolder? : string,
  containerStyle?: StyleProp<ViewStyle>;
  height? : number 
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
  disabled,
  placeHolder,
  containerStyle,
  height =56,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
          disabled && {backgroundColor : Colors.disabled},
          containerStyle,
          {height : height}
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        <TextInput
          {...props}
          editable={!disabled} 
          selectTextOnFocus={!disabled}
          value={value}                
          onChangeText={onChangeText}
          placeholder={placeHolder ??label}
          style={[styles.input]}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={(event) => {
            setIsFocused(false)
            onBlur?.(event);
          }}
            numberOfLines={4}
            multiline={true}   
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