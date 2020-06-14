import React, { Component, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

export default ({visible, message, buttons, darkmode}) => {
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
				<ScrollView>
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
				</ScrollView>
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
      marginTop: 22
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
    openButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 5
    },
    textStyle: {
      color: Colors.navButtonText,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 18,
    }
  });