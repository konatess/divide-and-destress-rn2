import * as React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import TabBarIcon from './TabBarIcon';

export default function CustomButton({ navigation, title, color, iconName, onPress, }) {
    return <Button style={[ styles.button, color ]}
        title= {title}
        color= {color}
        onPress = {onPress}
    >
        <TabBarIcon name={iconName} />
    </Button>
        
}

const styles = StyleSheet.create({
    button: {
        flex:1, 
        padding: 5,
        backgroundColor: 'pink'
    },
});