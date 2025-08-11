import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import Layout from 'src/components/Layout';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft4 } from 'assets/images/image-exports';
import InputText from 'src/components/TextInput';
import Button from 'src/components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';

// ✅ Validation Schema
const AccountSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AccountScreen = () => {
  const navigation = useNavigation();

  const handleSave = (values: { fullName: string; email: string; password: string }) => {
    Alert.alert(
      'Confirm Change',
      'Are you sure you want to change your password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            Alert.alert('Success', 'Password changed successfully');
            navigation.navigate('Main')
          },
        },
      ]
    );
  };

  return (
    <Layout>
      <View className="mb-5 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ArrowLeft4} />
        </TouchableOpacity>
        <Text className="text-textblack font-semibold text-lg">Account</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <Formik
        initialValues={{ fullName: '', email: '', password: '' }}
        validationSchema={AccountSchema}
        onSubmit={handleSave}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty, isValid }) => (
          <View className="flex-1 justify-between">
            {/* Inputs */}
            <View>
              <InputText
                label="Full Name"
                placeholder="Full Name"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={touched.fullName &&  errors.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text className="text-red-500 text-sm">{errors.fullName}</Text>
              )}

              <InputText
                label="Email"
                placeholder="name@example.com"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <Text className="text-red-500 text-sm">{errors.email}</Text>
              )}

              <InputText
                label="Password"
                placeholder="Change Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <Text className="text-red-500 text-sm">{errors.password}</Text>
              )}
            </View>

            {/* Button fixed at bottom */}
            <View className="pb-5">
              <Button
                text="Save Changes"
                onPress={handleSubmit as any}
                disabled={!(dirty && isValid)}
              />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};

export default AccountScreen;
