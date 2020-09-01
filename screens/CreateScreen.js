import * as React from 'react';
import { 
    Keyboard, 
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
import AllButtons from '../constants/ButtonClass';
import Storage from '../storage/Async';
import Moment from 'moment';

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
    const [dateValue, setDateValue] = React.useState(Moment().add(7, 'days').toDate());
    // time picker
    const [timeValue, setTimeValue] = React.useState('default');
    // Frequency picker
    const [freqValue, setFreqValue] = React.useState(0);
    // the following state values are purely for retrieval
    // title value
    const [titleValue, setTitleValue] = React.useState("");
    // start and end values
    const [startValue, setStartValue] = React.useState(1);
    const [endValue, setEndValue] = React.useState(0);
    // project to save
    const newProj = new Project();
    const saveProj = () => {
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
        else if (parseInt(startValue) >= parseInt(endValue)) {
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.firstSmaller.replace(/\*unit\*/g, allSUnits[unitValue])));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else {
            newProj.title = titleValue.trim();
            newProj.startDate = Moment().toDate();
            newProj.dueDate = dateValue;
            newProj.startUnit = parseInt(startValue);
            newProj.endUnit = parseInt(endValue);
            newProj.currentUnit = parseInt(startValue);
            newProj.unitName = unitValue;
            newProj.freq = freqValue;
            newProj.time = timeValue;
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
        <View style={[styles.container, {backgroundColor: settings.darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
            <CustModal 
                visible={modalVisible} 
                message={modalMessage} 
				pickers={modalPickers}
				inputs={[]}
                buttons={modalButtons} 
                darkmode={settings.darkmode}
            />
            <View style={styles.mainview}>
                <Text style={[styles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.title}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}, {color: getTextColor()}]}
                    placeholder={Strings[settings.language].placeholder.title}
                    autoCapitalize={'words'}
                    onChangeText={text => setTitleValue(text)}
                />
                <View style={styles.row}>
                    <Text style={[styles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.startUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
                        defaultValue={'1'}
                        placeholder={'1'}
                        keyboardType={'number-pad'}
                        onChangeText={text => setStartValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {color: getTextColor()}]}>
                        {Strings.capitalize(Strings[settings.language].labels.endUnit.replace(/\*unit\*/g, allSUnits[unitValue]))}
                    </Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
                        placeholder={'42'}
                        keyboardType={'number-pad'}
                        onChangeText={text => setEndValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.dueDate}</Text>
                    <TextInput 
                        style={[styles.inputField, {color: getTextColor()}]} 
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
                    <Text style={[styles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.notification}</Text>
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
                    <Text style={[styles.labelText, {paddingLeft: 10}, {color: getTextColor()}]}>{Strings[settings.language].labels.time}</Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
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
                    minimumDate={Moment().add(2, 'days').toDate()}
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
            <ButtonBar buttons={[ cancelbtn, savebtn ]} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
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