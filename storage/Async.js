import { AsyncStorage } from 'react-native';
import Strings from '../constants/Strings';

export default {
    getSettings: async () => {
        try {
            const settingsobj = await AsyncStorage.getItem(Strings.keys.settings)
            if (settingsobj !== null) {
                return JSON.parse(settingsobj);
            }
            else {
                return {
                    darkmode: false,
                    language: 'English',
                    dayChange: '00:00',
                    dateFormat: 'mm/dd',
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

    },
    deleteAllProj: async () => {

    },
    createProj: async (projobj) => {

    },
    readProj: async (projkey) => {

    },
    updateProj: async (projobj) => {

    },
    deleteProj: async (projkey) => {

    }
};

const _retrieveData = async () => {
	try {
	  	const value = await AsyncStorage.getItem('SETTINGS');
		if (value !== null) {
			settingsobj = value
		}
	} catch (error) {
	  	console.log(error);
	}
};