import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import { scaledSize } from '../../utils';
import { useTheme } from 'src/context/themeContext';

type ButtonProps = {
  onPress?: (e?: GestureResponderEvent) => void;
  text: string;
  error?: boolean;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: object;
};

const Button = ({ onPress = () => {}, text, loading = false, disabled = false }: ButtonProps) => {
    const { primary } = useTheme();
  
  return (
    <TouchableOpacity
      style={[styles.container,{backgroundColor: primary}, disabled && styles.disabled, loading && styles.loading]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.text}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  
  container: {
    // backgroundColor: primary,
    width: '100%',
    height: scaledSize(50),
    padding: scaledSize(10),
    borderRadius: scaledSize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: scaledSize(18),
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  loading: {
    opacity: 0.7,
  },
});
