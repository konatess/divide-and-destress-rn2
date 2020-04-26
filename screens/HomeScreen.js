import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Project } from '../constants/ProjectClass.js';
import ButtonBar from '../components/ButtonBar'
import Colors from '../constants/Colors'
import { ButtonObj } from '../constants/ButtonClass.js';

// const button1 = {
//   'title': 'Home',
//   'color': Colors.home,
//   'iconName': 'md-home', 
//   'onPress': null
// };
// const button1 = new ButtonObj('Settings', 'Settings', Colors.settings, 'md-settings')
// const button2 = new ButtonObj('Home', 'Home', Colors.home, 'md-home');
// const button3 = new ButtonObj('Display', 'Create', Colors.create, 'md-add');

export default function HomeScreen({ navigation }) {
  const button1 = new ButtonObj(navigation, 'Settings', 'Settings', Colors.settings, 'md-settings')
  const button2 = new ButtonObj(navigation, 'Home', 'Home', Colors.home, 'md-home');
  const button3 = new ButtonObj(navigation, 'Display', 'Create', Colors.create, 'md-add');
  return (
    <View style={styles.container}>
      <FlatList 
        data={[
            { key: 'Devin', age: 5238 },
            { key: 'Dan with a really long name that is so long it has to wrap', age: 423419384731 },
            { key: 'Dominic', age: 6 },
            { key: 'Jackson', age: 5 },
            { key: 'James', age: 7 },
            { key: 'Joel', age: 5 },
            { key: 'John', age: 5 },
            { key: 'Jillian', age: 5 },
            { key: 'Jimmy', age: 5 },
            { key: 'Julie', age: 5 }
          ]}
          renderItem={({ item }) => <ProjectButton
            label={item.key} 
            due={item.age}
          ></ProjectButton>}
      />
      <ButtonBar 
        navigation={navigation}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
