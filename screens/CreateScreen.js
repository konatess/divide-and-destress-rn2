import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Switch } from 'react-native';
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
    // date picker
    // Moment is returning a promise, which doesn't work here. 
    // Figure out how to get that data without putting the promise inside here
    const [dateValue, setDateValue] = React.useState(Moment().add(7, 'days').format(settings.dateFormat))
    // total units vs start and end
    const [isTotal, setisTotal] = React.useState(false);
    const toggleSwitch = () => setisTotal(previousState => !previousState);
    const newProj = new Project();
    const saveProj = () => {
        if (knowntitles.some((value, index, array) => {
            return value === newProj._title
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
            >
            </CustModal>
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings.labels.title}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.title}
                    returnKeyType='next'
                    onEndEditing={(e) => {
                        newProj.title = e.nativeEvent.text;
                        console.log('Title changed');
                    }}
                />
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.dueDate}</Text>
                    <TextInput style={styles.inputField} 
                        value={dateValue}
                        // onFocus={() => setmodalVisible(true)}
                    />
                </View>
                {/* <DateTimePicker 
                    value={Moment(dateValue, settings.dateFormat)} 
                    onChange={(event, date) => setDateValue(date)}
                /> */}
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
                    />
                    <Text style={styles.labelText}>{Strings.labels.endUnit + Strings.units[unitValue] + ': '}</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'42'}
                    />
                </View>
                <Text style={styles.labelText}>{Strings.labels.tags}</Text>
                <TextInput
                    style={[styles.inputField, {marginBottom: 10}]}
                    placeholder={Strings.placeholder.tags}
                />
                <Text style={styles.labelText}>{Strings.labels.notification}</Text>
                <View style={styles.row}>

                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {flexShrink: 1}]}>{Strings.labels.toggle}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isTotal ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isTotal}
                    />
                </View>
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