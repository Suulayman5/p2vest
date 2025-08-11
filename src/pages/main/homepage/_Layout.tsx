import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';

// import Shipments from "./../(dashboard)/index";
// import {shipmentsIcon, walletIcon, scanIcon, profileIcon} from "@/assets/images/image-exports";

import { isEmpty, isNil } from 'lodash';
import {
  calendarGray,
  CategoryGray,
  directInboxGray,
  HomeGray,
  PaperPlusGray,
} from 'assets/images/image-exports';
import HomeScreen from './home';
import LoginScreen from '../login';
import { useTheme } from 'src/context/themeContext';
import MenuPage from '../menu/menuPage';
import UpcomingScreen from '../upcoming';
import FilterScreen from '../Filter&Labels';
import SettingScreen from '../Setting';
import ProjectScreen from '../Project';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { primary } = useTheme();
  return (
    <Tab.Navigator
      // screenOptions={{ headerShown: false }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 16,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = HomeGray;
              break;
            case 'Menu':
              icon = directInboxGray;
              break;
            case 'Upcoming':
              icon = calendarGray;
              break;
            case 'Filter':
              icon = CategoryGray;
              break;
            case 'Project':
              icon = PaperPlusGray;
              break;
          }

          return (
            <>
              {/* <View className="justify-space-between items-center"> */}

              {focused && <View className="h-1 w-full" style={{ backgroundColor: primary }}></View>}
              <Image
                source={icon}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 10,
                  tintColor: focused ? primary : '#A0AAB8',
                }}
                resizeMode="contain"
              />
              {/* </View> */}
            </>
          );
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: '#A0AAB8',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuPage} />
      <Tab.Screen name="Upcoming" component={UpcomingScreen} />
      <Tab.Screen name="Filter" component={FilterScreen} />
      <Tab.Screen name="Project" component={ProjectScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
