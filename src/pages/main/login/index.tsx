import Button from 'src/components/Button';
import Layout from 'src/components/Layout';
import InputText from 'src/components/TextInput';
import { View, Text } from 'react-native';
import useLogic, { LoginSchema } from './index.logic';
import { Formik } from 'formik';

const LoginScreen = () => {
  const { handleLogin } = useLogic();
  // emilyspass
  // emilys
  return (
    <Layout>
      <View className="w-full items-center justify-center">
        <Text className="mt-6 font-semibold text-2xl text-textbold">Welcome Back!</Text>
        <Text className="mt-3 font-semibold text-sm text-text">
          Your work faster and structured with Todyapp
        </Text>
      </View>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty, isValid }) => (
          <View className="flex-1 justify-between">
            {/* Inputs */}
            <View>
              <InputText
                label="UserName"
                placeholder="User Name"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username && errors.username}
              />
              {touched.username && errors.username && (
                <Text className="text-sm text-red-500">{errors.username}</Text>
              )}

              <InputText
                label="Password"
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <Text className="text-sm text-red-500">{errors.password}</Text>
              )}
            </View>
            <View className="pb-5">
              <Button text="Next" onPress={handleSubmit as any} disabled={!(dirty && isValid)} />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};

export default LoginScreen;
