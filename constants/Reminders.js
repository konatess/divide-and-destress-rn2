import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Strings from '../constants/Strings';
import Moment from 'moment';

export default {
    askPermissions: async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.USER_FACING_NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
          finalStatus = status;
        }
        console.log(finalStatus);
        if (finalStatus !== "granted") {
          return false;
        }
        return true;
    },
    // change input for due date, freq and time
    // use due date to set 'due tomorrow' at time
    // get difference between today and due date -1
    // iterate every freq until due date: schedule by date at time
    scheduleNotification: async (title, language, freq, time, dueDate) => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            }),
        });
        console.log("Scheduling " + title)
        const from = Moment(time, Strings.timeFormat);
        const h = from.hour();
        const m = from.minute();
        const d = Moment(dueDate).hour(h).minute(m).subtract(1, 'day');
        const remain = d.diff(from,'day');
        let trigger = d.toDate();
        console.log(trigger)
        try {
            console.log('Remain = ' + remain)
            if (remain > 0) {
                console.log('trying due for ' + title)
                // try {
                //     console.log(await Notifications.scheduleNotificationAsync({
                //         content: {
                //         title: title,
                //         body: Strings[language].alerts.reminders.dueTom,
                //         },
                //         trigger
                //     }))
                // } catch (error) {
                //     console.error(error.message);
                // }
                const dueReminderID = await Notifications.scheduleNotificationAsync({
                    content: {
                    title: title,
                    body: Strings[language].alerts.reminders.dueTom,
                    },
                    trigger
                });
                console.log('DueTom = ' + dueReminderID)
    
                const remindersArray = [];
    
                for (let i = freq; i < remain; i = i + freq) {
                    console.log("for loop");
                    // set to freq because Moment is mutable. Would change to i for DayJS or other immutable date system
                    let trigger = d.subtract(freq, 'day').toDate();
                    let id = await Notifications.scheduleNotificationAsync({
                        content: {
                        title: title,
                        body: Strings[language].alerts.reminders.regular,
                        },
                        trigger
                    });
                    console.log('Created ID: ' + id);
                    remindersArray.push(id);
                }
                return {
                    dueTom: dueReminderID,
                    regular: remindersArray
                }
            }
            else {
                return {
                    dueTom: null,
                    regular: [],
                }
            } 
        }
        catch (error) {
            console.log(error);
        }
    },
    cancelNotification: async (iDsArray) => {
        iDsArray.forEach(async element => {
            await Notifications.cancelScheduledNotificationAsync(element);
        });
    },
    cancelAll: async () => {
        try {
            await Notifications.cancelAllScheduledNotificationsAsync();
        }
        catch (error) {
            console.log(error)
        }
    }
}