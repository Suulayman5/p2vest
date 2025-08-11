import './global.css';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'src/pages/main/login';
import ChooseThemeScreen from 'src/pages/main/homepage/ChooseThemeScreen';
import { ThemeProvider } from 'src/context/themeContext';
import HomeScreen from 'src/pages/main/homepage/home';
import BottomTabs from 'src/pages/main/homepage/_Layout';
import MenuPage from 'src/pages/main/menu/menuPage';
import UpcomingScreen from 'src/pages/main/upcoming';
import FilterScreen from 'src/pages/main/Filter&Labels';
import SettingScreen from 'src/pages/main/Setting';
import ProjectScreen from 'src/pages/main/Project';
import AccountScreen from 'src/pages/main/Account';
import Toast from 'react-native-toast-message';
import Instructions from '~/pages/main/Instructions';
import TryBoardScreen from '~/pages/main/TryBoards';

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await EncryptedStorage.getItem("user_token");
        setInitialRoute(token ? "Main" : "Login");
      } catch (e) {
        console.error("Error reading token:", e);
        setInitialRoute("Login");
      }
    };

    checkToken();
  }, []);

  if (!initialRoute) {
    // Show a loading spinner while checking
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={initialRoute}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Theme" component={ChooseThemeScreen} />
              <Stack.Screen name="Main" component={BottomTabs} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Menu" component={MenuPage} />
              <Stack.Screen name="Upcoming" component={UpcomingScreen} />
              <Stack.Screen name="Filter" component={FilterScreen} />
              <Stack.Screen name="Setting" component={SettingScreen} />
              <Stack.Screen name="Project" component={ProjectScreen} />
              <Stack.Screen name="Account" component={AccountScreen} />
              <Stack.Screen name="Instructions" component={Instructions} />
              <Stack.Screen name="TryBoard" component={TryBoardScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </ThemeProvider>
      <Toast />
    </>
  );
}
