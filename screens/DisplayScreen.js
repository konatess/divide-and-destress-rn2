import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';

export default function DisplayScreen({ route, navigation }) {
    const { knowntitles } = route.params;
    const { settings } = route.params;
    const { project } = route.params;
    const { key } = route.params;
    const deleteProj = async (projKey) => {
        await Storage.deleteProj(projKey);
        navigation.push(Strings.routes.home); 
    }
    const deletebtn = AllButtons.delete;
    const editbtn = AllButtons.edit;
    const homebtn = AllButtons.home;
    deletebtn.onPress = () => deleteProj(key);
    editbtn.onPress = () => navigation.navigate(Strings.routes.edit, {key: key});
    homebtn.onPress = () => navigation.navigate(Strings.routes.home);
    const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy'], {'freq':'daily', 'time':'8pm'});
    return (
        <View style={styles.container}>
            <Text>DisplayScreen</Text>
            <View style={styles.mainview}>
                <Text>{project._title}</Text>
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
      backgroundColor: Colors.mainbackground,
    },
    mainview: {
        flex: 1,
        padding: 10
    }
});