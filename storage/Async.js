import AsyncStorage from '@react-native-async-storage/async-storage';
import Notify from '../components/Notify';
import Strings from '../constants/Strings';

export default {
    getSettings: async (language) => {
        try {
            const settingsobj = await AsyncStorage.getItem(Strings.keys.settings);
            if (settingsobj) {
                return JSON.parse(settingsobj);
            }
            else {
                return {
                    darkmode: false,
                    language: 'English',
                    dateFormat: 'MM/DD',
                    notifications: {
                        freq: 1,
                        time: '8:00 pm'
                    },
                    unit: 1,
                    userUnits: {
                        s: [],
                        p: []
                    },
                };
            }
        }
        catch (error) {
            return Notify(language, error);
        }
    },
    saveSettings: async (settingsobj, language) => {
        try {
            await AsyncStorage.setItem(Strings.keys.settings, JSON.stringify(settingsobj))
        }
        catch (error) {
            return Notify(language, error);
        }
    },
    getAllProj: async (language) => {
        try {
            let keys = await AsyncStorage.getAllKeys();
            let allKeys = await AsyncStorage.multiGet(keys, (err, stores) => {
                err && Notify(language, err);
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
            return Notify(language, error);
        }
    },
    deleteAllProj: async (keys, language) => {
        if (keys.length) {
            try {
                AsyncStorage.multiRemove(keys, (err) => {
                    err && Notify(language, err);
                });
            }
            catch (error) {
                return Notify(language, error);
            }
        }
    },
    createProj: async (projobj, language) => {
        AsyncStorage.setItem(Strings.keys.projPrefix + projobj.title, JSON.stringify(projobj), (err) => {
            err && Notify(language, err);
        });
    },
    readProj: async (projkey, language) => {
        try {
            const project = await AsyncStorage.getItem(projkey);
            if (project) {
                return JSON.parse(project);
            }
        }
        catch (error) {
            return Notify(language, error);
        }
    },
    updateProj: async (projkey, projobj, language) => {
        try {
            AsyncStorage.mergeItem(projkey, JSON.stringify(projobj), (err) => {
                err && Notify(language, err);
            })
        }
        catch (error) {
            return Notify(language, error);
        }
    },
    deleteProj: async (projkey, language) => {
        try {
            AsyncStorage.removeItem(projkey, (err) => {
                err && Notify(language, err);
            });
        }
        catch (error) {
            return Notify(language, error);
        }
    }
};