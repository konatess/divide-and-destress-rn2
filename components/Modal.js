import React, { Component, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default ({visible, message, pickers, buttons, darkmode}) => {
    return (
        <Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				console.log("Modal has been closed.");
			}}
        >
        <View style={styles.centeredView}>
          	<View style={[styles.modalView, {backgroundColor: darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
				{message && <Text style={[styles.modalText, {color: darkmode ? Colors.darkmode.text : Colors.maintext}]}>{message}</Text>}
				{pickers && <View style={styles.pickerView}>
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
		height: 150,
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
  });