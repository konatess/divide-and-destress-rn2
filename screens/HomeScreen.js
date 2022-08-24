import * as React from 'react';
import { SafeAreaView, Text, View, FlatList, StatusBar } from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import { Ionicons } from '@expo/vector-icons';
import {containers, buttonStyles, textStyles, rows, iconSizes} from "../constants/Styles";
import AllButtons from '../constants/ButtonClass';
import CustModal from '../components/Modal';
import Moment from 'moment';
import Storage from '../storage/Async';


export default function HomeScreen({ route, navigation }) {
	const { settings } = route.params;
	const [modalVisible, setModalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
	const [modalPickers, setModalPickers] = React.useState([]);
	const [modalButtons, setModalButtons] = React.useState([])
	const [projArr, setProjArr] = React.useState([])
	const [titles, setTitles] = React.useState([]);
	const [compVisible, setCompVisible] = React.useState(false);
	const settingsbtn = AllButtons.settings;
	settingsbtn._title = Strings[settings.language].buttons.settings
	settingsbtn.onPress = () => navigation.navigate(Strings.routes.settings, {settings: settings, knowntitles: titles, projects: projArr});
	const orderbtn = AllButtons.order;
	orderbtn._title = Strings[settings.language].buttons.order;
	orderbtn.onPress = () => {
		setModalVisible(true);
		setModalMessage(Strings[settings.language].alerts.order);
		setModalPickers([modalOrders])
		setModalButtons([ compVisible ? modalHideCompbtn : modalShowCompbtn, modalCancelbtn ])
	};
	const createbtn = AllButtons.create;
	createbtn._title = Strings[settings.language].buttons.create;
	createbtn.onPress = () => navigation.navigate(Strings.routes.create, {knowntitles: titles, settings: settings});
	const modalCancelbtn = AllButtons.cancel2;
	modalCancelbtn._title = Strings[settings.language].buttons.cancel;
	modalCancelbtn.onPress = () => setModalVisible(false);
	const infoPress = () => {
		setModalVisible(true);
		setModalMessage(Strings[settings.language].alerts.info);
		setModalPickers([])
		setModalButtons([modalCancelbtn])
	};
	const modalHideCompbtn = AllButtons.hideComp;
	modalHideCompbtn._title = Strings[settings.language].buttons.hideComp;
	modalHideCompbtn.onPress = () => {
		setProjArr(projArr.filter(proj => {
			return proj.obj._endUnit - proj.obj._currentUnit > 0
		}))
		setCompVisible(false);
		setModalVisible(false);
	}
	const modalShowCompbtn = AllButtons.showComp;
	modalShowCompbtn._title = Strings[settings.language].buttons.showComp;
	modalShowCompbtn.onPress = async () => {
		let storedProjArr = await Storage.getAllProj(settings.language);
		if (storedProjArr) {
			setProjArr(storedProjArr);
			setTitles(storedProjArr.map((item) => {
				return item.obj._title
			}))
		}
		setCompVisible(true);
		setModalVisible(false);
	}
	const modalOrders = Strings[settings.language].orders.map((string, index) => {
		return ({_title: string, onPress: () => {
			setModalVisible(false);
			let key = Strings.orderKeys[index]
				setProjArr(projArr.sort((a, b) => a.obj[key].localeCompare(b.obj[key])));
		}})
	});
	const allSUnits = Strings[settings.language].units.concat(settings.userUnits.s)
    const allPUnits = Strings[settings.language].unitPlurals.concat(settings.userUnits.p)
	const getPerDay = (current, end, due, freq, unit) => {
		// units remaining
		let units = parseInt(end) - parseInt(current);
		// days remaining
		let days = Moment().diff(due, 'days')*-1
		if (units === 0) {
			return Strings[settings.language].labels.complete;
		}
		else if (days === 0) {
			return Strings[settings.language].labels.dueToday;
		} else if (days < 0) {
			return Strings[settings.language].labels.overDue;
		} else {
			// days/frequency or default frequency
			let periods = days/(freq || settings.notifications.freq);
			// number per day
			let number = (units/periods).toFixed(1);
			// singular vs plural
			let unitLabel = (number === 1) ? allSUnits : allPUnits;
			// units remaining/freq periods remaining
			return Strings.capitalize(Strings[settings.language].labels.perDay.replace(/\*unit\*/g, unitLabel[unit])
			.replace(/\*num\*/g, number)
			.replace(/\*freq\*/g, Strings[settings.language].frequencyWords[freq || settings.notifications.freq]));
		}
	};
	React.useEffect(() => {
		const projFromStorage = async () => {
			let storedProjArr = await Storage.getAllProj(settings.language);
			if (storedProjArr) {
				setProjArr(storedProjArr.filter(proj => {
					return proj.obj._endUnit - proj.obj._currentUnit > 0
				}));
				setCompVisible(false);
				setTitles(storedProjArr.map((item) => {
					return item.obj._title
				}))
			}
		};
		projFromStorage();
		const refreshData = navigation.addListener('focus', () => {
			projFromStorage();
		});
		return refreshData;
	}, [navigation])
	return (
		<SafeAreaView style={[containers.safeArea, {backgroundColor: settings.darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
			<StatusBar 
				barStyle={settings.darkmode ? "light-content" : "dark-content"} 
				backgroundColor={settings.darkmode ? Colors.darkmode.background : Colors.mainbackground} 
			/>
			{!projArr.length && <Text style={[textStyles.projectTitleText, {padding: 20}]}>
				{Strings[settings.language].placeholder.noProj}
			</Text>}
			<FlatList 
				data={projArr}
				renderItem={({ item }) => <ProjectButton
					passKey={item.key}
					title={item.obj._title} 
					due={item.obj._dueDate}
					perfreqstring={getPerDay(item.obj._currentUnit, item.obj._endUnit, item.obj._dueDate, item.obj._frequency, item.obj._unitName)}
					settings={settings}
					onPress={() => navigation.navigate(Strings.routes.display, {
						project: item.obj, 
						key: item.key, 
						knowntitles: titles,
						settings: settings
					})}
				></ProjectButton>}
			/>
			<BorderlessButton key='information' style={buttonStyles.fab} onPress={infoPress}>
				<Ionicons name="information-circle-outline" size={iconSizes.fabIconSize} color={Colors.settings} />
			</BorderlessButton>
			<ButtonBar buttons={[settingsbtn, orderbtn, createbtn]} />
			<CustModal 
				visible={modalVisible} 
				message={modalMessage}
				pickers={modalPickers}
				inputs={[]}
				buttons={modalButtons}
				showDate={false}
				vertical={true}
				darkmode={settings.darkmode}
			/>
		</SafeAreaView>
	);
}

function ProjectButton({ passKey, title, due, perfreqstring, onPress, settings }) {
	return (
		<RectButton key={passKey} style={ buttonStyles.projectBtnArea } onPress={onPress}>
			<View style={[rows.row2, { marginBottom: 0 }]}>
				<View style={buttonStyles.projectTitleArea} accessible>
					<Text style={[textStyles.projectTitleText, {color: settings.darkmode ? Colors.darkmode.text : Colors.maintext}]}>{title}</Text>
				</View>
				<View style={buttonStyles.projectDueArea} accessible>
					<Text style={[textStyles.projectDueText, {color: settings.darkmode ? Colors.darkmode.text : Colors.maintext}]}>
						{Moment(due).format(settings.dateFormat)}
					</Text>
				</View>
			</View>
			<View>
				<Text style={[textStyles.projectDueText, {color: settings.darkmode ? Colors.darkmode.text : Colors.maintext}]}>
					{perfreqstring}
				</Text>
			</View>
		</RectButton>
	);
};
