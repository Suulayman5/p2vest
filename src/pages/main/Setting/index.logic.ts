import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-toast-message';
type Props = {};
type ReturnType = {
  logout: () => void
};

function useLogic({}: Props = {}): ReturnType {
  
  const navigation = useNavigation();


  const handleClearSession = async () => {
    await EncryptedStorage.removeItem('user_token');
    console.log('user logged out =====>>>>>>>>');
    Toast.show({
      type: 'success',
      text1: 'Logout Successful',
    });
    navigation.navigate('Login');
  };


const logout = ()=> {
      Alert.alert(
        'Log out',
        'Are you sure you want to Log out??',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              handleClearSession()
            },
          },
        ]
      );
}
  return {
    logout
  };
}

export default useLogic;
