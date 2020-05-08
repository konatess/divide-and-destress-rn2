import { AsyncStorage } from 'react-native';
import Strings from '../constants/Strings';

export default {
    getSettings: async () => {
        try {
            const settingsobj = await AsyncStorage.getItem(Strings.keys.settings)
            return JSON.parse(settingsobj);
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