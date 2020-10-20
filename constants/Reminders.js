import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default {
    askPermissions: async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          return false;
        }
        return true;
      },
    
    sendNotificationImmediately: async () => {
        let notificationId = await Notifications.presentLocalNotificationAsync({
          title: "This is crazy",
          body: "Your mind will blow after reading this"
        });
        console.log(notificationId); // can be saved in AsyncStorage or send to server
    }
}