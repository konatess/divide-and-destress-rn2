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
import ButtonBar from '../components/ButtonBar'
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
    const deleteProj = async (projKey) => {
        await Storage.deleteProj(projKey);
        navigation.push(Strings.routes.home); 
    }
    const deletebtn = AllButtons.delete;
    const savebtn = AllButtons.save;
    deletebtn.onPress = () => deleteProj(key);
    // savebtn.onPress = () => navigation.navigate(Strings.routes.edit);
    const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy'], {'freq':'daily', 'time':'8pm'});
    return (
        <View style={styles.container}>
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings.labels.title + project._title}</Text>
                <Text style={styles.labelText}>
                    {Strings.labels.currentUnit + Strings.units[project._unitName] + ': ' + project._currentUnit}
                </Text>
                <Text style={styles.labelText}>
                    {Strings.labels.dueDate + Moment(project._dueDate).format(settings.dateFormat)}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.labelText}>
                        {Strings.labels.startUnit + Strings.units[project._unitName] + ': ' + project._startUnit}
                    </Text>
                    <Text style={styles.labelText}>
                        {Strings.labels.endUnit + Strings.units[project._unitName] + ': ' + project._endUnit}
                    </Text>
                </View>
                <Text style={styles.labelText}>{Strings.labels.tagsDisplay + (project._tags.length ? project._tags.join(', ') : Strings.placeholder.noTags)}</Text>
                <Text style={styles.labelText}>{Strings.labels.notification}</Text>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.time + '  ' + project._time}</Text>
                    <Text style={[styles.labelText, {paddingLeft: 5}]}>{Strings.labels.frequency + '  ' + Strings.frequencyWords[project._frequency]}</Text>
                </View>
            </View>
            <ButtonBar buttons={[ deletebtn, savebtn ]}/>
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