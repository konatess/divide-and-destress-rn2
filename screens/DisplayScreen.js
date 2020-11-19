import * as React from 'react';
import { StyleSheet,  Text, TouchableHighlight, View, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import CustModal from '../components/Modal';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';
import Moment from 'moment';
import Reminders from '../constants/Reminders';

export default function DisplayScreen({ route, navigation }) {
    const { knowntitles } = route.params;
    const { settings } = route.params;
    const { project } = route.params;
    const { key } = route.params;
    const [current, setCurrent] = React.useState(project._currentUnit)
    const [perOrDue, setPerOrDue] = React.useState('Loading...');
    const [updateNum, setUpdateNum] = React.useState(0);
    // modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
    const [modalButtons, setModalButtons] = React.useState([]);
    const [modalInputs, setModalInputs] = React.useState([]);
    React.useEffect(() => {
        const getPerDay = () => {
            // units remaining
            let units = project._endUnit - current;
            // days remaining
            let days = Moment().diff(project._dueDate, 'days')*-1
            if (units === 0) {
                return setPerOrDue(Strings[settings.language].labels.complete)
            }
            else if (days === 0) {
                return setPerOrDue(Strings[settings.language].labels.dueToday)
            } else if (days < 0) {
                return setPerOrDue(Strings[settings.language].labels.overDue)
            } else {
                // days/frequency or default frequency
                let periods = days/(project._frequency || settings.notifications.freq);
                // number per day
                let number = (units/periods).toFixed(1);
                // singular vs plural
                let unitLabel = (number === 1) ? allSUnits : allPUnits;
                // units remaining/freq periods remaining
                return setPerOrDue(Strings.capitalize(Strings[settings.language].labels.perDay.replace(/\*unit\*/g, unitLabel[project._unitName])
                .replace(/\*num\*/g, number)
                .replace(/\*freq\*/g, Strings[settings.language].frequencyWords[project._frequency || settings.notifications.freq])))
            }
        };
        getPerDay();
    }, [current]);
    const deleteProj = async (projKey) => {
        await Storage.deleteProj(projKey, settings.language);
        navigation.navigate(Strings.routes.home); 
    }
    const cancelReminders = () => {
        Reminders.cancelNotification([project._reminders.dueTom]).then(project._reminders.dueTom = null);
        Reminders.cancelNotification(project._reminders.regular).then(project._reminders.dueTom = []);
    }
    const allSUnits = Strings[settings.language].units.concat(settings.userUnits.s)
    const allPUnits = Strings[settings.language].unitPlurals.concat(settings.userUnits.p)
    const deletebtn = AllButtons.delete;
    deletebtn._title = Strings[settings.language].buttons.delete;
    const editbtn = AllButtons.edit;
    editbtn._title = Strings[settings.language].buttons.edit;
    const homebtn = AllButtons.home;
    homebtn._title = Strings[settings.language].buttons.home
    const modalDeleteBtn = AllButtons.delete2;
    modalDeleteBtn._title = Strings[settings.language].buttons.delete;
    const modalCancelBtn = AllButtons.cancel;
    modalCancelBtn._title = Strings[settings.language].buttons.cancel;
    const modalokaybtn = AllButtons.okay;
    modalokaybtn._title = Strings[settings.language].buttons.okay;
    const addbtn = AllButtons.create;
    addbtn._title = Strings[settings.language].buttons.add;
    const updatebtn = AllButtons.set;
    updatebtn._title = Strings[settings.language].buttons.set;
    editbtn.onPress = () => navigation.navigate(Strings.routes.edit, {
        project: project, 
        key: key, 
        knowntitles: knowntitles,
        settings: settings
    });
    homebtn.onPress = () => navigation.navigate(Strings.routes.home);
    modalDeleteBtn.onPress = () => {
        setmodalVisible(false);
        deleteProj(key);
    };
    modalCancelBtn.onPress = () => {
        setmodalVisible(false)
    };
    deletebtn.onPress = () => {
        setModalMessage(Strings[settings.language].alerts.confirmDelete);
        setModalButtons([modalDeleteBtn, modalCancelBtn]);
        setmodalVisible(true);
    };
    modalokaybtn.onPress = () => setmodalVisible(false);
    addbtn.onPress = () => {
        setmodalVisible(false);
        setModalInputs([]);
        let sum = current + updateNum
        if (sum > project._endUnit) {
            setmodalVisible(true);
            setModalButtons([modalokaybtn])
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.currentBig.replace(/\*unit\*/g, allSUnits[project._unitName])))
        }
        else {
            setCurrent(sum);
            project._currentUnit = sum; 
            if (sum === project._endUnit && project._reminders.dueTom) {
                cancelReminders();
            }
            Storage.updateProj(key, project, settings.language);
        }
    };
    updatebtn.onPress = () => {
        setmodalVisible(false);
        setModalInputs([]);
        if (updateNum > project._endUnit) {
            setmodalVisible(true);
            setModalButtons([modalokaybtn])
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.currentBig.replace(/\*unit\*/g, allSUnits[project._unitName])))
        }
        else if (updateNum < project._startUnit) {
            setmodalVisible(true);
            setModalButtons([modalokaybtn])
            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.currentSmall.replace(/\*unit\*/g, allSUnits[project._unitName])))
        }
        else {
            setCurrent(updateNum);
            project._currentUnit = updateNum;
            if (updateNum === project._endUnit && project._reminders.dueTom) {
                cancelReminders();
            }
            Storage.updateProj(key, project, settings.language);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings[settings.language].labels.title + project._title}</Text>
                <Text style={styles.labelText}>{perOrDue}</Text>
                <View style={[styles.row, {justifyContent: 'flex-start', flexWrap: 'wrap'}]}>
                    <Text style={[styles.labelText, {marginBottom: 0} ]}>
                        {Strings.capitalize(Strings[settings.language].labels.currentunit.replace(/\*unit\*/g, allSUnits[project._unitName]) + current)}
                    </Text>
                    {current < project._endUnit && <TouchableHighlight
                        key='updatebtn'
                        style={[styles.defaultsButton, {marginLeft: 20, marginTop: 5}]}
                        onPress={() => {
                            setmodalVisible(true)
                            setModalMessage(Strings.capitalize(Strings[settings.language].alerts.updateCurrent.replace(/\*units\*/g, allPUnits[project._unitName]).replace(/\*unit\*/g, allSUnits[project._unitName])))
                            setModalButtons([modalCancelBtn]);
                            setModalInputs([{
                                label: '',
                                keyboardType: 'number-pad',
                                placeholder: '1',
                                onChange: async text => {
                                    if (text.length) {
                                        await setUpdateNum(parseInt(text));
                                        setModalButtons([modalCancelBtn, updatebtn, addbtn]);
                                    }
                                    else {
                                        await setUpdateNum(0);
                                        setModalButtons([modalCancelBtn]);
                                    }
                                }
                            }])
                        }}
                        >
                        <Text style={styles.buttonText}>
                            {Strings[settings.language].buttons.updateCurrent}
                        </Text>
                    </TouchableHighlight>}
                </View>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.dueDate + Moment(project._dueDate).format(settings.dateFormat)}
                </Text>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.startDate + Moment(project._startDate).format(settings.dateFormat)}
                </Text>
                <Text style={styles.labelText}>
                    {Strings.capitalize(Strings[settings.language].labels.startUnit.replace(/\*unit\*/g, allSUnits[project._unitName]) + project._startUnit)}
                </Text>
                <Text style={styles.labelText}>
                    {Strings.capitalize(Strings[settings.language].labels.endUnit.replace(/\*unit\*/g, allSUnits[project._unitName]) + project._endUnit)}
                </Text>
                <Text style={styles.labelText}>{Strings[settings.language].labels.notification}</Text>
                <View style={[styles.row, {marginBottom: 0}]}>
                    <Text style={[styles.labelText, {paddingLeft: 10}]}>{Strings[settings.language].labels.time + '  ' + (project._time === 'default' ? Strings[settings.language].frequencyWords[0] : project._time)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelText, {paddingLeft: 10}]}>{Strings[settings.language].labels.frequency + '  ' + Strings[settings.language].frequencyWords[project._frequency]}</Text>
                </View>
            </View>
            <ButtonBar buttons={[ deletebtn, editbtn, homebtn ]} />
            <CustModal 
                visible={modalVisible} 
                message={modalMessage} 
                pickers={[]}
                inputs={modalInputs}
                buttons={modalButtons} 
                vertical={true}
                darkmode={settings.darkmode}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
      },
    mainview: {
        flex: 1,
        padding: 10,
    }, 
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingRight: 10,
        marginBottom: 15,
    },
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center',
        marginBottom: 15,
        flexWrap: 'wrap',
        flexShrink: 1,
    }, 
    defaultsButton: {
        backgroundColor: Colors.cancel,
        borderRadius: 20,
        padding: 10,
        elevation: 0
    },
    buttonText: {
        color: Colors.navButtonText,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
    },
});