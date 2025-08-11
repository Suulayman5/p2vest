import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { scaledSize } from '../../utils';
import { isEmpty, isNil } from 'lodash';

type InputFieldProps = {
  icon?: React.ReactNode;
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  touched?: boolean;
  error?: string;
  onBlur?: any
  label?: string;
};

const InputText: React.FC<InputFieldProps> = ({
  icon,
  onChangeText,
  onBlur,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  touched,
  error,
  label
}) => {
  const showError = touched && !isNil(error);

  return (
    <View style={{ width: '100%', marginTop: scaledSize(20) }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          showError && styles.errorBorder,
          !showError && !isEmpty(value) && styles.successBorder
        ]}
      >
        
        <TextInput
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A9B0C5"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize || 'none'}
        />
        {icon && <View style={styles.icon}>{icon}</View>}
      </View>

      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  label: {
    fontSize: scaledSize(14),
    fontWeight: '500',
    color: '#1B1C1F',
    marginBottom: scaledSize(9),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scaledSize(1),
    borderColor: '#E0E5ED',
    borderRadius: scaledSize(6),
    paddingHorizontal: scaledSize(12),
    backgroundColor: '#F6F7F9',
    height: scaledSize(50),
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: scaledSize(16),
    color: '#000',
  },
  icon: {
    marginRight: scaledSize(8),
    backgroundColor: '#000000'
  },
  successBorder: {
    borderColor: '#2F50C1',
  },
  errorBorder: {
    borderColor: '#000000',
  },
  errorText: {
    fontSize: scaledSize(12),
    color: '#ff0000',
    marginTop: scaledSize(4),
  },
});
