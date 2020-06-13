import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AllButtons from '../constants/ButtonClass';
import ButtonBar from '../components/ButtonBar';
import CustModal from '../components/Modal';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import Storage from '../storage/Async';
import ButtonClass from '../constants/ButtonClass';

export default function SettingsScreen( {route, navigation} ) {
	const {settings} = route.params
	const buttons = AllButtons.settingsList
	const [darkMode, setDarkMode] = React.useState(settings.darkMode);
	// modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
	const [modalButtons, setModalButtons] = React.useState([]);
	const dateFormatBtns = Strings.dateFormats.map((string) => {
		return ({_title: string, _color: Colors.done, _iconName: '', onPress: () => {
			setmodalVisible(false);
			settings.dateFormat = string;
			console.log(settings.dateFormat);
		}})
	});
	const languageBtns = Strings.languages.map((string) => {
		return ({_title: string, _color: Colors.done, _iconName: '', onPress: () => {
			setmodalVisible(false);
			settings.language = string;
			console.log(settings.language);
		}})
	});
	const savebtn = AllButtons.save;
	buttons.darkMode.onPress = () => setDarkMode(!darkMode);
	buttons.language.onPress = () => {
		console.log(settings.language);
		setmodalVisible(true);
		setModalMessage(Strings.alerts.settings.language);
		setModalButtons(languageBtns);
	};
	buttons.dayChange.onPress = () => console.log(settings.dayChange);
	buttons.dateFormat.onPress = () => {
		console.log(settings.dateFormat);
		setmodalVisible(true);
		setModalMessage(Strings.alerts.settings.dateFormat);
		setModalButtons(dateFormatBtns);
	};
	buttons.notifications.onPress = () => console.log(settings.notifications);
	buttons.startVsTotal.onPress = () => console.log(settings.total);
	buttons.unit.onPress = () => console.log(settings.unit);
	buttons.tags.onPress = () => console.log(settings.tags);
	buttons.deleteAll.onPress = () => console.log('clicked Delete All');
	buttons.feedback.onPress = () => console.log('clicked Feedback');
	savebtn.onPress = () => {
		console.log(settings);
	};
	const buttonsArr = [
		buttons.darkMode,
		buttons.language,
        // buttons.dayChange,
        buttons.dateFormat,
        buttons.notifications,
        buttons.startVsTotal,
        buttons.unit,
        buttons.tags,
        buttons.deleteAll,
        buttons.feedback,
	]
	return (
		<View style={[styles.container, {backgroundColor: darkMode ? Colors.darkmode.background : Colors.mainbackground} ]} contentContainerStyle={styles.contentContainer}>
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
			
			<ButtonBar buttons={[ savebtn ]} />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
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
