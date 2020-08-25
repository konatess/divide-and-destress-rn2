import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
import Strings from '../constants/Strings';

export default function showError(language, msg) {
if (Platform.OS === 'android') {
  ToastAndroid.show(Strings[language].alerts.error + msg, ToastAndroid.SHORT)
} else {
  AlertIOS.alert(Strings[language].alerts.error + msg);
}
}