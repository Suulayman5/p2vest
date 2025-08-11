import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { formatTodayDate } from 'utils/formatDate';
import { getTodo } from '~/service/api';
type Props = {
    
};
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
type ReturnType = {
  tasks: Task[];
  combinedTasks: Task[];
  addTask: (task: Task) => void;
  loadTasks: () => Promise<void>;
  saveTasks: (newTasks: Task[]) => Promise<void>;
  bg: ({ completed }: { completed: boolean }) => string | undefined;
  taskbg: ({ priority }: { priority: Task['priority'] }) => string | undefined;
  text: ({ completed, priority }: { completed: boolean; priority: Task['priority'] }) => string | undefined;
  getRandomDate: () => string;
//   addTaskSheetRef: React.RefObject<AddTaskSheetRef>;
};
function useLogic({}: Props = {}): ReturnType {
//   const navigation = useNavigation();
const STORAGE_KEY = '@tasks';
  const [tasks, setTasks] = useState<Task[]>([]);
  const bg = ({ completed }) => {
    if (completed === true) return '#24A19C';
    else if (completed === false) return '#EA4335';
  };
  const taskbg = ({ priority }) => {
    if (priority === 'Priority task 1') return '#24A19C';
    if (priority === 'Priority task 2') return '#F09643';
    if (priority === 'Priority task 3') return '#EA4335';
    if (priority === 'Priority task 4') return '#73C0E2';
  };
  const DATE = [
    'Tue, 19 Aug 2025 ',
    'Fri, 19 Sept 2025 ',
    'Sun, 10 Aug 2025 ',
    'Thur, 19 Oct 2025 ',
    formatTodayDate(),
  ];

  const getRandomDate = () => {
    return DATE[Math.floor(Math.random() * DATE.length)];
  };

  const text = ({ completed, priority }: { completed: boolean; priority: Task['priority'] }) => {
    if (completed === true) return 'Priority task 1';
    else if (completed === false) return 'Priority task 3';
    else if (priority === 'Priority task 1') return 'Priority task 1';
    else if (priority === 'Priority task 2') return 'Priority task 2';
    else if (priority === 'Priority task 3') return 'Priority task 3';
    else if (priority === 'Priority task 4') return 'Priority task 4';
  };
  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      const parsed: Task[] = JSON.parse(savedTasks);

      const updatedTasks = parsed.map((task) => ({
        ...task,
        date: task.date || getRandomDate(),
      }));

      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  const addTask = (task: Task) => {
    const updated = [task, ...tasks];
    setTasks(updated);
    saveTasks(updated);
  };
  const todo = useQuery({ queryKey: ['todos'], queryFn: getTodo });
  const data = todo?.data ?? [];

//   console.log('todo=======>>>>>>>>>>>', data);
  const apiTasks = (todo?.data ?? []).map((task: Task) => ({
    ...task,
    date: task.date || getRandomDate(),
  }));

  const combinedTasks = [...tasks, ...apiTasks];


  return {
    tasks,
    combinedTasks,
    addTask,
    loadTasks,
    saveTasks,
    bg,
    taskbg,
    text,
    getRandomDate,
    // addTaskSheetRef,
  };
}

export default useLogic;
