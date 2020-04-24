import * as React from 'react';

import { StyleSheet, View } from 'react-native';

export default function ButtonBar({ navigation, route}) {
    return <View style={ styles.container }>
        {/* <Text>Buttons Here</Text> */}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 45,
        backgroundColor: '#fff',
        padding: 0,
    },
});