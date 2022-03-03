import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Greet = (props) => {
  const [dark, setDark] = useState(false)
  return (
    <View>
      <Text style={dark ? styles.darkText : styles.lightText}>Hi! my name is {props.name}!</Text>
      <Button
        onPress={() => {
          setDark(true);
        }}
        title="set to dark"
      />
      <Button
        onPress={() => {
          setDark(false);
        }}
        title="set to light"
      />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Greet name=""/>
      <Greet name="vanussy"/>
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
  lightText: {
    textAlign: 'center',
    color: 'grey'
  },
  darkText: {
    textAlign: 'center',
    color: 'black'
  }
});
