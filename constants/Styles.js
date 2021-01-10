import { Dimensions, StyleSheet } from 'react-native';
import Colors from "../constants/Colors";

const containers = StyleSheet.create({
    // safe area view
    safeArea: {
		flex: 1,
    },
    // Project screens view, inside safe area view
    projArea: {
        flex: 1,
        padding: 10,
    }, 
    buttonBar: {
        flexDirection: 'row',
        height: 70,
        width: Dimensions.get('window').width,
        padding: 0,
        position: 'absolute',
        bottom: 0
    },
    centerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalArea: {
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
    pickerArea: {
        maxHeight: 150,
        marginVertical: 10,
        borderColor: Colors.done,
        borderWidth: .5,
        borderRadius: 10,
        padding: 5,
    },
    datetimeSpinner: {
        width: Dimensions.get('window').width * .8,
    }
});

const rows = StyleSheet.create({
    row1: {
        flexDirection: 'row', 
        marginBottom: 10,
        alignItems: 'center',
    },
    row2: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 15,
    }, 
    row3: {
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    },
    rowSetBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowModal: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    vertical: {
        justifyContent: 'flex-start',
    },
});

const buttonStyles = StyleSheet.create({
    basicButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 0
    },
    modalButton: {
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
    navBtn: {
        flex:1, 
        padding: 15,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectBtnArea: {
        padding: 15,
    },
    projectTitleArea: {
        flexShrink: 1,
        paddingRight: 10,
    },
    projectDueArea: {
        paddingLeft: 5,
        justifyContent: 'center',
    },
    settingsBtnArea: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
    },
    settingsIconArea: {
        marginRight: 12,
    },
    settingslastBtn: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    fab: {
        position: 'absolute',
        right: 15,
        bottom: 75,
        backgroundColor: Colors.transparent,
        borderRadius: 50,
    },
});

const inputStyles = StyleSheet.create({
    inputField: {
        borderColor: Colors.inputBorder, 
        borderWidth: 1, 
        padding: 3,
        paddingHorizontal: 10,
        fontSize: 18,
    }, 
});

const textStyles = StyleSheet.create({
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center',
        flexWrap: 'wrap',
        flexShrink: 1,
    }, 
    buttonText: {
        color: Colors.navButtonText,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
    },
    navBtnText: {
        color: Colors.navButtonText,
        fontSize: 18
    },
    modalMsgText: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 18,
    },
    modalBtnText: {
        color: Colors.navButtonText,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    pickerText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
      },
    displayMargin: {
        marginBottom: 15,
    }, 
    projectTitleText: {
        fontSize: 22,
    },
    projectDueText: {
        fontSize: 18,
    },
    settingsBtnText: {
        fontSize: 15,
    },
});

const modalStyles = StyleSheet.create({

});

const progressbar = StyleSheet.create({
    outline: {
        flexDirection: 'row',
        height: 15,
        width: '100%',
        borderColor: Colors.edit,
        borderWidth: 2,
        borderRadius: 5,
    },
    fill: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.edit,
    },
});
export {containers, rows, buttonStyles, modalStyles, inputStyles, textStyles, progressbar};




// // Settings


// // Calendar iOS btn styles
// calButton: {
//     backgroundColor: Colors.create,
//     borderRadius: 20,
//     padding: 10,
//     elevation: 0
// },
// calButtonText: {
//     color: Colors.navButtonText,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 14,
// },


// // Modal

// labelText: {
//     fontSize: 20,
//     paddingRight: 5,
//     textAlignVertical: 'center'
// }, 
