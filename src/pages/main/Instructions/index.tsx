import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Layout from '~/components/Layout';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft4, Vertical } from 'assets/images/image-exports';

const Instructions = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <View className="mb-5 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ArrowLeft4} />
        </TouchableOpacity>
        <Text className="font-semibold text-lg text-textblack">Instructions</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <View className='flex-row justify-between items-center'>
        <View className='flex-row items-center gap-1'>
            <Text className='text-textbold text-lg font-medium'> Tips and tricks</Text>
            <Text className='text-primary font-semibold text-base'>4</Text>
        </View>
        <Image source={Vertical}/>
      </View>
      <View className='my-3 p-1'>
        <Text className='mb-5 text-text text-base font-regular'>Use click Add to create tasks!</Text>
        <Text className='mb-5 text-text text-base font-regular'>Start own project!</Text>
        <Text className='mb-5 text-text text-base font-regular'>Organize these tasks!  </Text>
        <Text className='mb-5 text-text text-base font-regular'>Schedule this task </Text>
      </View>
      <View className='flex-row justify-between items-center'>
        <View className='flex-row items-center gap-1'>
            <Text className='text-textbold text-lg font-medium'> To Go Further</Text>
            <Text className='text-primary font-semibold text-base'>5</Text>
        </View>
        <Image source={Vertical}/>
      </View>
      <View className='my-3 p-1'>
        <Text className='mb-5 text-text text-base font-regular'>What do you thing about Todyapp </Text>
        <Text className='mb-5 text-text text-base font-regular'>Visit the help center </Text>
        <Text className='mb-5 text-text text-base font-regular'>how to use Todyapp </Text>
        <Text className='mb-5 text-text text-base font-regular'>Get organize anywhere </Text>
        <Text className='mb-5 text-text text-base font-regular'>Kickstart your project </Text>
      </View>
    </Layout>
  );
};

export default Instructions;
