import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';

export default function EditScreen() {
    const button1 = AllButtons.delete;
    const button2 = AllButtons.save;
    // button1.onPress = () => navigation.navigate(Strings.routes.settings);
    // button2.onPress = () => navigation.navigate(Strings.routes.edit);
    const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy'], {'freq':'daily', 'time':'8pm'});
    return (
        <View style={styles.container}>
            <Text>EditScreen</Text>
            <View style={styles.mainview}>

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
        backgroundColor: 'green'
    }    
});