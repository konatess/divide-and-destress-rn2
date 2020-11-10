import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Strings from '../constants/Strings';
import { Project } from "./ProjectClass";
import * as Moment from 'moment';

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
    scheduleNotification: async (projectID, language, title, freq, time, dueDate) => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
        });
        const h = Moment(time, Strings.timeFormat).hour();
        console.log('hour = ' + h);
        const m = Moment(time, Strings.timeFormat).minute();
        console.log('minute = ' + m);
        const d = Moment(dueDate).hour(h).minute(m).subtract(1, 'day');
        const remain = Moment().hour(h).minute(m).diff(d, 'day');
        console.log(remain);
        let trigger = d.toDate();

        const dueReminderID = await Notifications.scheduleNotificationAsync({
            content: {
              title: title,
              body: Strings[language].reminders.dueTom,
              data: {projectID: projectID}
            },
            trigger
        });

        const remindersArray = [];

        for (i = freq; i < remain; i = i = i + freq) {
            let trigger = Moment().add(i, 'day').toDate();
            let id = await Notifications.scheduleNotificationAsync({
                content: {
                  title: title,
                  body: body,
                  data: {projectID: projectID}
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
}