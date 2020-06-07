import { AsyncStorage } from 'react-native';
import Strings from '../constants/Strings';

export default {
    getSettings: async () => {
        try {
            const settingsobj = await AsyncStorage.getItem(Strings.keys.settings);
            if (settingsobj) {
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
            let keys = await AsyncStorage.getAllKeys();
            let allKeys = await AsyncStorage.multiGet(keys, (err, stores) => {
                err && console.log(err);
            });
            let filterProj = allKeys.filter((result, i, store) => {
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                return key.startsWith(Strings.keys.projPrefix)
            });
            let projArr =  filterProj.map((result, i, store) => {
                let key = store[i][0];
                let value = JSON.parse(store[i][1]);
                return {key: key, obj: value}
            });
            return projArr;
        }
        catch (error) {
            return console.log('Rejected: ' + error);
        }
    },
    deleteAllProj: async () => {
        // get settings, and anything else I need
        // clear all
        // resave settings, etc
    },
    createProj: async (projobj) => {
        AsyncStorage.setItem(Strings.keys.projPrefix + projobj.title, JSON.stringify(projobj), (err) => {
            err && console.log(err);
        });
    },
    readProj: async (projkey) => {
        try {
            const project = await AsyncStorage.getItem(projkey);
            if (project) {
                return JSON.parse(project);
            }
        }
        catch (error) {
            return console.log(error);
        }
    },
    updateProj: async (projkey, projobj) => {
        AsyncStorage.mergeItem(projkey, JSON.stringify(projobj), (err) => {
            err && console.log(err);
        })
    },
    deleteProj: async (projkey) => {
        AsyncStorage.removeItem(projkey, (err) => {
            err && console.log(err);
        });
    }
};