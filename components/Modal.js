import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Colors from '../constants/Colors';
import { containers, rows, buttonStyles, textStyles, inputStyles } from "../constants/Styles";
import { Ionicons } from '@expo/vector-icons';

export default ({visible, message, pickers, inputs, buttons, vertical, darkmode}) => {
    return (
        <Modal
			animationType="slide"
			transparent={true}
			visible={visible}
        >
			<View style={containers.centerModal}>
				<View style={[containers.modalArea, {backgroundColor: darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
					{message && <Text style={[textStyles.modalMsgText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}>{message}</Text>}
					{(pickers.length > 0) && <View style={containers.pickerArea}>
						<View style={rows.rowModal}>
							{pickers.map((picker, index) => {
								return (<ScrollView key={"picker" + index}>
									{picker.map((unit) => {
										return (<TouchableHighlight style={buttonStyles.pickerButton} onPress={unit.onPress} key={unit._title}>
													<Text style={[textStyles.pickerText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}>{unit._title}</Text>
											</TouchableHighlight>
										)
									})}
								</ScrollView>)
							})}
						</View>
					</View>}
					{(inputs.length > 0) && inputs.map((unit, index) => {
							return ( <View style={rows.rowModal}>
								<Text style={[textStyles.labelText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]} key={unit.label}>{unit.label}</Text>
								<TextInput
									key={unit.label + '-input'}
									keyboardType={unit.keyboardType || 'default'}
									style={[inputStyles.inputField, {marginBottom: 10}, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}
									placeholder={unit.placeholder}
									defaultValue={unit.default || ''}
									autoFocus={!index}
									autoCapitalize={'none'}
									onChangeText={unit.onChange}
								/>
							</View>	)})
					}
					<View style={vertical ? rows.vertical : rows.rowModal}>
						{buttons.map((unit, index) => {
							return (
								<TouchableHighlight
									key={'mb-' + index}
									style={[buttonStyles.modalButton, { backgroundColor: unit._color }]}
									onPress={unit.onPress}
									>
									
									<Text style={textStyles.modalBtnText}>
										{unit._iconName && <Ionicons size={18} name={unit._iconName} />}
										{'  ' + unit._title}
									</Text>
								</TouchableHighlight>
							)
						})}
					</View>
				</View>
			</View>
      	</Modal>
    );
};