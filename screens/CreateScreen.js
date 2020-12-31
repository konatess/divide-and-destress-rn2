import * as React from 'react';
import { 
    Keyboard, 
    Platform, 
    SafeAreaView,
    StyleSheet, 
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
import {containers, rows, buttonStyles, inputStyles, textStyles, } from "../constants/Styles";
import AllButtons from '../constants/ButtonClass';
import Storage from '../storage/Async';
import Moment from 'moment';
import Reminders from '../constants/Reminders';

export default function CreateScreen({ route, navigation}) {
    const { knowntitles } = route.params
    const { settings } = route.params
    // Unit picker
    const [unitValue, setUnitValue] = React.useState(settings.unit);
    // modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
    const [modalButtons, setModalButtons] = React.useState([]);
	const [modalPickers, setModalPickers] = React.useState([]);
    // date picker
    const [showDate, setShowDate] = React.useState(false);
    const [dateMode, setDateMode] = React.useState('date');
    const [dateValue, setDateValue] = React.useState(Moment().add(7, 'day').toDate());
    // time picker
    const [timeValue, setTimeValue] = React.useState('default');
    // Frequency picker
    const [freqValue, setFreqValue] = React.useState(0);
    // the following state values are purely for retrieval
    // title value
    const [titleValue, setTitleValue] = React.useState("");
    // start and end values
    const [startValue, setStartValue] = React.useState("1");
    const [endValue, setEndValue] = React.useState("");
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
    // project to save
    const newProj = new Project();
    const saveProj = async () => {
        setModalPickers([]);
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
        else if (knowntitles.some(item => {return item === titleValue})) {
            setModalMessage(Strings[settings.language].alerts.title.exists);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (startValue === '' || isNaN(parseInt(startValue))) {
            if (isNaN(parseInt(startValue))) {
                setStartValue("0");
            }
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.first.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (endValue === '' || isNaN(parseInt(endValue))) {
            if (isNaN(parseInt(endValue))) {
                setEndValue("0");
            }
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.last.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (parseInt(startValue) >= parseInt(endValue)) {
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.firstSmaller.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else {
            let remindersObj = await Reminders.scheduleNotification( 
                titleValue, 
                settings.language,
                (freqValue === 0 ? settings.notifications.freq : freqValue), 
                (timeValue === 'default' ? settings.notifications.time : timeValue),
                dateValue
            )
            console.log(remindersObj);
            newProj.title = titleValue.trim();
            newProj.startDate = Moment().toDate();
            newProj.dueDate = dateValue;
            newProj.startUnit = parseInt(startValue);
            newProj.endUnit = parseInt(endValue);
            newProj.currentUnit = parseInt(startValue);
            newProj.unitName = unitValue;
            newProj.freq = freqValue;
            newProj.time = timeValue;
            newProj.reminders = remindersObj;
            Storage.createProj(newProj, settings.language);
            navigation.navigate(Strings.routes.home)
        }
    };
    const allSUnits = Strings[settings.language].units.concat(settings.userUnits.s);
    const allPUnits = Strings[settings.language].unitPlurals.concat(settings.userUnits.p);
    const savebtn = AllButtons.save;
    savebtn._title = Strings[settings.language].buttons.save
    const cancelbtn = AllButtons.cancel;
    cancelbtn._title = Strings[settings.language].buttons.cancel;
    const modalokaybtn = AllButtons.okay;
    modalokaybtn._title = Strings[settings.language].buttons.okay;
    const modaldonebtn = AllButtons.done;
    modaldonebtn._title = Strings[settings.language].buttons.done;
    const modalcancelbtn = AllButtons.cancel2;
    modalcancelbtn._title = Strings[settings.language].buttons.cancel;
    savebtn.onPress = () => saveProj();
	cancelbtn.onPress = () => navigation.navigate(Strings.routes.home);
    modalokaybtn.onPress = () => setmodalVisible(false);
    modalcancelbtn.onPress = () => setmodalVisible(false);
    // modal picker buttons
    const unitBtns = allPUnits.map((string, index) => {
		return ({_title: string, onPress: () => {
            setUnitValue(index);
			setmodalVisible(false);
		}})
	});
    const freqBtns = Strings[settings.language].frequencyWords.map((string, index) => {
		return ({_title: string, onPress: () => {
			setFreqValue(index);
            setmodalVisible(false);
            setModalPickers([]);
		}})
	});
    const getTextColor = () => {
        return settings.darkmode ? Colors.darkmode.text : Colors.maintext
    };
    
    return (
        <SafeAreaView style={[containers.safeArea, {backgroundColor: settings.darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
            <CustModal 
                visible={modalVisible} 
                message={modalMessage} 
				pickers={modalPickers}
				inputs={[]}
                buttons={modalButtons} 
                darkmode={settings.darkmode}
            />
            <View style={containers.projArea}>
                <Text style={[textStyles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.title}</Text>
                <TextInput
                    style={[inputStyles.inputField, {marginBottom: 10}, {color: getTextColor()}]}
                    placeholder={Strings[settings.language].placeholder.title}
                    autoCapitalize={'words'}
                    onChangeText={text => setTitleValue(text)}
                    onFocus={() => {setShowDate(false);}}
                />
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.startUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        style={[inputStyles.inputField, {color: getTextColor()}]}
                        defaultValue={'1'}
                        placeholder={'1'}
                        keyboardType={'number-pad'}
                        onChangeText={text => setStartValue(text)}
                        onFocus={() => {setShowDate(false);}}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.endUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        style={[inputStyles.inputField, {color: getTextColor()}]}
                        placeholder={'42'}
                        keyboardType={'number-pad'}
                        onChangeText={text => setEndValue(text)}
                        onFocus={() => {setShowDate(false);}}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.dueDate}</Text>
                    <TextInput 
                        style={[inputStyles.inputField, {color: getTextColor()}]} 
                        value={Moment(dateValue).format(settings.dateFormat)}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setShowDate(true);
                            setDateMode('date');
                        }}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, { textAlignVertical: 'center'}, {color: getTextColor()}]}>{Strings[settings.language].labels.unitName}</Text>
                    <TextInput
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
                    <Text style={[textStyles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.notification}</Text>
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
                    <Text style={[textStyles.labelText, {paddingLeft: 10}, {color: getTextColor()}]}>{Strings[settings.language].labels.time}</Text>
                    <TextInput
                        style={[inputStyles.inputField, {color: getTextColor()}]}
                        value={timeValue === 'default' ? Strings[settings.language].frequencyWords[0] : timeValue}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setShowDate(true);
                            setDateMode('time');
                        }}
                    />
                </View>
                <View style={rows.row1}>
                    <Text style={[textStyles.labelText, {paddingLeft: 10}, {color: getTextColor()}]}>{Strings[settings.language].labels.frequency}</Text>
                    <TextInput
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
                { showDate && <DateTimePicker 
                    value={dateValue}
                    mode={dateMode}
                    display={Platform.OS === "ios" ? 'spinner' : 'default'}
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
                {Platform.OS === 'ios' && showDate && <View style={[rows.row1, {justifyContent: 'center'}]}>
                    <TouchableHighlight 
                        key={'cancel'} 
                        style={[buttonStyles.basicButton, {backgroundColor: Colors.cancel}]}
                        onPress={() => {
                            setShowDate(false);
                            dateMode === 'time' && setTimeValue('default');
                            dateMode === 'date' && setDateValue(Moment().add(7, 'day').toDate());
                        }}
                    >
                        <Text style={textStyles.buttonText}>{Strings[settings.language].buttons.cancel}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        key={'accept'} 
                        style={[buttonStyles.basicButton, {backgroundColor: Colors.create, marginLeft: 10}]}
                        onPress={() => {
                            setShowDate(false);
                        }}
                    >
                        <Text style={textStyles.buttonText}>{Strings[settings.language].buttons.okay}</Text>
                    </TouchableHighlight>
                </View>}
            </View>
            {Platform.OS === 'ios' && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
            {Platform.OS === 'android' && !keyboardOut && <ButtonBar buttons={[ cancelbtn, savebtn ]} />}
        </SafeAreaView>
    )
};