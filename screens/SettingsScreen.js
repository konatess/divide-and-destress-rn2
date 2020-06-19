import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StatusBar, StyleSheet, Text, View} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
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
	const [notifications, setNotifications] = React.useState(settings.notifications);
	const [unit, setUnit] = React.useState(settings.unit);
	const [allUnits, setAllUnits] = React.useState(settings.allUnits);
	// modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
	const [modalButtons, setModalButtons] = React.useState([]);
	const modalCancelbtn = AllButtons.cancel2;
	modalCancelbtn._title = Strings[language].buttons.cancel;
	modalCancelbtn.onPress = () => setmodalVisible(false);
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
		return ({_title: string + '  ', _color: Colors.edit, _iconName: '', onPress: () => {
			setmodalVisible(false);
			setDateFormat(string);
		}})
	});
	const languageBtns = Strings.languages.map((string) => {
		return ({_title: string + '  ', _color: Colors.edit, _iconName: '', onPress: () => {
			setmodalVisible(false);
			setLanguage(string);
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
		languageBtns.push(modalCancelbtn);
		setModalButtons(languageBtns);
	};
	// buttons.dayChange._title = Strings[language].buttons.allSettings.dayChange;
	// buttons.dayChange.onPress = () => console.log(settings.dayChange);
	buttons.dateFormat._title = Strings[language].buttons.allSettings.dateFormat;
	buttons.dateFormat.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.dateFormat);
		dateFormatBtns.push(modalCancelbtn);
		setModalButtons(dateFormatBtns);
	};
	buttons.notifications._title = Strings[language].buttons.allSettings.notifications;
	buttons.notifications.onPress = () => console.log(settings.notifications);
	buttons.defaultUnit._title = Strings[language].buttons.allSettings.unit;
	buttons.defaultUnit.onPress = () => console.log(settings.unit);
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
