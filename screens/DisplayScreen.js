import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';

export default function DisplayScreen({ navigation }) {
    const button1 = AllButtons.delete;
    const button2 = AllButtons.edit;
    const button3 = AllButtons.home;
    // button1.onPress = () => navigation.navigate(Strings.routes.settings);
    button2.onPress = () => navigation.navigate(Strings.routes.edit);
    button3.onPress = () => navigation.navigate(Strings.routes.home);
    const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy'], {'freq':'daily', 'time':'8pm'});
    return (
        <View style={styles.container}>
            <Text>DisplayScreen</Text>
            <View style={styles.mainview}>

            </View>
            <ButtonBar 
                b1= {button1}
                b2= {button2}
                b3= {button3}
            />
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
        padding: 10
    }
});