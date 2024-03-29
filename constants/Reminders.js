import * as Notifications from "expo-notifications";
import Strings from '../constants/Strings';
import Moment from 'moment';

export default {
    askPermissions: async () => {
        const settings = await Notifications.getPermissionsAsync();
        if (!(settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED)) {
            return await Notifications.requestPermissionsAsync({
                ios: {
                  allowAlert: true,
                  allowSound: true,
                  allowAnnouncements: true,
                },
            });
        }
        else {
            return true
        }
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
        const from = Moment(time, Strings.timeFormat);
        const h = from.hour();
        const m = from.minute();
        const d = Moment(dueDate).hour(h).minute(m).subtract(1, 'day');
        const remain = d.diff(from,'day');
        let trigger = d.toDate();
        try {
            if (remain > 0) {
                const dueReminderID = await Notifications.scheduleNotificationAsync({
                    content: {
                    title: title,
                    body: Strings[language].alerts.reminders.dueTom,
                    },
                    trigger
                });
    
                const remindersArray = [];
    
                for (let iter = freq; iter < remain; iter = iter + freq) {
                    // set to freq because Moment is mutable. Would change to i for DayJS or other immutable date system
                    let trigger = d.subtract(freq, 'day').toDate();
                    let id = await Notifications.scheduleNotificationAsync({
                        content: {
                        title: title,
                        body: Strings[language].alerts.reminders.regular,
                        },
                        trigger
                    });
                    remindersArray.push(id);
                }
                return {
                    dueTom: dueReminderID,
                    regular: remindersArray
                }
            }
            else {
                return {
                    dueTom: "",
                    regular: [],
                }
            } 
        }
        catch (error) {
            console.log(error.message);
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
            console.log(error.message)
        }
    }
}