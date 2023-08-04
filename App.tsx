import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import {
  tagUserEmailCreate,
  tagUserInfoCreate,
} from "./src/notifications/notificationsTags";
import { useEffect, useState } from "react";
import { Notification } from "./src/components/Notification";

OneSignal.setAppId("f8d15092-f1cb-4e45-a3cc-ccc3e631e1d2");
OneSignal.setEmail("rayanneramos@gmail.com");

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log(response);
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [notification, setNotification] = useState<OSNotification>();

  tagUserEmailCreate("rayanneramos@gmail.com");
  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();
        setNotification(response);
      }
    );
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
      {notification?.title && (
        <Notification
          title={notification.title}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NativeBaseProvider>
  );
}
