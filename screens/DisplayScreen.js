import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import CustModal from '../components/Modal';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';
import Moment from 'moment';

export default function DisplayScreen({ route, navigation }) {
    const { knowntitles } = route.params;
    const { settings } = route.params;
    const { project } = route.params;
    const { key } = route.params;
    const [perOrDue, setPerOrDue] = React.useState('Loading...');
    // modal
    const [modalVisible, setmodalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
    const [modalButtons, setModalButtons] = React.useState([]);
    React.useEffect(() => {
        const getPerDay = () => {
            // units remaining
            let units = project._endUnit - project._currentUnit;
            // days remaining
            let days = Moment().diff(project._dueDate, 'days')*-1
            if (days === 0) {
                return setPerOrDue(Strings[settings.language].labels.dueToday)
            } else if (days < 0) {
                return setPerOrDue(Strings[settings.language].labels.overDue)
            } else {
                // days/frequency or default frequency
                let periods = days/(project._frequency || settings.notifications.freq);
                // number per day
                let number = (units/periods).toFixed(1);
                // singular vs plural
                let unitLabel = (number === 1) ? "units" : "unitPlurals";
                // units remaining/freq periods remaining
                return setPerOrDue(Strings[settings.language].labels.perDay.replace(/unit/g, Strings[settings.language][unitLabel][project._unitName])
                .replace(/num/g, number)
                .replace(/freq/g, Strings[settings.language].frequencyWords[project._frequency || settings.notifications.freq]))
            }
        };
        getPerDay();
    }, []);
    const deleteProj = async (projKey) => {
        await Storage.deleteProj(projKey);
        navigation.navigate(Strings.routes.home); 
    }
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
    return (
        <View style={styles.container}>
            <View style={styles.mainview}>
                <Text style={styles.labelText}>{Strings[settings.language].labels.title + project._title}</Text>
                <Text style={styles.labelText}>{perOrDue}</Text>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.currentUnit.replace(/unit/g, Strings[settings.language].units[project._unitName]) + project._currentUnit}
                </Text>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.dueDate + Moment(project._dueDate).format(settings.dateFormat)}
                </Text>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.startDate + Moment(project._startDate).format(settings.dateFormat)}
                </Text>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.startUnit.replace(/unit/g, Strings[settings.language].units[project._unitName]) + project._startUnit}
                </Text>
                <Text style={styles.labelText}>
                    {Strings[settings.language].labels.endUnit.replace(/unit/g, Strings[settings.language].units[project._unitName]) + project._endUnit}
                </Text>
                <Text style={styles.labelText}>{Strings[settings.language].labels.notification}</Text>
                <View style={styles.row}>
                    <Text style={styles.labelText}>{Strings[settings.language].labels.time + '  ' + project._time}</Text>
                    <Text style={[styles.labelText, {paddingLeft: 5}]}>{Strings[settings.language].labels.frequency + '  ' + Strings[settings.language].frequencyWords[project._frequency]}</Text>
                </View>
            </View>
            <ButtonBar buttons={[ deletebtn, editbtn, homebtn ]} />
            <CustModal 
            visible={modalVisible} 
            message={modalMessage} 
            buttons={modalButtons} 
			darkmode={settings.darkmode}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
      },
    mainview: {
        flex: 1,
        padding: 10,
    }, 
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingRight: 10
    },
    labelText: {
        fontSize: 20,
        paddingRight: 5,
        textAlignVertical: 'center',
        marginBottom: 15
    }, 
});