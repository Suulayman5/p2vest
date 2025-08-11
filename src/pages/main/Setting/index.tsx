import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Layout from 'src/components/Layout';
import {
  ArrowLeft4,
  ArrowRight,
  Key,
  Logout,
  MagicPen,
  Medal,
  Profile,
  Question,
  searchNormal,
  Weight,
} from 'assets/images/image-exports';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useLogic from './index.logic';

const SettingScreen = () => {
  const navigation = useNavigation();
  const { logout } = useLogic()

  const Item = ({ title, icon, onPress }: { title: string; icon: any; onPress: () => void }) => (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between py-4"
      onPress={onPress}>
      <View className="flex-row items-center gap-4">
        <Image source={icon} />
        <Text className="font-regular text-base text-text">{title}</Text>
      </View>
      <Image source={ArrowRight} />
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View className="mb-5 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ArrowLeft4} />
        </TouchableOpacity>
        <Text className="text-textblack font-semibold text-lg">Settings</Text>
        <TouchableOpacity>
          <Image source={searchNormal}/>
        </TouchableOpacity>
      </View>

      <View className="w-full items-center">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={{ width: 81, height: 89, borderRadius: 50 }}
        />
        <Text className="text-textdarkblack mt-4 font-medium text-lg">Suleiman Ajah</Text>
        <Text className="text-md mt-3 text-center font-regular text-text">@Suulayman</Text>
      </View>


      <View className="mt-8">
        <Item title="Accounts" icon={Profile} onPress={() => navigation.navigate('Account')} />
        <Item title="Theme" icon={MagicPen} onPress={() => console.log('Theme pressed')} />
        <Item title="App Icon" icon={Medal} onPress={() => console.log('App Icon pressed')} />
        <Item
          title="Productivity"
          icon={Weight}
          onPress={() => console.log('Productivity pressed')}
        />
      </View>
      <View className="my-6 h-0.5 w-full bg-inputborder" />

      <View className="">
        <Item title="Privacy Policy" icon={Key} onPress={() => console.log('Privacy Policy')} />
        <Item title="Help Center" icon={Question} onPress={() => console.log('Help Center')} />
        <Item title="Log Out" icon={Logout} onPress={logout} />
      </View>
    </Layout>
  );
};

export default SettingScreen;
