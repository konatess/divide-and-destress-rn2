import * as React from 'react';

import { StyleSheet, View } from 'react-native';
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
        height: 50,
        padding: 0,
    },
});