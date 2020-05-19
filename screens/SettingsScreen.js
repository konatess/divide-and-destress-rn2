import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Storage from '../storage/Async';

export default function SettingsScreen( {route, navigation} ) {
	let {settings} = route.params
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		<OptionButton
			icon="md-contrast"
			label="Dark Mode On/Off"
			onPress={() => console.log(settings.darkmode)}
		/>

		<OptionButton
			icon="md-globe"
			label="Language"
			onPress={() => console.log(settings.language)}
		/>

		<OptionButton
			icon="md-bed"
			label="Day Change"
			onPress={() => console.log(settings.dayChange)}
		/>

		<OptionButton
			icon="md-calendar"
			label="Date Format"
			onPress={() => console.log(settings.dateFormat)}
		/>

		<OptionButton
			icon="md-notifications"
			label="Default Notification Preferences"
			onPress={() => console.log(settings.notifications)}
		/>

		<OptionButton
			icon="md-swap"
			label="Set Default Count to Total or Start/End"
			onPress={() => console.log(settings.total)}
		/>

		<OptionButton
			icon="md-list"
			label="Set Default Unit"
			onPress={() => console.log(settings.unit)}
		/>

		<OptionButton
			icon="ios-pricetags"
			label="Edit Your Tags"
			onPress={() => console.log(settings.tags)}
		/>

		<OptionButton
			icon="md-trash"
			label="Start Fresh - Delete All Projects"
			onPress={() => console.log('clicked Delete All')}
		/>

		<OptionButton
			icon="md-chatbubbles"
			label="Send Us Your Feedback"
			onPress={() => console.log('clicked Feedback')}
			isLastOption
		/>
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
