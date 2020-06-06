import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass';
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
	const [projArr, setProjArr] = React.useState([{ obj: { _title: 'bob'} }])
	const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy']);
	const project2 = new Project('King of Anything', 20200501, 20200520, 4, 90, 6, 'page', false, ['Music', 'Anthem']);
	const [titles, setTitles] = React.useState([]);
	const settingsbtn = AllButtons.settings;
	settingsbtn.onPress = () => navigation.navigate(Strings.routes.settings, {settings: settings});
	const orderbtn = AllButtons.order;
	orderbtn.onPress = () => setModalVisible(true);
	const createbtn = AllButtons.create;
	createbtn.onPress = () => navigation.navigate(Strings.routes.create, {knowntitles: titles, settings: settings});
	const modalDonebtn = AllButtons.done;
	modalDonebtn.onPress = () => setModalVisible(false);
	React.useEffect(() => {
		async function projFromStorage() {
			let storedProjArr = await Storage.getAllProj();
			if (storedProjArr) {
				setProjArr(storedProjArr);
				setTitles(storedProjArr.map((item) => {
					return item.obj._title
				}))
			}
		}
		projFromStorage();
	}, []);
	return (
		<View style={styles.container}>
		<FlatList 
			data={projArr}
			renderItem={({ item }) => <ProjectButton
				key={item.key}
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
			message={"I am Groot! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
			buttons={[ modalDonebtn ]}
			>
		</CustModal>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

function ProjectButton({ title, due, onPress, settings }) {
	return (
		<RectButton style={ styles.project } onPress={onPress}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={styles.projectLabelTextContainer} accessible>
				<Text style={styles.labelText}>{title}</Text>
				</View>
				<View style={styles.projectDueTextContainer} accessible>
				<Text style={styles.dueText}>{Moment(due).format(settings.dateFormat)}</Text>
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
		padding: 10,
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
