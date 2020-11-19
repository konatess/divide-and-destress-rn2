import * as React from 'react';
import { 
    Keyboard, 
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
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';
import Moment from 'moment';
import Reminders from '../constants/Reminders';

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
    const [dateValue, setDateValue] = React.useState(Moment(project._dueDate).toDate())
    const [timeValue, setTimeValue] = React.useState(project._time);
    // Frequency picker
    const [freqValue, setFreqValue] = React.useState(project._frequency);
    // title value
    const [titleValue, setTitleValue] = React.useState(project._title);
    // start and end units
    const [startValue, setStartValue] = React.useState(project._startUnit);
    const [currentValue, setCurrentValue] = React.useState(project._currentUnit);
    const [endValue, setEndValue] = React.useState(project._endUnit);
    const allSUnits = Strings[settings.language].units.concat(settings.userUnits.s);
    const allPUnits = Strings[settings.language].unitPlurals.concat(settings.userUnits.p);
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
        else if (!startValue) {
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.first.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!endValue) {
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.last.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!currentValue) {
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
            else if (current < start) {
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
                if (current === end) {
                    await Reminders.cancelNotification([project._reminders.dueTom]);
                    await Reminders.cancelNotification(project._reminders.regular);
                    newProj.reminders = {
                        dueTom: null,
                        regular: [],
                    }
                }
                else if (project._frequency !== freqValue || project._time !== timeValue || project._dueDate !== dateValue) {
                    await Reminders.cancelNotification([project._reminders.dueTom]);
                    await Reminders.cancelNotification(project._reminders.regular);
                    let remindersObj = await Reminders.scheduleNotification(
                        project._title, 
                        settings.language, 
                        project._frequency === 0 ? freq : project._frequency, 
                        project._time === 'default' ? time : project._time, 
                        project._dueDate)
                    newProj.reminders = remindersObj;
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
    savebtn.onPress = () => updateProj();
    cancelbtn.onPress = () => navigation.navigate(Strings.routes.display);
    modalokaybtn.onPress = () => setmodalVisible(false);
    modalcancelbtn.onPress = () => {
        setmodalVisible(false);
        setModalButtons([]);
        setModalPickers([]);
    }
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
        <SafeAreaView style={styles.container}>
            <CustModal 
                visible={modalVisible} 
                message={modalMessage} 
				pickers={modalPickers}
				inputs={[]}
                buttons={modalButtons} 
                darkmode={settings.darkmode}
            />
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings[settings.language].labels.title}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings[settings.language].placeholder.title}
                    value={titleValue}
                    autoCapitalize={'words'}
                    onChangeText={text => setTitleValue(text)}
                />
                <View style={[styles.row]}>
                    <Text style={styles.labelText}>{Strings.capitalize(Strings[settings.language].labels.currentunit.replace(/\*unit\*/g, allSUnits[unitValue]))}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
                        value={currentValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => setCurrentValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.startUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'1'}
                        value={startValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => setStartValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.endUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
                        value={endValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => setEndValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {flexWrap: 'wrap'}]}>{Strings[settings.language].labels.dueDate}</Text>
                    <TextInput 
                        style={styles.inputField} 
                        value={Moment(dateValue).format(settings.dateFormat)}
                        onFocus={() => {
                            setShowDate(true);
                            setDateMode('date');
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, { textAlignVertical: 'center'}, {color: getTextColor()}]}>{Strings[settings.language].labels.unitName}</Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
                        value={allPUnits[unitValue]}
                        onFocus={() => {
                            Keyboard.dismiss();
                            setModalButtons([modalcancelbtn]);
                            setModalPickers([unitBtns]);
                            setModalMessage(Strings[settings.language].alerts.create_edit.unit);
                            setmodalVisible(true);
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings[settings.language].labels.notification}</Text>
                    <TouchableHighlight
                        style={[styles.defaultsButton, {marginLeft: 5}]}
                        onPress={() => {
                            setTimeValue('default');
                            setFreqValue(0);
                        }}
                        >
                        <Text style={styles.buttonText}>
                            {Strings[settings.language].buttons.setToDefault}
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {paddingLeft: 10}]}>{Strings[settings.language].labels.time}</Text>
                    <TextInput
                        style={styles.inputField}
                        value={timeValue === 'default' ? Strings[settings.language].frequencyWords[0] : timeValue}
                        onFocus={() => {
                            setShowDate(true);
                            setDateMode('time');
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {paddingLeft: 10}, {color: getTextColor()}]}>{Strings[settings.language].labels.frequency}</Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
                        value={Strings[settings.language].frequencyWords[freqValue]}
                        onFocus={() => {
                            Keyboard.dismiss();
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
                    minimumDate={Moment().toDate()}
                    onChange={(event, date) => {
                        Keyboard.dismiss();
                        setShowDate(false);
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
            <ButtonBar buttons={[ cancelbtn, savebtn ]}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    mainview: {
        flex: 1,
        padding: 10,
    }, 
    row: {
        flexDirection: 'row', 
        marginBottom: 10,
    },
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center',
        flexWrap: 'wrap',
        flexShrink: 1,
    }, 
    inputField: {
        borderColor: Colors.inputBorder, 
        borderWidth: 1, 
        padding: 3,
        paddingHorizontal: 10,
        fontSize: 18,
    }, 
    defaultsButton: {
        backgroundColor: Colors.cancel,
        borderRadius: 20,
        padding: 10,
        elevation: 0
    },
    buttonText: {
        color: Colors.navButtonText,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
    },
});
