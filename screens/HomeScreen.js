import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import AllButtons from '../constants/ButtonClass.js';
import Moment from 'moment';
import Storage from '../storage/Async';


export default function HomeScreen({ navigation }) {
	let settingsobj;
	const fetchSettings = async () => {
		return await Storage.getSettings().then(results => {
			console.log(results)
			settingsobj = results;
		});
	};
	fetchSettings();
	const button1 = AllButtons.settings;
	const button2 = AllButtons.order;
	const button3 = AllButtons.create;
	button1.onPress = () => navigation.navigate(Strings.routes.settings, {settingsobj: settingsobj});
	// button2.onPress = () => navigation.navigate(Strings.routes.order);
	button3.onPress = () => navigation.navigate(Strings.routes.create);
	const project1 = new Project('Title of the Song', 20200501, 20200525, 1, 90, 1, 'page', false, ['Music', 'Comedy'], {'freq':'daily', 'time':'8pm'});
	const project2 = new Project('King of Anything', 20200501, 20200520, 4, 90, 6, 'page', false, ['Music', 'Anthem'], {'freq':'daily', 'time':'8pm'});
	return (
		<View style={styles.container}>
		<FlatList 
			data={[
				{ key: project1._title, age: project1._dueDate },
				{ key: project2._title, age: project2._dueDate },
				{ key: 'Dominic', age: 6 },
				{ key: 'Jackson', age: 5 },
				{ key: 'James', age: 7 },
				{ key: 'Joel', age: 5 },
				{ key: 'John', age: 5 },
				{ key: 'Jillian', age: 5 },
				{ key: 'Jimmy', age: 5 },
				{ key: 'Julie', age: 5 },
				{ key: 'Bonsai', age: 7 },
				{ key: 'Moony', age: 6 }
			]}
			renderItem={({ item }) => <ProjectButton
				label={item.key} 
				due={item.age}
				onPress={() => navigation.navigate(Strings.routes.display)}
			></ProjectButton>}
		/>
		<ButtonBar 
			// navigation={navigation}
			b1= {button1}
			b2= {button2}
			b3= {button3}
		/>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

function ProjectButton({ label, due, onPress, isLastOption }) {
	return (
		<RectButton style={[styles.project, isLastOption && styles.lastOption]} onPress={onPress}>
		<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			<View style={styles.projectLabelTextContainer} accessible>
			<Text style={styles.labelText}>{label}</Text>
			</View>
			<View style={styles.projectDueTextContainer} accessible>
			<Text style={styles.dueText}>{due}</Text>
			</View>
		</View>
		</RectButton>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.mainbackground,
	},
	project: {
		padding: 10,
		backgroundColor: 'pink',
	},
	projectLabelTextContainer: {
		flexShrink: 1,
		backgroundColor: 'green',
		paddingRight: 10,
	},
	labelText: {
		fontSize: 22,
		backgroundColor: 'white',
	},
	projectDueTextContainer: {
		backgroundColor: 'blue',
		paddingLeft: 5,
		justifyContent: 'center',
	},
	dueText: {
		fontSize: 18,
		backgroundColor: 'white',
	},
});
