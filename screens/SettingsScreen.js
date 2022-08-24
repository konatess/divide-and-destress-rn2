import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Keyboard, StatusBar, Text, View, Linking, SafeAreaView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import AllButtons from '../constants/ButtonClass';
import ButtonBar from '../components/ButtonBar';
import CustModal from '../components/Modal';
import Notify from '../components/Notify';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import {containers, rows, buttonStyles, textStyles, iconSizes} from "../constants/Styles";
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
	const [dateMode, setDateMode] = React.useState('time');
	const [dateValue, setDateValue] = React.useState(Moment(settings.notifications.time, Strings.timeFormat).toDate());
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
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          setKeyboardOut(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          setKeyboardOut(false);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);
	const modalCancelbtn = AllButtons.cancel2;
	modalCancelbtn._title = Strings[language].buttons.cancel;
	modalCancelbtn.onPress = () => {
		setmodalVisible(false);
		setButtonsVertical(false);
		setModalButtons([]);
		setModalInputs([]);
		setSingUnit('');
		setPluUnit('');
		setDateValue(Moment(time, Strings.timeFormat).toDate());
		setShowDate(false);
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
	const modalTimeOkayBtn = AllButtons.okaySave;
	modalTimeOkayBtn._title = Strings[language].buttons.okay;
	modalTimeOkayBtn.onPress = () => {
		setTime(Moment(dateValue).format(Strings.timeFormat));
		setShowDate(false);
		setmodalVisible(false);
	};
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
            let remindAllowed = await Reminders.askPermissions();
            if (remindAllowed) {
				await Reminders.cancelAll();
				for (let k = 0; k < projects.length; k++) {
					let remindersObj = await Reminders.scheduleNotification(
						projects[k].obj._title, 
						language, 
						projects[k].obj._frequency === 0 ? freq : projects[k].obj._frequency, 
						projects[k].obj._time === 'default' ? time : projects[k].obj._time, 
						projects[k].obj._dueDate)
					let updateObj = {
						obj: {
							_reminders: remindersObj
						}
					}
					await Storage.updateProj(projects[k].key, updateObj, language);
				}
			}
		}
		// Reschedule reminders on save if language hasn't changed, but time or frequency have.
		else if (projects.length && (settings.notifications.freq !== freq || settings.notifications.time !== time)) {
            let remindAllowed = await Reminders.askPermissions();
            let remindersObj = {
                dueTom: "",
                regular: [],
            }
            if (remindAllowed) {
				let defaultProj = projects.filter(proj => {
					return proj.obj._frequency === 0 || proj.obj._time === 'default'
				})
				for (let j = 0; j < defaultProj.length; j++) {
					await Reminders.cancelNotification([defaultProj[j].obj._reminders.dueTom]);
					await Reminders.cancelNotification(defaultProj[j].obj._reminders.regular);
					remindersObj = await Reminders.scheduleNotification(
						defaultProj[j].obj._title, 
						language, 
						defaultProj[j].obj._frequency === 0 ? freq : defaultProj[j].obj._frequency, 
						defaultProj[j].obj._time === 'default' ? time : defaultProj[j].obj._time, 
						defaultProj[j].obj._dueDate)
					let updateObj = {
						reminders: remindersObj
					}
					await Storage.updateProj(defaultProj[j].key, updateObj, language);
				}
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
			for (let i = 0; i < updateArr.length; i++) {
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
		if (Platform.OS === 'ios') {
			setmodalVisible(true);
			setModalMessage('');
			setModalPickers([]);
			setModalButtons([modalCancelbtn, modalTimeOkayBtn]);
			setModalInputs([]);
		}
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
		<SafeAreaView style={[containers.safeArea, {backgroundColor: darkMode ? Colors.darkmode.background : Colors.mainbackground} ]} >
			<StatusBar 
				barStyle={darkMode ? "light-content" : "dark-content"} 
				backgroundColor={darkMode ? Colors.darkmode.background : Colors.mainbackground} 
			/>
			<View style={containers.safeArea}>
				{buttonsArr.map((unit, index) => {
						return (
							<RectButton style={[buttonStyles.settingsBtnArea, (index === buttonsArr.length - 1) && buttonStyles.settingslastBtn]} onPress={unit.onPress} key={unit._title}>
								<View style={rows.rowSetBtn}>
									<View style={buttonStyles.settingsIconArea}>
										<Ionicons name={unit._iconName} size={iconSizes.settingsIconSize} color={Colors.settingsIcons} />
									</View>
									<View>
										<Text style={[textStyles.settingsBtnText, {color: darkMode ? Colors.darkmode.text : Colors.maintext}]}>{unit._title}</Text>
									</View>
								</View>
							</RectButton>
						)
				})}
				{ Platform.OS === 'android' && showDate && <DateTimePicker 
                    accessibilityLabel={dateMode === 'date' ? Strings[settings.language].labels.dueDate : Strings[settings.language].labels.time}
					value={Moment(time, Strings.timeFormat).toDate()}
					mode={dateMode}
					onChange={(event, date) => {
						setShowDate(false);
						if (date !== undefined) {
							setTime(Moment(date).format(Strings.timeFormat));
						}
					}}
				/>}
			</View>
			<CustModal 
				visible={modalVisible} 
				message={modalMessage} 
				pickers={modalPickers}
				inputs={modalInputs}
				showDate={showDate}
				datemode={dateMode}
                dateString={dateMode === 'date' ? Strings[settings.language].labels.dueDate : Strings[settings.language].labels.time}
				dateValue={dateValue}
				minDate={Moment().toDate()}
				dateOnChange={(value) => setDateValue(Moment(value).toDate())}
				buttons={modalButtons} 
				vertical={buttonsVertical}
				darkmode={darkMode}
			/>
            {Platform.OS === 'ios' && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
            {Platform.OS === 'android' && !keyboardOut && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
		</SafeAreaView>
	);
}