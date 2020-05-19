import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Switch } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
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
    const [selectedValue, setSelectedValue] = React.useState(Strings.units[1]);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
    const button1 = AllButtons.delete;
    const button2 = AllButtons.save;
    // button1.onPress = () => navigation.navigate(Strings.routes.settings);
    button2.onPress = () => {saveProj()};
    return (
        <View style={styles.container}>
            <CustModal modalVisible={visible} />
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
                        value={Moment().format(settings.dateFormat)}
                        onFocus={() => {
                            setVisible(true);
                        }} />
                    {/* <CalendarPicker/> */}
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, { textAlignVertical: 'center'}]}>{Strings.labels.unitName}</Text>
                    <Picker 
                        selectedValue={selectedValue}
                        style={{ flexGrow: 1 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label={Strings.units[0]} value={Strings.units[0]} />
                        <Picker.Item label={Strings.units[1]} value={Strings.units[1]} />
                        <Picker.Item label={Strings.units[2]} value={Strings.units[2]} />
                    </Picker>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.startUnit + selectedValue + ': '}</Text>
                    <TextInput
                        style={styles.inputField}
                        defaultValue={'1'}
                    />
                    <Text style={styles.labelText}>{Strings.labels.endUnit + selectedValue + ': '}</Text>
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
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <ButtonBar 
                b1= {button1}
                b2= {button2}
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