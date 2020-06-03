import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import { Ionicons } from '@expo/vector-icons';

export default ({visible, message, buttons}) => {
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
          <View style={styles.modalView}>
            {message && <Text style={styles.modalText}>{message}</Text>}

            {buttons.map((unit, index) => {
                return (
                    <TouchableHighlight
                        key={index}
                        style={{ ...styles.openButton, backgroundColor: unit._color}}
                        onPress={unit.onPress}
                        >
                        
                        <Text style={styles.textStyle}>
                            {unit._iconName && <Ionicons name={unit._iconName} />}
                            {'  ' + unit._title}
                        </Text>
                    </TouchableHighlight>
                )
            })}
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
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: Colors.navButtonText,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });