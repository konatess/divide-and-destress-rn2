import { AsyncStorage } from 'react-native';
import Strings from '../constants/Strings';

export default {
    getSettings: async () => {
        try {
            const settingsobj = await AsyncStorage.getItem(Strings.keys.settings);
            if (settingsobj !== null) {
                return JSON.parse(settingsobj);
            }
            else {
                return {
                    darkmode: false,
                    language: 'English',
                    dayChange: '00:00',
                    dateFormat: 'MM/DD',
                    notifications: {
                        freq: 1,
                        time: '20:00'
                    },
                    total: false,
                    unit: 1,
                    tags: []
                };
            }
        }
        catch (error) {
            return console.log(error);
        }
    },
    updateSettings: async (settingsobj) => {
        try {
            await AsyncStorage.mergeItem(Strings.keys.settings, JSON.stringify(settingsobj))
        }
        catch (error) {
            return console.log(error);
        }
    },
    getAllProj: async () => {
        try {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        console.log(key, value)
                    });
                });
            });
        }
        catch (error) {
            return console.log(error);
        }
    },
    deleteAllProj: async () => {

    },
    createProj: async (projobj) => {
        AsyncStorage.setItem(Strings.keys.projPrefix + projobj._title, JSON.stringify(projobj), (err) => {
            console.log(err);
        });
    },
    readProj: async (projkey) => {
        try {
            const project = await AsyncStorage.getItem(Strings.keys.projPrefix + projkey);
            if (project !== null) {
                return JSON.parse(project);
            }
        }
        catch (error) {
            return console.log(error);
        }
    },
    updateProj: async (projobj) => {

    },
    deleteProj: async (projkey) => {

    }
};