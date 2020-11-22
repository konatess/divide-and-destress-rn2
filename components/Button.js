import * as React from 'react';

import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import TabBarIcon from './TabBarIcon';
import Colors from '../constants/Colors';

export default function CustomButton({ title, color, iconName, onPress }) {
    return <RectButton style={ [styles.button, {backgroundColor: color}]} onPress={onPress}>
        <TabBarIcon focused={false} name={iconName} />
        <Text style={styles.buttonText}>{title}</Text>
    </RectButton>
}

const styles = StyleSheet.create({
    button: {
        flex:1, 
        padding: 15,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.navButtonText,
        fontSize: 18
    },
});