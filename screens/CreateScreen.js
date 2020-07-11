import * as React from 'react';
import { 
    Keyboard, 
    Picker, 
    StyleSheet, 
    Switch, 
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
import Moment from 'moment'

export default function CreateScreen({ route, navigation}) {
    const { knowntitles } = route.params
    const { settings } = route.params
    // Unit picker
    const [unitValue, setUnitValue] = React.useState(1);
    // modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
    const [modalButtons, setModalButtons] = React.useState([]);
    // date/time picker
    const [showDate, setShowDate] = React.useState(false);
    const [dateMode, setDateMode] = React.useState('date');
    const [dateValue, setDateValue] = React.useState(Moment().add(7, 'days').toDate() || new Date(1598051730000))
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
        else if (!newProj.titleIsValid(titleValue)) {
            setModalMessage(Strings[settings.language].alerts.charTitle);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (knowntitles.some((value) => {
            return value === newProj.title
        })) {
            setModalMessage(Strings[settings.language].alerts.title.exists);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!startValue) {
            setModalMessage(Strings[settings.language].alerts.first);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!endValue) {
            setModalMessage(Strings[settings.language].alerts.last);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (startValue >= endValue) {
            setModalMessage(Strings[settings.language].alerts.firstSmaller.replace(/unit/g, Strings[settings.language].units[unitValue]));
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
            Storage.createProj(newProj);
            navigation.navigate(Strings.routes.home)
        }
    };
    const savebtn = AllButtons.save;
    savebtn._title = Strings[settings.language].buttons.save
    const cancelbtn = AllButtons.cancel;
    cancelbtn._title = Strings[settings.language].buttons.cancel;
    const modalokaybtn = AllButtons.okay;
    modalokaybtn._title = Strings[settings.language].buttons.okay;
    savebtn.onPress = () => saveProj();
	cancelbtn.onPress = () => navigation.navigate(Strings.routes.home);
    modalokaybtn.onPress = () => setmodalVisible(false);

    const getTextColor = () => {
        return settings.darkmode ? Colors.darkmode.text : Colors.maintext
    };
    
    return (
        <View style={[styles.container, {backgroundColor: settings.darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
            <CustModal 
            visible={modalVisible} 
            message={modalMessage} 
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
                        {Strings[settings.language].labels.startUnit.replace(/unit/g, Strings[settings.language].units[unitValue])}
                    </Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
                        defaultValue={'1'}
                        placeholder={'1'}
                        keyboardType={'number-pad'}
                        onChangeText={text => setStartValue(text)}
                    />
                    <Text style={[styles.labelText, {color: getTextColor()}]}>
                        {Strings[settings.language].labels.endUnit.replace(/unit/g, Strings[settings.language].units[unitValue])}
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
                    <Picker 
                        selectedValue={unitValue}
                        style={[{ flexGrow: 1 }, {color: getTextColor()}]}
                        onValueChange={(itemValue) => setUnitValue(itemValue)}
                    >
                        {Strings[settings.language].units.map((unit, index) => {
                            return (
                                <Picker.Item key={index} textStyle={{color: getTextColor()}} label={unit} value={index} />
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.notification}</Text>
                    <TouchableHighlight
                        style={styles.defaultsButton}
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
                    <Text style={[styles.labelText, {color: getTextColor()}]}>{Strings[settings.language].labels.time}</Text>
                    <TextInput
                        style={[styles.inputField, {color: getTextColor()}]}
                        value={timeValue}
                        onFocus={() => {
                            setShowDate(true);
                            setDateMode('time');
                        }}
                    />
                    <Text style={[styles.labelText, {paddingLeft: 5}, {color: getTextColor()}]}>{Strings[settings.language].labels.frequency}</Text>
                    <Picker 
                        selectedValue={freqValue}
                        style={{ flexGrow: 1 }}
                        onValueChange={(itemValue, itemIndex) => setFreqValue(itemValue)}
                    >
                        {Strings[settings.language].frequencyWords.map((unit, index) => {
                            return (
                                <Picker.Item key={index} label={unit} value={index} />
                            )
                        })}
                    </Picker>
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
                            setTimeValue(Moment(date).format('HH:mm'));
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
        justifyContent: 'space-between',
        marginBottom: 10
    },
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center'
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