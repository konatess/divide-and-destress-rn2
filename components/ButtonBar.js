import * as React from 'react';

import { View } from 'react-native';
import CustomButton from './Button';
import { containers } from "../constants/Styles";

export default function ButtonBar({buttons}) {
        return <View style={ containers.buttonBar }>
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
