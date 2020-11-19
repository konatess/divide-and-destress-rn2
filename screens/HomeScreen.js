import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass';
import CustModal from '../components/Modal';
import Moment from 'moment';
import Storage from '../storage/Async';


export default function HomeScreen({ route, navigation }) {
	const { settings } = route.params;
	const [modalVisible, setModalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState();
	const [modalPickers, setModalPickers] = React.useState([]);
	const [projArr, setProjArr] = React.useState([])
	const [titles, setTitles] = React.useState([]);
	const settingsbtn = AllButtons.settings;
	settingsbtn._title = Strings[settings.language].buttons.settings
	settingsbtn.onPress = () => navigation.navigate(Strings.routes.settings, {settings: settings, knowntitles: titles, projects: projArr});
	const orderbtn = AllButtons.order;
	orderbtn._title = Strings[settings.language].buttons.order;
	orderbtn.onPress = () => {
		setModalVisible(true);
		setModalMessage(Strings[settings.language].alerts.order);
		setModalPickers([modalOrders])
	};
	const createbtn = AllButtons.create;
	createbtn._title = Strings[settings.language].buttons.create;
	createbtn.onPress = () => navigation.navigate(Strings.routes.create, {knowntitles: titles, settings: settings});
	const modalCancelbtn = AllButtons.cancel2;
	modalCancelbtn._title = Strings[settings.language].buttons.cancel;
	modalCancelbtn.onPress = () => setModalVisible(false);
	const modalOrders = Strings[settings.language].orders.map((string, index) => {
		return ({_title: string, onPress: () => {
			setModalVisible(false);
			let key = Strings.orderKeys[index]
			setProjArr(projArr.sort((a, b) => a.obj[key].localeCompare(b.obj[key])));
		}})
	})
	React.useEffect(() => {
		const projFromStorage = async () => {
			let storedProjArr = await Storage.getAllProj(settings.language);
			if (storedProjArr) {
				setProjArr(storedProjArr);
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
		<SafeAreaView style={[styles.container, {backgroundColor: settings.darkmode ? Colors.darkmode.background : Colors.mainbackground}]}>
			<StatusBar 
				barStyle={settings.darkmode ? "light-content" : "dark-content"} 
				backgroundColor={settings.darkmode ? Colors.darkmode.background : Colors.mainbackground} 
			/>
			{!projArr.length && <Text style={[styles.labelText, {padding: 20}]}>
				{Strings[settings.language].placeholder.noProj}
			</Text>}
			<FlatList 
				data={projArr}
				renderItem={({ item }) => <ProjectButton
					passKey={item.key}
					title={item.obj._title} 
					due={item.obj._dueDate}
					settings={settings}
					onPress={() => navigation.navigate(Strings.routes.display, {
						project: item.obj, 
						key: item.key, 
						knowntitles: titles,
						settings: settings
					})}
				></ProjectButton>}
			/>
			<ButtonBar buttons={[settingsbtn, orderbtn, createbtn]} />
			<CustModal 
				visible={modalVisible} 
				message={modalMessage}
				pickers={modalPickers}
				inputs={[]}
				buttons={[ modalCancelbtn ]}
				vertical={false}
				darkmode={settings.darkmode}
				>
			</CustModal>
		</SafeAreaView>
	);
}

function ProjectButton({ passKey, title, due, onPress, settings }) {
	return (
		<RectButton key={passKey} style={ styles.project } onPress={onPress}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={styles.projectLabelTextContainer} accessible>
				<Text style={[styles.labelText, {color: settings.darkmode ? Colors.darkmode.text : Colors.maintext}]}>{title}</Text>
				</View>
				<View style={styles.projectDueTextContainer} accessible>
				<Text style={[styles.dueText, {color: settings.darkmode ? Colors.darkmode.text : Colors.maintext}]}>{Moment(due).format(settings.dateFormat)}</Text>
				</View>
			</View>
		</RectButton>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	project: {
		padding: 15,
	},
	projectLabelTextContainer: {
		flexShrink: 1,
		paddingRight: 10,
	},
	labelText: {
		fontSize: 22,
	},
	projectDueTextContainer: {
		paddingLeft: 5,
		justifyContent: 'center',
	},
	dueText: {
		fontSize: 18,
	},
});
