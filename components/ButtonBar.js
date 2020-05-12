import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import CustomButton from './Button';

// pull out onPress and set them on the page instead, 
// so that it can be used for Save and Delete buttons as well

export default function ButtonBar({b1, b2, b3}) {
    const button1 = <CustomButton 
    title={b1._title} 
    color={b1._color} 
    iconName={b1._iconName} 
    onPress={b1.onPress} />
    const button2 = <CustomButton 
    title={b2._title} 
    color={b2._color} 
    iconName={b2._iconName} 
    onPress={b2.onPress}/>
    if (b3) { 
        return <View style={ styles.container }>
        {button1}
        {button2}
        <CustomButton 
        title={b3._title} 
        color={b3._color} 
        iconName={b3._iconName} 
        onPress={b3.onPress}/>
    </View> }
    else { 
        return <View style={ styles.container }>
        {button1}
        {button2}
    </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        padding: 0,
    },
});