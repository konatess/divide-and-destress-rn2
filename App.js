import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useLinking from './navigation/useLinking';
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen';
import DisplayScreen from './screens/DisplayScreen';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import Strings from './constants/Strings';
import Notify from './components/Notify';
import Storage from './storage/Async';

const Stack = createStackNavigator();

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const [initialNavigationState, setInitialNavigationState] = React.useState();
	const [settingsObj, fetchSettingsObj] = React.useState();
	const containerRef = React.useRef();
	const { getInitialState } = useLinking(containerRef);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
		try {
			SplashScreen.preventAutoHide();

			// Load our initial navigation state
			setInitialNavigationState(await getInitialState());
			fetchSettingsObj(await Storage.getSettings('English'));

			// Load fonts
			await Font.loadAsync({
			...Ionicons.font,
			'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
			});
		} catch (e) {
			// We might want to provide this error information to an error reporting service
			Notify.showError('English', e);
		} finally {
			setLoadingComplete(true);
			SplashScreen.hide();
		}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
		<View style={styles.container}>
			{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
			<NavigationContainer ref={containerRef} initialState={initialNavigationState}>
				<Stack.Navigator 
					initialRouteName={Strings.routes.home}
					headerMode={'none'}
				>
					<Stack.Screen name={Strings.routes.home} 
						component={HomeScreen}
						initialParams={{settings: settingsObj}} 
					/>
					<Stack.Screen name={Strings.routes.settings} component={SettingsScreen} />
					<Stack.Screen name={Strings.routes.create} component={CreateScreen} />
					<Stack.Screen name={Strings.routes.display} component={DisplayScreen} />
					<Stack.Screen name={Strings.routes.edit} component={EditScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
});
