import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';

export default function EditScreen() {
    const deletebtn = AllButtons.delete;
    const savebtn = AllButtons.save;
    // deletebtn.onPress = () => navigation.navigate(Strings.routes.settings);
    // savebtn.onPress = () => navigation.navigate(Strings.routes.edit);
    const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy'], {'freq':'daily', 'time':'8pm'});
    return (
        <View style={styles.container}>
            <Text>EditScreen</Text>
            <View style={styles.mainview}>

            </View>
            <ButtonBar buttons={[ deletebtn, savebtn ]}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.mainbackground,
    },
    mainview: {
        flex: 1,
        padding: 10,
        backgroundColor: 'green'
    }    
});