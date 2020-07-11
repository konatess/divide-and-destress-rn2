import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StatusBar, StyleSheet, Text, View} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AllButtons from '../constants/ButtonClass';
import ButtonBar from '../components/ButtonBar';
import CustModal from '../components/Modal';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import Storage from '../storage/Async';

export default function SettingsScreen( {route, navigation} ) {
	const {settings} = route.params
	const buttons = AllButtons.settingsList
	// settings object
	const [darkMode, setDarkMode] = React.useState(settings.darkmode);
	const [language, setLanguage] = React.useState(settings.language);
	const [dateFormat, setDateFormat] = React.useState(settings.dateFormat);
	const [freq, setFreq] = React.useState(settings.notifications.freq);
	const [selectedFreq, setSelectedFreq] = React.useState(settings.notifications.freq-1);
	const [time, setTime] = React.useState(settings.notifications.time);
	const [selectedHour, setSelectedHour] = React.useState(settings.notifications.time.slice(0,2));
	const [selectedMin, setSelectedMin] = React.useState(settings.notifications.time.slice(3,6));
	const [unit, setUnit] = React.useState(settings.unit);
	const [userUnits, setuserUnits] = React.useState(settings.userUnits);
	// modal
	const timeMsg = `${Strings[language].labels.frequency} ${Strings[language].frequencyWords[selectedFreq+1]}  
${Strings[language].labels.time} ${selectedHour + ":" + selectedMin} \n
${Strings[language].alerts.settings.notify}`;
	React.useEffect(() => {
		setModalMessage(timeMsg)
	}, [selectedFreq, selectedHour, selectedMin]);
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
	const [modalButtons, setModalButtons] = React.useState([]);
	const [modalPickers, setModalPickers] = React.useState([]);
	const modalCancelbtn = AllButtons.cancel2;
	modalCancelbtn._title = Strings[language].buttons.cancel;
	modalCancelbtn.onPress = () => setmodalVisible(false);
	const modalDonebtn = AllButtons.done;
	modalDonebtn._title = Strings[language].buttons.done;
	const savebtn = AllButtons.save;
	savebtn._title = Strings[language].buttons.save;
	savebtn.onPress = () => {
		settings.darkmode = darkMode;
		console.log(settings);
	};
	const cancelbtn = AllButtons.cancel;
	cancelbtn._title = Strings[language].buttons.cancel;
	cancelbtn.onPress = () => {
		navigation.navigate(Strings.routes.home); 
	};
	const dateFormatBtns = Strings.dateFormats.map((string) => {
		return ({_title: string, _color: Colors.edit, onPress: () => {
			setmodalVisible(false);
			setDateFormat(string);
		}})
	});
	const languageBtns = Strings.languages.map((string) => {
		return ({_title: string, _color: Colors.edit, onPress: () => {
			setmodalVisible(false);
			setLanguage(string);
		}})
	});
	const freqWords = Strings[language].frequencyWords.slice(1, Strings[language].frequencyWords.length)
	const freqBtns = freqWords.map((string, index) => {
		return ({_title: string, onPress: () => {
			setSelectedFreq(index);
		}})
	});
	const hours = [];
	for (var i = 0; i < 24; i++) {
		let s = i.toString();
		hours.push(s.length > 1 ? s : "0" + s);
	};
	const hoursBtns = hours.map((string, index) => {
		return ({_title: string, _color: Colors.edit, onPress: () => {
			setSelectedHour(string);
		}})
	});
	const minutes = [];
	for (var i = 0; i <= 55; i = i+5) {
		let s = i.toString();
		minutes.push(s.length > 1 ? s : "0" + s);
	};
	const minutesBtns = minutes.map((string, index) => {
		return ({_title: string, _color: Colors.edit, onPress: () => {
			setSelectedMin(string);
		}})
	});
	const unitBtns = Strings[language].units.concat(userUnits).map((string, index) => {
		return ({_title: string, onPress: () => {
			setmodalVisible(false)
			setUnit(index);
		}})
	});
	const editUnitBtns = [Strings[language].labels.new].concat(userUnits).map((string, index) => {
		return ({_title: string, onPress: () => {
			setmodalVisible(false)
			
		}})
	});
	buttons.darkMode._title = Strings[language].buttons.allSettings.darkMode;
	buttons.darkMode.onPress = () => {
		setDarkMode(!darkMode);
	}
	buttons.language._title = Strings[language].buttons.allSettings.language;
	buttons.language.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.language);
		setModalPickers([languageBtns]);
		setModalButtons([modalCancelbtn]);
	};
	buttons.dateFormat._title = Strings[language].buttons.allSettings.dateFormat + ":     " + dateFormat;
	buttons.dateFormat.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.dateFormat);
		setModalPickers([dateFormatBtns]);
		setModalButtons([modalCancelbtn]);
	};
	buttons.notifications._title = Strings[language].buttons.allSettings.notifications;
	buttons.notifications.onPress = () => {
		modalDonebtn.onPress = () => {
			setmodalVisible(false);
			setTime(selectedHour + ":" + selectedMin);
			setFreq(selectedFreq+1);
		};
		setmodalVisible(true);
		setModalMessage(timeMsg);
		setModalPickers([freqBtns, hoursBtns, minutesBtns]);
		setModalButtons([modalCancelbtn, modalDonebtn]);
	};
	buttons.defaultUnit._title = Strings[language].buttons.allSettings.unit + ":     " + Strings[language].units.concat(userUnits)[unit];
	buttons.defaultUnit.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.defUnit);
		setModalPickers([unitBtns]);
		setModalButtons([modalCancelbtn]);
	};
	buttons.editUnit._title = Strings[language].buttons.allSettings.editUnit;
	buttons.editUnit.onPress = () => console.log(settings.unit);
	buttons.deleteAll._title = Strings[language].buttons.allSettings.deleteAll;
	buttons.deleteAll.onPress = () => console.log('clicked Delete All');
	buttons.feedback._title = Strings[language].buttons.allSettings.feedback;
	buttons.feedback.onPress = () => console.log('clicked Feedback');
	const buttonsArr = [
		buttons.darkMode,
		buttons.language,
        buttons.dateFormat,
        buttons.notifications,
		buttons.defaultUnit,
		buttons.editUnit,
        buttons.deleteAll,
        buttons.feedback,
	]
	return (
		<View style={[styles.container, {backgroundColor: darkMode ? Colors.darkmode.background : Colors.mainbackground} ]} contentContainerStyle={styles.contentContainer}>
			<StatusBar 
				barStyle={darkMode ? "light-content" : "dark-content"} 
				backgroundColor={darkMode ? Colors.darkmode.background : Colors.mainbackground} 
			/>
			<View style={styles.container}>
				{buttonsArr.map((unit, index) => {
						return (
							<RectButton style={[styles.option, (index === buttonsArr.length - 1) && styles.lastOption]} onPress={unit.onPress} key={unit._title}>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.optionIconContainer}>
										<Ionicons name={unit._iconName} size={22} color={Colors.settingsIcons} />
									</View>
									<View style={styles.optionTextContainer}>
										<Text style={[styles.optionText, {color: darkMode ? Colors.darkmode.text : Colors.maintext}]}>{unit._title}</Text>
									</View>
								</View>
							</RectButton>
						)
				})}
			</View>
			<CustModal 
				visible={modalVisible} 
				message={modalMessage} 
				pickers={modalPickers}
				buttons={modalButtons} 
				darkmode={darkMode}
				/>
			
			<ButtonBar buttons={[ cancelbtn, savebtn ]} />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	paddingTop: 10
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
	marginRight: 12,
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
