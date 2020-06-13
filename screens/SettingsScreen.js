import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AllButtons from '../constants/ButtonClass.js';
import Storage from '../storage/Async';

export default function SettingsScreen( {route, navigation} ) {
	const {settings} = route.params
	const buttons = AllButtons.settingsList
	buttons.darkMode.onPress = () => console.log(settings.darkmode);
	buttons.language.onPress = () => console.log(settings.language);
	buttons.dayChange.onPress = () => console.log(settings.dayChange);
	buttons.dateFormat.onPress = () => console.log(settings.dateFormat);
	buttons.notifications.onPress = () => console.log(settings.notifications);
	buttons.startVsTotal.onPress = () => console.log(settings.total);
	buttons.unit.onPress = () => console.log(settings.unit);
	buttons.tags.onPress = () => console.log(settings.tags);
	buttons.deleteAll.onPress = () => console.log('clicked Delete All');
	buttons.feedback.onPress = () => console.log('clicked Feedback');
	const buttonsArr = [
		buttons.darkMode,
		// buttons.language,
        buttons.dayChange,
        buttons.dateFormat,
        buttons.notifications,
        buttons.startVsTotal,
        buttons.unit,
        buttons.tags,
        buttons.deleteAll,
        buttons.feedback,
	]
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		{buttonsArr.map((unit, index) => {
                return (
					<OptionButton
						key={index}
						icon={unit._iconName}
						label={unit._title}
						onPress={unit.onPress}
						isLastOption={index === buttonsArr.length - 1}
				/>)
		})}
		</ScrollView>
	);
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
