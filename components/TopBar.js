import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

export default function TopBar({text}) {
    return <View style={styles.bar}>
        <Text style={styles.text}>{text}</Text>
    </View>
}

const styles = StyleSheet.create({
    bar: {
        height: 50,
        backgroundColor: Colors.iconColor,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
        color: Colors.topbarText,
    }
})