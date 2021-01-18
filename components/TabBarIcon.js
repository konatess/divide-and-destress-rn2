import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { iconSizes } from '../constants/Styles'

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={iconSizes.navIconSize}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
