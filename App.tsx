import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import OneSignal from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import {
  tagUserEmailCreate,
  tagUserInfoCreate,
} from "./src/notifications/notificationsTags";
import { useEffect } from "react";

OneSignal.setAppId("f8d15092-f1cb-4e45-a3cc-ccc3e631e1d2");
OneSignal.setEmail("rayanneramos@gmail.com");

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log(response);
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate("rayanneramos@gmail.com");
  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler(() => {
      console.log("Notificação aberta!");
    });
    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
