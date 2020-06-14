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
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';
import Moment from 'moment';

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
    // date/time picker
    const [showDate, setShowDate] = React.useState(false);
    const [dateMode, setDateMode] = React.useState('date');
    const [dateValue, setDateValue] = React.useState(Moment(project._dueDate).toDate())
    const [timeValue, setTimeValue] = React.useState(project._time);
    // Frequency picker
    const [freqValue, setFreqValue] = React.useState(project._frequency);
    // title value
    const [titleValue, setTitleValue] = React.useState(project._title);
    // tags value
    const [tagsValue, setTagsValue] = React.useState(project._tags.length ? project._tags.join(', ') : '');
    // start and end units
    const [startValue, setStartValue] = React.useState(project._startUnit);
    const [currentValue, setCurrentValue] = React.useState(project._currentUnit);
    const [endValue, setEndValue] = React.useState(project._endUnit);
    const deleteProj = async (projKey) => {
        await Storage.deleteProj(projKey);
        navigation.navigate(Strings.routes.home); 
    }
    // project to save
    const newProj = new Project();
    const updateProj = () => {
        if (titleValue.trim() === "") {
            setModalMessage(Strings.alerts.title.blank);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!newProj.titleIsValid(titleValue)) {
            setModalMessage(Strings.alerts.charTitle);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (cleanedTitles.some((value) => {
            return value === newProj.title
        })) {
            setModalMessage(Strings.alerts.title.exists);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!startValue) {
            setModalMessage(Strings.alerts.first);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (!endValue) {
            setModalMessage(Strings.alerts.last);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (startValue >= endValue) {
            setModalMessage(Strings.alerts.firstSmaller.replace(/unit/g, Strings.units[unitValue]));
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else if (tagsValue && !newProj.tagsAreValid(tagsValue)) {
            setModalMessage(Strings.alerts.charTags);
            setModalButtons([modalokaybtn]);
            setmodalVisible(true);
        }
        else {
            let tags = [];
            if (tagsValue) {
                let tagsSplit = tagsValue.trim().split(/\s*,\s*/);
                tags = tagsSplit.filter(item => {
                    return item.length > 0
                })
            }
            newProj.title = titleValue.trim();
            newProj.dueDate = dateValue;
            newProj.startUnit = parseInt(startValue);
            newProj.endUnit = parseInt(endValue);
            newProj.currentUnit = parseInt(currentValue);
            newProj.unitName = unitValue;
            newProj.tags = tags;
            newProj.freq = freqValue;
            newProj.time = timeValue;
            Storage.updateProj(key, newProj);
            navigation.navigate(Strings.routes.home)
        }
    };
    const deletebtn = AllButtons.delete;
    const savebtn = AllButtons.save;
    const modalDeleteBtn = AllButtons.delete2;
    const modalCancelBtn = AllButtons.cancel;modalDeleteBtn.onPress = () => {
        setmodalVisible(false);
        deleteProj(key);
    };
    modalCancelBtn.onPress = () => {
        setmodalVisible(false)
    };
    deletebtn.onPress = () => {
        setModalMessage(Strings.alerts.confirmDelete);
        setModalButtons([modalDeleteBtn, modalCancelBtn]);
        setmodalVisible(true);
    };
    savebtn.onPress = () => updateProj();
    return (
        <View style={styles.container}>
            <CustModal 
            visible={modalVisible} 
            message={modalMessage} 
            buttons={modalButtons} 
			darkmode={settings.darkmode}
            />
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings.labels.title}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.title}
                    value={titleValue}
                    autoCapitalize={'words'}
                    onChangeText={text => setTitleValue(text)}
                />
                <Text style={styles.labelText}>{Strings.labels.tags}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.tags}
                    value={tagsValue}
                    onChangeText={text => setTagsValue(text)}
                />
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                    <Text style={styles.labelText}>{Strings.labels.currentUnit.replace(/unit/g, Strings.units[unitValue])}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
                        value={currentValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => setCurrentValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.startUnit.replace(/unit/g, Strings.units[unitValue])}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'1'}
                        value={startValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => setStartValue(text)}
                    />
                    <Text style={styles.labelText}>{Strings.labels.endUnit.replace(/unit/g, Strings.units[unitValue])}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
                        value={endValue.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={text => setEndValue(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.dueDate}</Text>
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
                    <Text style={[styles.labelText, { textAlignVertical: 'center'}]}>{Strings.labels.unitName}</Text>
                    <Picker 
                        selectedValue={unitValue}
                        style={{ flexGrow: 1 }}
                        text
                        onValueChange={(itemValue, itemIndex) => setUnitValue(itemValue)}
                    >
                        {Strings.units.map((unit, index) => {
                            return (
                                <Picker.Item key={index} label={unit} value={index} />
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.notification}</Text>
                    <TouchableHighlight
                        style={styles.defaultsButton}
                        onPress={() => {
                            setTimeValue('default');
                            setFreqValue(0);
                        }}
                        >
                        <Text style={styles.buttonText}>
                            {Strings.buttons.setToDefault}
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.time}</Text>
                    <TextInput
                        style={styles.inputField}
                        value={timeValue}
                        onFocus={() => {
                            setShowDate(true);
                            setDateMode('time');
                        }}
                    />
                    <Text style={[styles.labelText, {paddingLeft: 5}]}>{Strings.labels.frequency}</Text>
                    <Picker 
                        selectedValue={freqValue}
                        style={{ flexGrow: 1 }}
                        onValueChange={(itemValue) => setFreqValue(itemValue)}
                    >
                        {Strings.frequencyWords.map((unit, index) => {
                            return (
                                <Picker.Item key={index} label={unit} value={index} />
                            )
                        })}
                    </Picker>
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
                            setTimeValue(Moment(date).format('h:mm a'));
                            setDateValue(date);
                        }
                    }}
                />}
            </View>
            <ButtonBar buttons={[ deletebtn, savebtn ]}/>
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