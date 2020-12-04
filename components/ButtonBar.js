import * as React from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';
import CustomButton from './Button';

export default function ButtonBar({buttons}) {
        return <View style={ styles.container }>
            {buttons.map((unit, index) => {
                return (
                    <CustomButton 
                        key={index}
                        title={unit._title} 
                        color={unit._color} 
                        iconName={unit._iconName} 
                        onPress={unit.onPress} 
                    />
                )
            })}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        width: Dimensions.get('window').width,
        padding: 0,
        position: 'absolute',
        bottom: 0
    },
});