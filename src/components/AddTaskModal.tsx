import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, Text, TextInput, ScrollView, Image, Modal } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import {
  calendar,
  calendarGray,
  Clock,
  directInbox,
  directInboxGray,
  Flag,
  Send,
} from 'assets/images/image-exports';

type Props = {
  onSave: (task: any) => void;
};

export type AddTaskSheetRef = {
  open: () => void;
  close: () => void;
};

const emojis = ['😀', '🤢', '😎', '🥰', '🙌', '👋', '😯', '✌️'];

const AddTaskSheet = forwardRef<AddTaskSheetRef, Props>(({ onSave }, ref) => {
  const sheetRef = React.useRef<ActionSheetRef>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState<
    'Priority task 1' | 'Priority task 2' | 'Priority task 3' | 'Priority task 4'
  >('Priority task 1');

  const handleSave = () => {
    if (!title) return;
    const newTask = {
      id: uuidv4(),
      title,
      description,
      date,
      time,
      priority,
    };
    onSave(newTask);
    resetForm();
    sheetRef.current?.hide();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setPriority('Priority task 1');
  };

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.show(),
    close: () => sheetRef.current?.hide(),
  }));

  return (
    <ActionSheet
      ref={sheetRef}
      gestureEnabled
      containerStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
      <View className="mb-10 p-4 px-8">
        <TextInput
          className="mb-2 border-b border-gray-200 p-4 font-medium text-base"
          placeholder="eg : Meeting with client"
          placeholderTextColor="#A0A0A0"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          className="mb-3 border-b border-gray-200 p-4 text-sm"
          placeholder="Description"
          placeholderTextColor="#A0A0A0"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View className="mt-3 flex-row items-center">
          <TouchableOpacity className="mr-3 p-2">
            <Image source={directInbox} />
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 p-2">
            <Image source={calendarGray} />
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 p-2">
            <Image source={Clock} />
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 p-2">
            <Image source={Flag} />
          </TouchableOpacity>

          <TouchableOpacity className="ml-auto" onPress={handleSave}>
            <Image source={Send} />
          </TouchableOpacity>
        </View>
{/* <Modal>

</Modal> */}
        {/* Emoji Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          {emojis.map((emoji) => (
            <Text
              key={emoji}
              className="mr-3 text-xl"
              onPress={() => setDescription((prev) => prev + ' ' + emoji)}>
              {emoji}
            </Text>
          ))}
        </ScrollView>
      </View>
    </ActionSheet>
  );
});

export default AddTaskSheet;
