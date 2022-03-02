import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Greet = (props) => {
  return (
    <View>
      <Text>Hi! my name is {props.name}!</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Greet name="Yotam"/>
      <Greet name="Noam"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
