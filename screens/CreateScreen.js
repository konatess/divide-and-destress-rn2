import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import Colors from '../constants/Colors';

export default function CreateScreen() {
    const [value, onChangeText] = React.useState('Title of your project...');
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Title:</Text>
            <TextInput
                style={styles.inputField}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    labelText: {
        fontSize: 20,
    }, 
    inputField: {
        borderColor: Colors.inputBorder, 
        borderWidth: 1, 
        padding: 5
    } 
});