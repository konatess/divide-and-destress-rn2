import React, { Component, useState } from "react";
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
import { Ionicons } from '@expo/vector-icons';

export default ({visible, message, pickers, inputs, buttons, darkmode}) => {
    return (
        <Modal
			animationType="slide"
			transparent={true}
			visible={visible}
        >
			<View style={styles.centeredView}>
				<View style={[styles.modalView, {backgroundColor: darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
					{message && <Text style={[styles.modalText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}>{message}</Text>}
					{(pickers.length > 0) && <View style={styles.pickerView}>
						<View style={styles.row}>
							{pickers.map((picker, index) => {
								return (<ScrollView key={"picker" + index}>
									{picker.map((unit) => {
										return (<TouchableHighlight style={styles.pickerButton} onPress={unit.onPress} key={unit._title}>
													<Text style={[styles.optionText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}>{unit._title}</Text>
											</TouchableHighlight>
										)
									})}
								</ScrollView>)
							})}
						</View>
					</View>}
					{(inputs.length > 0) && inputs.map((unit, index) => {
							return ( <View style={styles.row}>
								<Text style={[styles.labelText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]} key={unit.label}>{unit.label}</Text>
								<TextInput
									key={unit.label + '-input'}
									style={[styles.inputField, {marginBottom: 10}, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}
									placeholder={unit.placeholder}
									autoFocus={!index}
									autoCapitalize={'none'}
									onChangeText={unit.onChange}
								/>
							</View>	)})
					}
					<View style={styles.row}>
						{buttons.map((unit, index) => {
							return (
								<TouchableHighlight
									key={index}
									style={{ ...styles.openButton, backgroundColor: unit._color}}
									onPress={unit.onPress}
									>
									
									<Text style={styles.textStyle}>
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

const styles = StyleSheet.create({
    centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
    },
    modalView: {
		margin: 20,
		borderRadius: 20,
		padding: 30,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	pickerView: {
		maxHeight: 150,
		marginBottom: 10,
		borderColor: Colors.done,
		borderWidth: .5,
		borderRadius: 10,
		padding: 5,
	},
    openButton: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginBottom: 5,
		marginHorizontal: 5,
	},
	pickerButton: {
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginBottom: 3,
		borderRadius: 10,
		borderWidth: .5,
		borderColor: Colors.done,
	},
	optionText: {
	  fontSize: 15,
	  alignSelf: 'flex-start',
	  marginTop: 1,
	},
    textStyle: {
		color: Colors.navButtonText,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 20,
    },
    modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 18,
    }, 
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
    },
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center'
    }, 
    inputField: {
        borderColor: Colors.inputBorder, 
        borderWidth: 1, 
        padding: 3,
        paddingHorizontal: 10,
        fontSize: 18,
    }, 
  });