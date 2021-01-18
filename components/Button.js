import * as React from 'react';

import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import TabBarIcon from './TabBarIcon';
import { buttonStyles, textStyles } from "../constants/Styles";

export default function CustomButton({ title, color, iconName, onPress }) {
    return <RectButton style={ [buttonStyles.navBtn, {backgroundColor: color}]} onPress={onPress}>
        <TabBarIcon focused={false} name={iconName} />
        <Text style={textStyles.navBtnText}>{title}</Text>
    </RectButton>
}