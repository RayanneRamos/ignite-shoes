import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag("user_email", email);
}

export function deleteTag() {
  OneSignal.deleteTag("user_email");
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Rayanne",
    user_email: "rayanneramos@gmail.com",
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag("cart_items_count", itemsCount);
}
