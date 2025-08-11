import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '~/components/Layout';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft4, FlagWhite, Icongray, Line, Vertical } from 'assets/images/image-exports';
import { scaledSize } from 'utils';
import useLogic from '../menu/index.logic';
import { AddTaskSheetRef } from '~/components/AddTaskModal';

type Task = {
  id: string;
  title: string;
  todo: string;
  description: string;
  date: string;
  time: string;
  priority: 'Priority task 1' | 'Priority task 2' | 'Priority task 3' | 'Priority task 4';
  completed: false | true;
};

const TryBoardScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    loadTasks();
  }, []);
  const addTaskSheetRef = useRef<AddTaskSheetRef>(null);

  const {
    tasks,
    combinedTasks,
    addTask,
    loadTasks,
    // saveTasks,
    bg,
    taskbg,
    text,
    // getRandomDate,
  } = useLogic();
  const data = combinedTasks.slice(2, 8);
  const renderTask = ({ item }: { item: Task }) => (
    <View
      className="mb-3 overflow-hidden rounded-lg shadow-md"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      }}>
      <View
        style={{
          backgroundColor: bg({ completed: item.completed }) || taskbg({ priority: item.priority }),
          height: scaledSize(36),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          justifyContent: 'space-between',
        }}>
        <View className="flex-row items-center gap-6">
          <Image source={FlagWhite} />
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
            {/* {item.completed} */}
            {text({ completed: item.completed, priority: item.priority })}
          </Text>
        </View>
        <Image source={Line} />
      </View>

      <View className="bg-white p-5">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            className="h-8 w-8 items-center justify-center rounded-lg"
            // style={{ color: bg({ completed: item.completed }) }}
          >
            <Image
              source={Icongray}
              style={{
                width: 20,
                height: 20,
                tintColor: bg({ completed: item.completed }) || taskbg({ priority: item.priority }),
              }}
            />
          </TouchableOpacity>

          <Text className="text-md pr-12 font-medium text-textblack">
            {item.todo || item.title}
          </Text>
        </View>

        <View className="mt-4 flex-row justify-between">
          <Text className="text-md font-regular text-gray-500">{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Layout>
      <View className="mb-5 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ArrowLeft4} />
        </TouchableOpacity>
        <Text className="font-semibold text-lg text-textblack">Try Boards</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>
      <View className="mt-3 mb-6 flex-row items-center justify-between">
        <Text className="font-medium text-lg text-textbold"> In Progress</Text>
        <Image source={Vertical} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text className="mt-5 text-center text-gray-400">No tasks yet</Text>}
      />
    </Layout>
  );
};

export default TryBoardScreen;
