import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import * as yup from "yup"
import { login } from "src/service/api";
type Props = {};
type ReturnType = {
    handleLogin: (values)=> void
};

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .test('no-trailing-space', 'Please remove the extra space', value => {
      if (value && value.endsWith(' ')) {
        return false;
      }
      return true;
    })
    .required('username is required'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(6, 'Password too short')
    .max(14, 'Password too long')
});

function useLogic({}: Props = {}): ReturnType {
    const navigation = useNavigation()

  const mutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    onSuccess() {
      console.log("login successful");
      Toast.show({
        type: "success",
        text1: "Login Successful",
      });
      navigation.navigate("Theme" as never);
    },
    onError(error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Error logging in",
      });
    },
  });

  const handleLogin = (values: { username: string; password: string }) => {
    mutation.mutate(values);
  };

  return {
    handleLogin
  };
}

export default useLogic;
