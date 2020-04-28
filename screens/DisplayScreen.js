import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

export default function DisplayScreen() {
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 5,
    },
        
});