import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Layout from 'src/components/Layout'
import { add, Addwhite, ArrowLeft4, Heart, Question, searchNormal, Settings } from 'assets/images/image-exports'
import { useNavigation } from '@react-navigation/native'

const ProjectScreen = () => {
  const navigation = useNavigation()
  return (
    <Layout>
            <View className="flex-row items-center justify-between mb-5">
              <TouchableOpacity>
                 <Image source={ArrowLeft4}/>
              </TouchableOpacity>
              <Text className="font-semibold text-textblack text-lg">Projects</Text>
              <TouchableOpacity>
               <Image source={searchNormal}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className='flex-row justify-between items-center my-4'>
              <Text className='text-bold font-medium text-lg'>Filter your task </Text>
              <Image source={Addwhite} style={{ tintColor: "#767E8C"}} width={20} height={20}/>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={()=> navigation.navigate('Instructions')} className='flex-row items-center gap-5 my-2'>
                <Image source={Question}/>
                <Text className='text-text font-regular text-base'> Instructions For Use</Text>
                {/* <View>{''}</View> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('TryBoard')} className='flex-row items-center justify-between w-full my-2'>
                <View className='flex-row justify-between items-center gap-5'>
                  <Image source={Question}/>
                  <Text className='text-text font-regular text-base'> Try Boards</Text>
                </View>
                <Image source={Heart}/>
              </TouchableOpacity>
              <View className='flex-row items-center justify-between w-full my-2'>
                <View className='flex-row justify-between items-center gap-5'>
                  <Image source={Settings}/>
                  <Text className='text-text font-regular text-base'> Manage Projects</Text>
                </View>
                <Image source={Heart}/>
              </View>
            </View>
    </Layout>
  )
}

export default ProjectScreen