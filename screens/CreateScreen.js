import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Picker, DatePickerAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings'

export default function CreateScreen() {
    const [selectedValue, setSelectedValue] = React.useState(Strings.units[1]);
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>{Strings.labels.title}</Text>
            <TextInput
                style={styles.inputField}
                placeholder={Strings.placeholder.title}
                returnKeyType='next'
            />
            <Text style={styles.labelText}>{Strings.labels.dueDate}</Text>
            <View style={styles.row}>
                <Text style={styles.labelText}>{Strings.labels.unitName}</Text>
                <Picker 
                    selectedValue={selectedValue}
                    style={{ flexGrow: 1 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item style={styles.pItem} label={Strings.units[0]} value={Strings.units[0]} />
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
                style={styles.inputField}
                placeholder={Strings.placeholder.tags}
            />
            <Text style={styles.labelText}>{Strings.labels.notification}</Text>
            <Text style={styles.labelText}>{Strings.labels.toggle}</Text>
            {/* title (text input), 
            due date (calendar picker), 
            unit name (dropdown), 
            start unit (number input), 
            end unit (number input), 
            tags (text input),
            notification settings (ummmm),
            toggle */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    labelText: {
        fontSize: 20,
    }, 
    inputField: {
        borderColor: Colors.inputBorder, 
        borderWidth: 1, 
        padding: 3,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 18,
    }, 
});