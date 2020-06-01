import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Switch, Keyboard } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
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
    // modal visibility
    const [modalVisible, setmodalVisible] = React.useState(false);
    // date/time picker
    const [showDate, setShowDate] = React.useState(false);
    const [dateMode, setDateMode] = React.useState('date');
    const [dateValue, setDateValue] = React.useState(Moment().add(7, 'days').toDate() || new Date(1598051730000))
    const [timeValue, setTimeValue] = React.useState('default');
    // Frequency picker
    const [freqValue, setFreqValue] = React.useState(0);
    // total units vs start and end
    const [isTotal, setisTotal] = React.useState(false);
    const toggleSwitch = () => setisTotal(previousState => !previousState);
    // project to save
    const newProj = new Project();
    const saveProj = () => {
        if (knowntitles.some((value, index, array) => {
            return value === newProj.title
        })) {
            console.log(Strings.alerts.title.exists);
            alert(Strings.alerts.title.exists);
        }
        else {
            console.log('Save Project');
        // Storage.createProj(newProj)
        }
    };
    const deletebtn = AllButtons.delete;
    const savebtn = AllButtons.save;
    const modaldonebtn =AllButtons.done;

    // deletebtn.onPress = () => navigation.navigate(Strings.routes.settings);
    savebtn.onPress = () => saveProj();
    modaldonebtn.onPress = () => setmodalVisible(false);
    
    return (
        <View style={styles.container}>
            <CustModal 
            startVisible={modalVisible} 
            message={'I am Groot'} 
            buttons={[ modaldonebtn ]} 
            />
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings.labels.title}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.title}
                    autoCapitalize={'words'}
                    returnKeyType='next'
                    onEndEditing={(e) => {
                        newProj.title = e.nativeEvent.text;
                        console.log('Title changed');
                    }}
                />
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
                    <Text style={styles.labelText}>{Strings.labels.startUnit + Strings.units[unitValue] + ': '}</Text>
                    <TextInput
                        style={styles.inputField}
                        defaultValue={'1'}
                        onEndEditing={(e) => {
                        newProj.startUnit = e.nativeEvent.text;
                    }}
                    />
                    <Text style={styles.labelText}>{Strings.labels.endUnit + Strings.units[unitValue] + ': '}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
                        onEndEditing={(e) => {
                        newProj.endUnit = e.nativeEvent.text;
                    }}
                    />
                </View>
                <Text style={styles.labelText}>{Strings.labels.tags}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.tags}
                    onEndEditing={(e) => {
                        newProj.tags = e.nativeEvent.text;
                    }}
                />
                <Text style={styles.labelText}>{Strings.labels.notification}</Text>
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
                        if (dateMode === 'time' && date !== undefined) {
                            setTimeValue(Moment(date).format('h:mm a'));
                            setDateValue(date);
                        }
                        if (dateMode === 'time' && date === undefined) {
                            setTimeValue('default');
                        }
                    }}
                />}
            </View>
            <ButtonBar 
                b1= {deletebtn}
                b2= {savebtn}
            />
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
});