import * as React from 'react';
import { 
    Keyboard, 
    Platform, 
    SafeAreaView,
    Text, 
    TextInput, 
    TouchableHighlight, 
    View 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar';
import CustModal from '../components/Modal';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import {containers, rows, buttonStyles, inputStyles, textStyles} from "../constants/Styles";
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';
import Moment from 'moment';
import Reminders from '../constants/Reminders';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function EditScreen({ route, navigation }) {
    const { knowntitles } = route.params;
    const { settings } = route.params;
    const { project } = route.params;
    const { key } = route.params;
    const cleanedTitles = knowntitles.filter(title => {return title !== project._title});
    // Unit picker
    const [unitValue, setUnitValue] = React.useState(project._unitName);
    // modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
    const [modalButtons, setModalButtons] = React.useState([]);
	const [modalPickers, setModalPickers] = React.useState([]);
    // date/time picker
    const [showDate, setShowDate] = React.useState(false);
    const [dateMode, setDateMode] = React.useState('date');
    const generateTempDate = () => {
        let time = project._time === 'default' ? settings.notifications.time : project._time;
        let timeM = Moment(time, Strings.timeFormat);
        let temp = Moment(project._dueDate).hour(timeM.hour()).minute(timeM.minute());
        return temp.toDate();
    }
    const [dateValue, setDateValue] = React.useState(generateTempDate());
    const [tempDate, setTempDate] = React.useState(generateTempDate());
    const [timeValue, setTimeValue] = React.useState(project._time);
    // Frequency picker
    const [freqValue, setFreqValue] = React.useState(project._frequency);
    // title value
    const [titleValue, setTitleValue] = React.useState(project._title);
    // start and end units
    const [startValue, setStartValue] = React.useState(project._startUnit.toString());
    const [currentValue, setCurrentValue] = React.useState(project._currentUnit.toString());
    const [endValue, setEndValue] = React.useState(project._endUnit.toString());
    const allSUnits = Strings[settings.language].units.concat(settings.userUnits.s);
    const allPUnits = Strings[settings.language].unitPlurals.concat(settings.userUnits.p);
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
    // project to save
    const newProj = new Project();
    const updateProj = async () => {
        if (titleValue.trim() === "") {
            setModalMessage(Strings[settings.language].alerts.title.blank);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (Strings.regex.titles.test(titleValue)) {
            setModalMessage(Strings[settings.language].alerts.charTitle);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (cleanedTitles.some(item => {return item === titleValue})) {
            setModalMessage(Strings[settings.language].alerts.title.exists);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (startValue === '' || isNaN(parseInt(startValue))) {
            if (isNaN(parseInt(startValue))) {
                setStartValue("");
            }
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.first.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (endValue === '' || isNaN(parseInt(endValue))) {
            if (isNaN(parseInt(endValue))) {
                setEndValue("");
            }
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.last.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (currentValue === '' || isNaN(parseInt(currentValue))) {
            if (isNaN(parseInt(currentValue))) {
                setCurrentValue("");
            }
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.current.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else {
            let start = parseInt(startValue);
            let end = parseInt(endValue);
            let current = parseInt(currentValue);
            if (start >= end) {
                setModalMessage(Strings.capitalize(Strings[settings.language].alerts.firstSmaller.replace(/\*unit\*/g, allSUnits[unitValue])));
                setModalButtons([modalokaybtn]);
                setmodalVisible(true);
            }
            else if (current < start-1) {
                setModalMessage(Strings[settings.language].alerts.currentSmall.replace(/\*unit\*/g, allSUnits[unitValue]));
                setModalButtons([modalokaybtn]);
                setmodalVisible(true);
            }
            else if (current > end) {
                setModalMessage(Strings.capitalize(Strings[settings.language].alerts.currentBig.replace(/\*unit\*/g, allSUnits[unitValue])));
                setModalButtons([modalokaybtn]);
                setmodalVisible(true);
            }
            else {
                let remindAllowed = await Reminders.askPermissions();
                let remindersObj = {
                    dueTom: "",
                    regular: [],
                }
                if (remindAllowed) {
                    if (current === end) {
                        await Reminders.cancelNotification([project._reminders.dueTom]);
                        await Reminders.cancelNotification(project._reminders.regular);
                        newProj.reminders = {
                            dueTom: "",
                            regular: [],
                        }
                    }
                    else if (project._frequency !== freqValue || project._time !== timeValue || project._dueDate !== dateValue) {
                        await Reminders.cancelNotification([project._reminders.dueTom]);
                        await Reminders.cancelNotification(project._reminders.regular);
                        remindersObj = await Reminders.scheduleNotification(
                            titleValue, 
                            settings.language,
                            (freqValue === 0 ? settings.notifications.freq : freqValue), 
                            (timeValue === 'default' ? settings.notifications.time : timeValue),
                            dateValue)
                        newProj.reminders = remindersObj;
                    }
                }
                newProj.title = titleValue.trim();
                newProj.dueDate = dateValue;
                newProj.startUnit = start;
                newProj.endUnit = end;
                newProj.currentUnit = current;
                newProj.unitName = unitValue;
                newProj.freq = freqValue;
                newProj.time = timeValue;
                Storage.updateProj(key, newProj, settings.language);
                navigation.navigate(Strings.routes.home)
            }
        }
    };
    const savebtn = AllButtons.save;
    savebtn._title = Strings[settings.language].buttons.save;
    const cancelbtn = AllButtons.cancel;
    cancelbtn._title = Strings[settings.language].buttons.cancel;
    const modalokaybtn = AllButtons.okay;
    modalokaybtn._title = Strings[settings.language].buttons.okay;
    const modaldonebtn = AllButtons.done;
    modaldonebtn._title = Strings[settings.language].buttons.done;
    const modalcancelbtn = AllButtons.cancel2;
    modalcancelbtn._title = Strings[settings.language].buttons.cancel;
    const modalTimeOkayBtn = AllButtons.okaySave;
	modalTimeOkayBtn._title = Strings[settings.language].buttons.okay;
    savebtn.onPress = () => updateProj();
    cancelbtn.onPress = () => navigation.goBack();
    modalokaybtn.onPress = () => setmodalVisible(false);
    modalcancelbtn.onPress = () => {
        setmodalVisible(false);
        setModalButtons([]);
        setModalPickers([]);
        setShowDate(false);
        setTempDate(dateValue);
    }
	modalTimeOkayBtn.onPress = () => {
		dateMode === 'time' ? setTimeValue(Moment(tempDate).format(Strings.timeFormat)) : setDateValue(tempDate);
		setShowDate(false);
		setmodalVisible(false);
	};
    // modal picker buttons
    const unitBtns = allPUnits.map((string, index) => {
		return ({_title: string, onPress: () => {
            setUnitValue(index);
			setmodalVisible(false);
            setModalButtons([]);
            setModalPickers([]);
		}})
	});
    const freqBtns = Strings[settings.language].frequencyWords.map((string, index) => {
		return ({_title: string, onPress: () => {
			setFreqValue(index);
			setmodalVisible(false);
            setModalButtons([]);
            setModalPickers([]);
		}})
    });
    const getTextColor = () => {
        return settings.darkmode ? Colors.darkmode.text : Colors.maintext
    };

    return (
        <SafeAreaView style={containers.safeArea}>
            <BannerAd
				unitId={TestIds.BANNER}
				sizes={[BannerAdSize.FULL_BANNER]}
				requestOptions={{
					requestNonPersonalizedAdsOnly: true,
				}}
			/>
            <View style={containers.projArea}>
                <Text style={textStyles.labelText}>{Strings[settings.language].labels.title}</Text>
                <TextInput
                    accessibilityLabel={Strings[settings.language].labels.title}
                    style={[inputStyles.inputField, {marginBottom: 10}]}
                    placeholder={Strings[settings.language].placeholder.title}
                    value={titleValue}
                    autoCapitalize={'words'}
                    onChangeText={text => setTitleValue(text)}
                    onFocus={() => {setShowDate(false);}}
                />
                <View style={rows.row1}>
                    <Text style={textStyles.labelText}>{Strings.capitalize(Strings[settings.language].labels.currentunit.replace(/\*unit\*/g, allSUnits[unitValue]))}</Text>
                    <TextInput
                        accessibilityLabel={Strings[settings.language].labels.currentunit.replace(/\*unit\*/g, allSUnits[unitValue])}
                        style={inputStyles.inputField}
                        placeholder={'42'}
                        value={currentValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => {
                            if (text.length === 0 || !Strings.regex.numbers.test(text)) {
                                setCurrentValue(text)
                            }
                        }}
                        onFocus={() => {setShowDate(false);}}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.startUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        accessibilityLabel={Strings[settings.language].labels.startUnit.replace(/\*unit\*/g, allSUnits[unitValue])}
                        style={inputStyles.inputField}
                        placeholder={'1'}
                        value={startValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => {
                            if (text.length === 0 || !Strings.regex.numbers.test(text)) {
                                setStartValue(text)
                            }
                        }}
                        onFocus={() => {setShowDate(false);}}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.endUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        accessibilityLabel={Strings[settings.language].labels.endUnit.replace(/\*unit\*/g, allSUnits[unitValue])}
                        style={inputStyles.inputField}
                        placeholder={'42'}
                        value={endValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => {
                            if (text.length === 0 || !Strings.regex.numbers.test(text)) {
                                setEndValue(text)
                            }
                        }}
                        onFocus={() => {setShowDate(false);}}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {flexWrap: 'wrap'}]}>{Strings[settings.language].labels.dueDate}</Text>
                    <TextInput 
                        accessibilityLabel={Strings[settings.language].labels.dueDate}
                        style={inputStyles.inputField} 
                        value={Moment(dateValue).format(settings.dateFormat)}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setShowDate(true);
                            setDateMode('date');
                            if (Platform.OS === 'ios') {
                                setmodalVisible(true);
                                setModalButtons([modalcancelbtn, modalTimeOkayBtn]);
                                setModalPickers([]);
                                setModalMessage('');
                            }
                        }}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, { textAlignVertical: 'center'}, {color: getTextColor()}]}>{Strings[settings.language].labels.unitName}</Text>
                    <TextInput
                        accessibilityLabel={Strings[settings.language].labels.unitName}
                        style={[inputStyles.inputField, {color: getTextColor()}]}
                        value={allPUnits[unitValue]}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setShowDate(false);
                            setModalButtons([modalcancelbtn]);
                            setModalPickers([unitBtns]);
                            setModalMessage(Strings[settings.language].alerts.create_edit.unit);
                            setmodalVisible(true);
                        }}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={textStyles.labelText}>{Strings[settings.language].labels.notification}</Text>
                    <TouchableHighlight
                        style={[buttonStyles.basicButton, {marginLeft: 5, backgroundColor: Colors.cancel}]}
                        onPress={() => {
                            setTimeValue('default');
                            setFreqValue(0);
                            setShowDate(false);
                        }}
                        >
                        <Text style={textStyles.buttonText}>
                            {Strings[settings.language].buttons.setToDefault}
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {paddingLeft: 10}]}>{Strings[settings.language].labels.time}</Text>
                    <TextInput
                        accessibilityLabel={Strings[settings.language].labels.time}
                        style={inputStyles.inputField}
                        value={timeValue === 'default' ? Strings[settings.language].frequencyWords[0] : timeValue}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setShowDate(true);
                            setDateMode('time');
                            if (Platform.OS === 'ios') {
                                setmodalVisible(true);
                                setModalButtons([modalcancelbtn, modalTimeOkayBtn]);
                                setModalPickers([]);
                                setModalMessage('');
                            }
                        }}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {paddingLeft: 10}, {color: getTextColor()}]}>{Strings[settings.language].labels.frequency}</Text>
                    <TextInput
                        accessibilityLabel={Strings[settings.language].labels.frequency}
                        style={[inputStyles.inputField, {color: getTextColor()}]}
                        value={Strings[settings.language].frequencyWords[freqValue]}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setShowDate(false);
                            setModalButtons([modalcancelbtn]);
                            setModalPickers([freqBtns]);
                            setModalMessage(Strings[settings.language].alerts.create_edit.freq);
                            setmodalVisible(true);
                        }}
                    />
                </View>
                { Platform.OS ==='android' && showDate && <DateTimePicker 
                    accessibilityLabel={dateMode === 'date' ? Strings[settings.language].labels.dueDate : Strings[settings.language].labels.time}
                    value={dateValue}
                    mode={dateMode}
                    minimumDate={Moment().add(2, 'day').toDate()}
                    onChange={(event, date) => {
                        if (Platform.OS === "android") {
                            setShowDate(false);
                        }
                        if (dateMode === 'date' && date !== undefined) {
                            setDateValue(date); 
                        }
                        else if (dateMode === 'time' && date !== undefined) {
                            setTimeValue(Moment(date).format(Strings.timeFormat));
                            setDateValue(date);
                        }
                    }}
                />}
            </View>
            <CustModal 
                visible={modalVisible} 
                message={modalMessage} 
				pickers={modalPickers}
				inputs={[]}
				showDate={showDate}
                datemode={dateMode}
                dateString={dateMode === 'date' ? Strings[settings.language].labels.dueDate : Strings[settings.language].labels.time}
                dateValue={tempDate}
                minDate={Moment().toDate()}
				dateOnChange={(value) => setTempDate(value)}
                buttons={modalButtons} 
                darkmode={settings.darkmode}
            />
            {Platform.OS === 'ios' && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
            {Platform.OS === 'android' && !keyboardOut && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
        </SafeAreaView>
    )
};
