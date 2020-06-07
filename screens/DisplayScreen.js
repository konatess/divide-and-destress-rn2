import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';
import Moment from 'moment';

export default function DisplayScreen({ route, navigation }) {
    const { knowntitles } = route.params;
    const { settings } = route.params;
    const { project } = route.params;
    const { key } = route.params;
    const deleteProj = async (projKey) => {
        await Storage.deleteProj(projKey);
        navigation.navigate(Strings.routes.home); 
    }
    const deletebtn = AllButtons.delete;
    const editbtn = AllButtons.edit;
    const homebtn = AllButtons.home;
    deletebtn.onPress = () => deleteProj(key);
    editbtn.onPress = () => navigation.navigate(Strings.routes.edit, {
        project: project, 
        key: key, 
        knowntitles: knowntitles,
        settings: settings
    });
    homebtn.onPress = () => navigation.navigate(Strings.routes.home);
    return (
        <View style={styles.container}>
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings.labels.title + project._title}</Text>
                <Text style={styles.labelText}>
                    {Strings.labels.currentUnit.replace(/unit/g, Strings.units[project._unitName]) + project._currentUnit}
                </Text>
                <Text style={styles.labelText}>
                    {Strings.labels.dueDate + Moment(project._dueDate).format(settings.dateFormat)}
                </Text>
                <Text style={styles.labelText}>
                    {Strings.labels.startDate + Moment(project._startDate).format(settings.dateFormat)}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.labelText}>
                        {Strings.labels.startUnit.replace(/unit/g, Strings.units[project._unitName]) + project._startUnit}
                    </Text>
                    <Text style={styles.labelText}>
                        {Strings.labels.endUnit.replace(/unit/g, Strings.units[project._unitName]) + project._endUnit}
                    </Text>
                </View>
                <Text style={styles.labelText}>{Strings.labels.tagsDisplay + (project._tags.length ? project._tags.join(', ') : Strings.placeholder.noTags)}</Text>
                <Text style={styles.labelText}>{Strings.labels.notification}</Text>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings.labels.time + '  ' + project._time}</Text>
                    <Text style={[styles.labelText, {paddingLeft: 5}]}>{Strings.labels.frequency + '  ' + Strings.frequencyWords[project._frequency]}</Text>
                </View>
            </View>
            <ButtonBar buttons={[ deletebtn, editbtn, homebtn ]} />
        </View>
    )
};

DisplayScreen.navigationOptions = {
	header: null,
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
        justifyContent: 'space-between',
        paddingRight: 10
    },
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center',
        marginBottom: 15
    }, 
});