import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Keyboard, StatusBar, StyleSheet, Text, View, Linking, SafeAreaView, TouchableHighlight, Platform, Modal} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import AllButtons from '../constants/ButtonClass';
import ButtonBar from '../components/ButtonBar';
import CustModal from '../components/Modal';
import Notify from '../components/Notify';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import Storage from '../storage/Async';
import Moment from 'moment';
import Reminders from '../constants/Reminders';

export default function SettingsScreen( {route, navigation} ) {
	const {settings} = route.params
	const {projects} = route.params
	const buttons = AllButtons.settingsList
	// settings object
	const [darkMode, setDarkMode] = React.useState(settings.darkmode);
	const [language, setLanguage] = React.useState(settings.language);
	const [dateFormat, setDateFormat] = React.useState(settings.dateFormat);
	const [freq, setFreq] = React.useState(settings.notifications.freq);
	const [time, setTime] = React.useState(settings.notifications.time);
	const [unit, setUnit] = React.useState(settings.unit);
	const [editIndex, setEditIndex] = React.useState(-1);
	const [deletableUnits, setDeletableUnits] = React.useState([]);
	const [userUnits, setuserUnits] = React.useState(settings.userUnits);
	const [singUnit, setSingUnit] = React.useState('');
	const [pluUnit, setPluUnit] = React.useState('');
	// time picker
	const [showDate, setShowDate] = React.useState(false);
	// modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
	const [modalButtons, setModalButtons] = React.useState([]);
	const [modalPickers, setModalPickers] = React.useState([]);
	const [modalInputs, setModalInputs] = React.useState([]);
	const [donePush, setDonePush] = React.useState(false);
	const [buttonsVertical, setButtonsVertical] = React.useState(false);
	React.useEffect(() => {
		const updateUserUnits = () => {
			let sUnits = userUnits.s.slice()
			let pUnits = userUnits.p.slice()
			if (singUnit && pluUnit) {
				if (editIndex === -1) {
					sUnits.push(singUnit);
					pUnits.push(pluUnit);
				}
				else {
					sUnits[editIndex] = singUnit;
					pUnits[editIndex] = pluUnit;
					setEditIndex(-1);
				}
				setSingUnit('');
				setPluUnit('');
				setuserUnits({s: sUnits, p: pUnits});
			}
			setDonePush(false);
		}
		updateUserUnits();
	}, [donePush]);
	React.useEffect(() => {
		if (singUnit && pluUnit) {
			setModalButtons([modalCancelbtn, modalDonebtn]);
		}
	}, [singUnit, pluUnit]);
	React.useEffect(() => {
		let inUse = projects.map(project => {
			return project.obj._unitName
		})
		let list = []
		userUnits.s.filter((item, index) => {
			let adjustedI = index + Strings[language].units.length
			return unit === adjustedI || inUse.includes(adjustedI) ? false : list.push(index)
		})
		setDeletableUnits(list);
	}, [userUnits, unit]);
    // android hide bottom buttons if keyboard is showing
    const [keyboardOut, setKeyboardOut] = React.useState(false);
    Platform.OS === 'android' &&  React.useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    const _keyboardDidShow = () => {setKeyboardOut(true)};
    const _keyboardDidHide = () => { setKeyboardOut(false)};
	const modalCancelbtn = AllButtons.cancel2;
	modalCancelbtn._title = Strings[language].buttons.cancel;
	modalCancelbtn.onPress = () => {
		setmodalVisible(false);
		setButtonsVertical(false);
		setModalButtons([]);
		setModalInputs([]);
		setSingUnit('');
		setPluUnit('');
	};
	const modalDeletbtn = AllButtons.delete;
	modalDeletbtn._title = Strings[language].buttons.delete;
	modalDeletbtn.onPress = () => {
		setModalButtons([]);
		setModalMessage(Strings[language].alerts.deleting)
		Reminders.cancelAll();
		let keys = projects.map(project => {
			return project.key
		})
		Storage.deleteAllProj(keys, language);
		setmodalVisible(false);
	};
	const modalDonebtn = AllButtons.done;
	modalDonebtn._title = Strings[language].buttons.done;
	const savebtn = AllButtons.save;
	savebtn._title = Strings[language].buttons.save;
	savebtn.onPress = async () => {
		// settings.darkmode = darkMode;

		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.saving);
		setModalButtons([]);
		setModalPickers([]);
		setModalInputs([]);
		// Reschedule reminders on save settings if language has changed.
		if (settings.language !== language && projects.length) {
			for (i = 0; 1 < projects.length; i++) {
				await Reminders.cancelAll();
				let remindersObj = await Reminders.scheduleNotification(
					projects[i].obj._title, 
					language, 
					projects[i].obj._frequency === 0 ? freq : projects[i].obj._frequency, 
					projects[i].obj._time === 'default' ? time : projects[i].obj._time, 
					projects[i].obj._dueDate)
				let updateObj = {
					reminders: remindersObj
				}
				Storage.updateProj(projects[i].key, updateObj, language);
			}
		}
		// Reschedule reminders on save if language hasn't changed, but time or frequency have.
		else if (projects.length && (settings.notifications.freq !== freq || settings.notifications.time !== time)) {
			let defaultProj = projects.filter(proj => {
				return proj.obj._frequency === 0 || proj.obj._time === 'default'
			})
			for (i = 0; 1 < defaultProj.length; i++) {
				await Reminders.cancelNotification([defaultProj[i].obj._reminders.dueTom]);
				await Reminders.cancelNotification(defaultProj[i].obj._reminders.regular);
				let remindersObj = await Reminders.scheduleNotification(
					defaultProj[i].obj._title, 
					language, 
					defaultProj[i].obj._frequency === 0 ? freq : defaultProj[i].obj._frequency, 
					defaultProj[i].obj._time === 'default' ? time : defaultProj[i].obj._time, 
					defaultProj[i].obj._dueDate)
				let updateObj = {
					reminders: remindersObj
				}
				Storage.updateProj(defaultProj[i].key, updateObj, language);
			}
		}
		settings.language = language;
		settings.dateFormat = dateFormat;
		settings.notifications = {
			freq: freq,
			time: time
		};
		settings.unit = unit;
		settings.userUnits = userUnits;
		Storage.saveSettings(settings, language);
		setmodalVisible(false);
        navigation.navigate(Strings.routes.home);
	};
	const cancelbtn = AllButtons.cancel;
	cancelbtn._title = Strings[language].buttons.cancel;
	cancelbtn.onPress = () => {
		navigation.navigate(Strings.routes.home); 
	};
	const dateFormatBtns = Strings.dateFormats.map((string) => {
		return ({_title: string, onPress: () => {
			setmodalVisible(false);
			setModalButtons([]);
			setModalPickers([]);
			setModalInputs([]);
			setDateFormat(string);
		}})
	});
	const languageBtns = Strings.languages.map((string) => {
		return ({_title: string, onPress: () => {
			setmodalVisible(false);
			setModalButtons([]);
			setModalPickers([]);
			setModalInputs([]);
			setLanguage(string);
		}})
	});
	const freqWords = Strings[language].frequencyWords.slice(1, Strings[language].frequencyWords.length)
	const freqBtns = freqWords.map((string, index) => {
		return ({_title: string, onPress: () => {
			setFreq(index + 1);
			setmodalVisible(false);
			setModalButtons([]);
			setModalPickers([]);
			setModalInputs([]);
		}})
	});
	const unitBtns = Strings[language].units.concat(userUnits.s).map((string, index) => {
		return ({_title: string, onPress: () => {
			setmodalVisible(false);
			setModalButtons([]);
			setModalPickers([]);
			setModalInputs([]);
			setUnit(index);
		}})
	});
	const editUnitBtns = userUnits.s.map((string, index) => {
		return ({_title: string, onPress: () => {
			modalDonebtn.onPress = () => {
				setmodalVisible(false);
				setModalButtons([]);
				setModalPickers([]);
				setModalInputs([]);
				setDonePush(true);
			};
			setEditIndex(index);
			setSingUnit(userUnits.s[index]);
			setPluUnit(userUnits.p[index]);
			setModalMessage(Strings[language].alerts.settings.addUnit);
			setModalPickers([]);
			setModalButtons([modalCancelbtn]);
			setModalInputs([
				{
					label: Strings[settings.language].labels.sUnit,
					placeholder: Strings[language].units[1],
					default: userUnits.s[index],
					onChange: text => {
						let trimmed = text.trim();
						let exists = (txt, num) => {
							let ind = Strings[language].units.concat(userUnits.s).findIndex(val => {
								return val === txt
							});
							if (ind === -1 || ind === num) {
								return false
							}
							else {
								return true
							}
						}
						if (trimmed.length === 0) {
							setModalButtons([modalCancelbtn]);
							setSingUnit('');
						}
						else if (Strings.regex.units.test(trimmed) ) {
							setModalMessage(Strings[language].alerts.settings.addUnit + '\n' + Strings[language].alerts.settings.unitAllow);
							setModalButtons([modalCancelbtn]);
							setSingUnit('');
						}
						else if (exists(trimmed, index)) {
							setModalMessage(Strings[language].alerts.settings.addUnit + '\n' + Strings.capitalize(Strings[language].alerts.settings.unitExists.replace(/\*unit\*/g, trimmed)));
							setModalButtons([modalCancelbtn]);
							setSingUnit('');
						}
						else {
							setSingUnit(trimmed)
						}
					}
				},
				{
					label: Strings[language].labels.pUnit,
					placeholder: Strings[language].unitPlurals[1],
					default: userUnits.p[index],
					onChange: text => {
						let trimmed = text.trim();
						if (trimmed.length === 0) {
							setModalButtons([modalCancelbtn]);
							setPluUnit('');
						}
						else if (Strings.regex.units.test(trimmed) ) {
							setModalMessage(Strings[language].alerts.settings.addUnit + '\n' + Strings[language].alerts.settings.unitAllow);
							setModalButtons([modalCancelbtn]);
							setPluUnit('');
						}
						else {
							setPluUnit(trimmed)
						}
					}
				},
			])
		}})
	});
	const delUnitBtns = deletableUnits.map(num => {
		return ({_title: userUnits.s[num], onPress: () => {
			setmodalVisible(false)
			setModalButtons([]);
			setModalPickers([]);
			setModalInputs([]);
			let updateArr = projects.filter(proj => {
				return proj.obj._unitName === Strings[language].units.length + num;
			})
			for (i = 0; i < updateArr.length; i++) {
				let newObj = {obj: {_unitName: updateArr[i].obj._unitName - 1}}
				Storage.updateProj(updateArr[i].key, newObj, language);
			}
			let sUnits = userUnits.s.slice();
			let pUnits = userUnits.p.slice();
			sUnits.splice(num, 1);
			pUnits.splice(num, 1);
			setuserUnits({s: sUnits, p: pUnits});
		}})
	});
	const unitDeleteBtn = AllButtons.delete2;
	unitDeleteBtn._title = Strings[language].buttons.deleteU;
	unitDeleteBtn.onPress = () => {
		setButtonsVertical(false);
		setModalMessage(Strings[language].alerts.settings.delUnit)
		setModalPickers([delUnitBtns]);
		setModalButtons([modalCancelbtn]);
	};
	const unitEditBtn = AllButtons.edit;
	unitEditBtn._title = Strings[language].buttons.editU;
	unitEditBtn.onPress = () => {
		setButtonsVertical(false);
		setModalMessage(Strings[language].alerts.settings.editUnit)
		setModalPickers([editUnitBtns]);
		setModalButtons([modalCancelbtn]);
		
	};
	const unitAddBtn = AllButtons.create;
	unitAddBtn._title = Strings[language].buttons.createU;
	unitAddBtn.onPress = () => {
		setButtonsVertical(false);
		modalDonebtn.onPress = () => {
			setmodalVisible(false);
			setModalButtons([]);
			setModalPickers([]);
			setModalInputs([]);
			setDonePush(true);
		};
		setModalMessage(Strings[language].alerts.settings.addUnit);
		setModalPickers([]);
		setModalButtons([modalCancelbtn]);
		setModalInputs([
			{
				label: Strings[language].labels.sUnit,
				placeholder: Strings[language].units[1],
				onChange: text => {
					let trimmed = text.trim();
					if (trimmed.length === 0) {
						setModalButtons([modalCancelbtn]);
						setSingUnit('');
					}
					else if (Strings.regex.units.test(trimmed) ) {
						setModalMessage(Strings[language].alerts.settings.addUnit + '\n' + Strings[language].alerts.settings.unitAllow);
						setModalButtons([modalCancelbtn]);
						setSingUnit('');
					}
					else if (userUnits.s.includes(trimmed)) {
						setModalMessage(Strings[language].alerts.settings.addUnit + '\n' + Strings.capitalize(Strings[language].alerts.settings.unitExists.replace(/\*unit\*/g, trimmed)));
						setModalButtons([modalCancelbtn]);
						setSingUnit('');
					}
					else {
						setSingUnit(trimmed)
					}
				}
			},
			{
				label: Strings[language].labels.pUnit,
				placeholder: Strings[language].unitPlurals[1],
				onChange: text => {
					let trimmed = text.trim();
					if (trimmed.length === 0) {
						setModalButtons([modalCancelbtn]);
						setPluUnit('');
					}
					else if (Strings.regex.units.test(trimmed) ) {
						setModalMessage(Strings[language].alerts.settings.addUnit + '\n' + Strings[language].alerts.settings.unitAllow);
						setModalButtons([modalCancelbtn]);
						setPluUnit('');
					}
					else {
						setPluUnit(trimmed)
					}
				}
			},
		])
	};
	// buttons.darkMode._title = Strings[language].buttons.allSettings.darkMode;
	// buttons.darkMode.onPress = () => {
	// 	setDarkMode(!darkMode);
	// }
	buttons.language._title = Strings[language].buttons.allSettings.language;
	buttons.language.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.language);
		setModalPickers([languageBtns]);
		setModalButtons([modalCancelbtn]);
		setModalInputs([]);
	};
	buttons.dateFormat._title = Strings[language].buttons.allSettings.dateFormat + dateFormat;
	buttons.dateFormat.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.dateFormat);
		setModalPickers([dateFormatBtns]);
		setModalButtons([modalCancelbtn]);
		setModalInputs([]);
	};
	buttons.freq._title = Strings[language].buttons.allSettings.freq + Strings[language].frequencyWords[freq];
	buttons.freq.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.notify);
		setModalPickers([freqBtns]);
		setModalButtons([modalCancelbtn]);
		setModalInputs([]);
	};
	buttons.time._title = Strings[language].buttons.allSettings.time + time;
	buttons.time.onPress = () => {
		setShowDate(true);
	};
	buttons.defaultUnit._title = Strings[language].buttons.allSettings.unit + Strings[language].units.concat(userUnits.s)[unit];
	buttons.defaultUnit.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.defUnit);
		setModalPickers([unitBtns]);
		setModalButtons([modalCancelbtn]);
		setModalInputs([]);
	};
	buttons.editUnit._title = Strings[language].buttons.allSettings.editUnit;
	buttons.editUnit.onPress = () => {
		setmodalVisible(true);
		setModalMessage(Strings[language].alerts.settings.chooseEditUnit);
		setModalPickers([]);
		setModalInputs([]);
		setButtonsVertical(true);
		let buttons = [unitAddBtn, modalCancelbtn];
		userUnits.s.length && buttons.unshift(unitEditBtn);
		deletableUnits.length && buttons.unshift(unitDeleteBtn);
		setModalButtons(buttons);
	};
	buttons.deleteAll._title = Strings[language].buttons.allSettings.deleteAll;
	buttons.deleteAll.onPress = () => {
		setmodalVisible(true);
		setModalPickers([]);
		setModalInputs([]);
		if (projects.length) {
			setModalMessage(Strings[language].alerts.settings.deleteAll);
			setModalButtons([modalCancelbtn, modalDeletbtn]);
		}
		else {
			setModalMessage(Strings[language].alerts.settings.noProj);
			setModalButtons([modalCancelbtn]);
		}
	};
	buttons.feedback._title = Strings[language].buttons.allSettings.feedback;
	buttons.feedback.onPress = async () => {
		let supported = await Linking.canOpenURL(Strings.mailto);
		if (supported) {
			await Linking.openURL(Strings.mailto)
		}
		else {
			Notify(language, Strings.mailto);
		}
	};
	buttons.site._title = Strings[language].buttons.allSettings.site;
	buttons.site.onPress = async () => {
		let supported = await Linking.canOpenURL(Strings.website);
		if (supported) {
			await Linking.openURL(Strings.website)
		}
		else {
			Notify(language, Strings.website);
		}
	};
	const buttonsArr = [
		// buttons.darkMode,
		buttons.language,
        buttons.dateFormat,
		buttons.freq,
		buttons.time,
		buttons.defaultUnit,
		buttons.editUnit,
        buttons.deleteAll,
		buttons.feedback,
		buttons.site,
	]
	return (
		<SafeAreaView style={[styles.container, {backgroundColor: darkMode ? Colors.darkmode.background : Colors.mainbackground} ]} contentContainerStyle={styles.contentContainer}>
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


				{/* { showDate && <DateTimePicker 
					value={Moment(time, Strings.timeFormat).toDate()}
					mode={'time'}
                    display={Platform.OS === "ios" ? 'spinner' : 'default'}
					onChange={(event, date) => {
						if (Platform.OS === 'android') {
							setShowDate(false)
						}
						if (date !== undefined) {
							setTime(Moment(date).format(Strings.timeFormat));
						}
					}}
				/>} */}
				{Platform.OS === 'ios' && showDate && <Modal>
					<DateTimePicker 
						value={Moment(time, Strings.timeFormat).toDate()}
						mode={'time'}
						display={Platform.OS === "ios" ? 'spinner' : 'default'}
						onChange={(event, date) => {
							if (Platform.OS === 'android') {
								setShowDate(false)
							}
							if (date !== undefined) {
								setTime(Moment(date).format(Strings.timeFormat));
							}
						}}
					/>
					<View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
					<TouchableHighlight 
						key={'accept'} 
						style={styles.calButton}
						onPress={() => {
							setShowDate(false);
						}}
					>
						<Text style={styles.calButtonText}>{Strings[settings.language].buttons.okay}</Text>
					</TouchableHighlight>
				</View>
				</Modal>}
				{/* {Platform.OS === 'ios' && showDate && <View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
					<TouchableHighlight 
						key={'accept'} 
						style={styles.calButton}
						onPress={() => {
							setShowDate(false);
						}}
					>
						<Text style={styles.calButtonText}>{Strings[settings.language].buttons.okay}</Text>
					</TouchableHighlight>
				</View>} */}
			</View>
			<CustModal 
				visible={modalVisible} 
				message={modalMessage} 
				pickers={modalPickers}
				inputs={modalInputs}
				buttons={modalButtons} 
				vertical={buttonsVertical}
				darkmode={darkMode}
			/>
            {Platform.OS === 'ios' && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
            {Platform.OS === 'android' && !keyboardOut && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  	container: {
		flex: 1,
  	},
	contentContainer: {
		paddingTop: 50,
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 20,
		borderRadius: 20,
		padding: 30,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
    calButton: {
        backgroundColor: Colors.create,
        borderRadius: 20,
        padding: 10,
        elevation: 0
    },
    calButtonText: {
        color: Colors.navButtonText,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
    },
});