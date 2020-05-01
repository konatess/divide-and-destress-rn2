import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import CustomButton from './Button';

// pull out onPress and set them on the page instead, 
// so that it can be used for Save and Delete buttons as well

export default function ButtonBar({ navigation, b1, b2, b3}) {
    return <View style={ styles.container }>
        {/* <Text>Buttons Here</Text> */}
        <CustomButton 
        // navigation={navigation} 
        title={b1._title} 
        color={b1._color} 
        iconName={b1._iconName} 
        onPress={() => navigation.navigate(b1._route)} />
        <CustomButton 
        // navigation={navigation} 
        title={b2._title} 
        color={b2._color} 
        iconName={b2._iconName} 
        onPress={() => navigation.navigate(b2._route)}/>
        <CustomButton 
        // navigation={navigation} 
        title={b3._title} 
        color={b3._color} 
        iconName={b3._iconName} 
        onPress={() => navigation.navigate(b3._route)}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        padding: 0,
    },
});