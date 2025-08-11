import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Layout from 'src/components/Layout';
import { useTheme } from 'src/context/themeContext';
import { scaledSize } from 'utils';
import { Addwhite, setting } from 'assets/images/image-exports';
import { formatTodayDate } from 'utils/formatDate';
import { useNavigation } from '@react-navigation/native';
import AddTaskSheet, { AddTaskSheetRef } from 'src/components/AddTaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = '@tasks';

const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState(formatTodayDate());
  const navigation = useNavigation();
  const { primary } = useTheme();
  const addTaskSheetRef = useRef<AddTaskSheetRef>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(formatTodayDate());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveTask = async (task: any) => {
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks = existing ? JSON.parse(existing) : [];

      const newTask = {
        id: uuidv4(),
        ...task, // title, date, time, priority from AddTaskSheet
      };

      const updatedTasks = [newTask, ...tasks];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

      console.log('Task saved:', newTask);
    } catch (err) {
      console.error('Error saving task', err);
    }
  };

  return (
    <Layout>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="mt-2 font-semibold text-2xl text-textbold">Today</Text>
          <Text className="mt-3 font-semibold text-sm text-text">
            Best platform for creating to-do lists
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image source={setting} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => addTaskSheetRef.current?.open()}
        className="relative my-3 mt-12 rounded-t-2xl"
        style={{
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <View
          style={{
            backgroundColor: primary,
            height: scaledSize(36),
            borderTopLeftRadius: scaledSize(8),
            borderTopRightRadius: scaledSize(8),
          }}
        />

        <View className="bg-white  p-5">
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: primary }}
            >
              <Image source={Addwhite} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <Text className="font-medium text-xl text-textblack">
              Tap plus to create a new task
            </Text>
          </View>
          <View className="mt-12 flex-row justify-between">
            <Text className="text-md font-regular text-text">Add your task </Text>
            <Text className="text-md font-regular text-text">{currentDate}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <AddTaskSheet ref={addTaskSheetRef} onSave={handleSaveTask} />
    </Layout>
  );
};

export default HomeScreen;
