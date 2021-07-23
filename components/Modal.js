import React from "react";
import {
  	Modal,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';
import { containers, rows, buttonStyles, textStyles, inputStyles, iconSizes } from "../constants/Styles";
import { Ionicons } from '@expo/vector-icons';

export default ({visible, message, pickers, inputs, showDate, datemode, dateString, dateValue, minDate, dateOnChange, buttons, vertical, darkmode}) => {
    return (
        <Modal
			animationType="slide"
			transparent={true}
			visible={visible}
        >
			<View style={containers.centerModal}>
				<View style={[containers.modalArea, {backgroundColor: darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
					{message !== '' && <Text style={[textStyles.modalMsgText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}>{message}</Text>}
					{(pickers.length > 0) && <View style={containers.pickerArea}>
						<View style={{flexDirection: 'row'}}>
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
							return ( <View style={rows.rowModal} key={"input" + index}>
								<Text style={[textStyles.labelText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]} key={unit.label}>{unit.label}</Text>
								<TextInput
									accessibilityLabel={unit.label}
									key={unit.label + '-input'}
									keyboardType={unit.keyboardType || 'default'}
									style={[inputStyles.inputField, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}
									placeholder={unit.placeholder}
									defaultValue={unit.default || ''}
									autoFocus={!index}
									autoCapitalize={'none'}
									onChangeText={unit.onChange}
								/>
							</View>	)})
					}
					{Platform.OS === 'ios' && showDate && <DateTimePicker 
                    	accessibilityLabel={dateString}
						value={dateValue}
						mode={datemode}
						display={'spinner'}
						minimumDate={minDate}
						style={containers.datetimeSpinner}
						textColor={darkmode ? Colors.darkmode.text : Colors.maintext}
						onChange={(event, date) => {
							if (date !== undefined) {
								dateOnChange(date);
							}
						}}
					/>}
					<View style={[vertical ? rows.vertical : rows.rowModal, {marginTop: 10}]}>
						{buttons.map((unit, index) => {
							return (
								<TouchableHighlight
									key={'mb-' + index}
									style={[buttonStyles.modalButton, { backgroundColor: unit._color }]}
									onPress={unit.onPress}
									>
									
									<Text style={textStyles.modalBtnText}>
										{unit._iconName && <Ionicons size={iconSizes.modalIconSize} name={unit._iconName} />}
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