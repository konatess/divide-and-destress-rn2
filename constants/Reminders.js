import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Strings from '../constants/Strings';
import { Project } from "./ProjectClass";
import Moment from 'moment';

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
    // change input for due date, freq and time
    // use due date to set 'due tomorrow' at time
    // get difference between today and due date -1
    // iterate every freq until due date: schedule by date at time
    scheduleNotification: async (title, dueBody, repeatBody, freq, time, dueDate) => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
        });

        const from = Moment(time, Strings.timeFormat);
        const h = from.hour();
        console.log('hour = ' + h);
        const m = from.minute();
        console.log('minute = ' + m);
        const d = Moment(dueDate).hour(h).minute(m).subtract(1, 'day');
        const remain = d.diff(from,'day');
        console.log('days remaining: ' + remain);
        let trigger = d.toDate();
        console.log(trigger);

        const dueReminderID = await Notifications.scheduleNotificationAsync({
            content: {
              title: title,
              body: dueBody,
            },
            trigger
        });

        const remindersArray = [];

        for (i = freq; i < remain; i = i + freq) {
            let trigger = from.add(i, 'day').toDate();
            let id = await Notifications.scheduleNotificationAsync({
                content: {
                  title: title,
                  body: repeatBody,
                },
                trigger
            });
            remindersArray.push(id);
        }

        return {
            dueTom: dueReminderID,
            regular: remindersArray
        }
    },
    cancelNotification: async (iDsArray) => {
        iDsArray.forEach(async element => {
            await Notifications.cancelScheduledNotificationAsync(element);
        });
    }
}