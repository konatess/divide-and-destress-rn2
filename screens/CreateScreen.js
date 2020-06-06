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
    // total units vs start and end
    const [isTotal, setIsTotal] = React.useState(false);
    const toggleSwitch = () => setIsTotal(previousState => !previousState);
    // the following state values are purely for retrieval
    // title value
    const [titleValue, setTitleValue] = React.useState("");
    // tags value
    const [tagsValue, setTagsValue] = React.useState("");
    // start and end values
    const [startValue, setStartValue] = React.useState(1);
    const [endValue, setEndValue] = React.useState(0);
    // project to save
    const newProj = new Project();
    const saveProj = () => {
        console.log('MARK')
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
        else if (knowntitles.some((value) => {
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
            newProj.startDate = Moment().toDate();
            newProj.dueDate = dateValue;
            newProj.startUnit = parseInt(startValue);
            newProj.endUnit = parseInt(endValue);
            newProj.currentUnit = parseInt(startValue);
            newProj.unitName = unitValue;
            newProj.totalVsRange = isTotal;
            newProj.tags = tags;
            newProj.freq = freqValue;
            newProj.time = timeValue;
            console.log(newProj);
            console.log('Save Project');
            Storage.createProj(newProj);
            navigation.push(Strings.routes.home)
        }
    };
    const savebtn = AllButtons.save;
    const modalokaybtn = AllButtons.okay;

    savebtn.onPress = () => saveProj();
    modalokaybtn.onPress = () => setmodalVisible(false);
    
    return (
        <View style={styles.container}>
            <CustModal 
            visible={modalVisible} 
            message={modalMessage} 
            buttons={modalButtons} 
            />
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings.labels.title}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.title}
                    autoCapitalize={'words'}
                    onChangeText={text => setTitleValue(text)}
                />
                <Text style={styles.labelText}>{Strings.labels.tags}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.tags}
                    onChangeText={text => setTagsValue(text)}
                />
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.startUnit + Strings.units[unitValue] + ': '}</Text>
                    <TextInput
                        style={styles.inputField}
                        defaultValue={'1'}
                        placeholder={'1'}
                        keyboardType={'number-pad'}
                        onChangeText={text => setStartValue(text)}
                    />
                    <Text style={styles.labelText}>{Strings.labels.endUnit + Strings.units[unitValue] + ': '}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
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
                        onValueChange={(itemValue, itemIndex) => setFreqValue(itemValue)}
                    >
                        {Strings.frequencyWords.map((unit, index) => {
                            return (
                                <Picker.Item key={index} label={unit} value={index} />
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {flexShrink: 1}]}>{Strings.labels.toggle}</Text>
                    <Switch
                        trackColor={{ false: Colors.toggle.trackfalse, true: Colors.toggle.tracktrue }}
                        thumbColor={isTotal ? Colors.toggle.thumbtrue : Colors.toggle.thumbfalse}
                        ios_backgroundColor={Colors.toggle.ios_backgroundColor}
                        onValueChange={toggleSwitch}
                        value={isTotal}
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
                            setTimeValue(Moment(date).format('h:mm a'));
                            setDateValue(date);
                        }
                    }}
                />}
            </View>
            <ButtonBar buttons={[ savebtn ]} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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