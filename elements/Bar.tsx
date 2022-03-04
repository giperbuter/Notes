import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';

let createFocus = () => {
  console.log("focus")
}

let Create = (props) => {
  return (
    <View>
      <TextInput
        style={styles.create}
        placeholder='Tap to create a note!'
        onFocus={createFocus}
      />
    </View>
  )
}

let Find = (props) => {
  return (
    <View>

    </View>
  )
}

let Bar = (props) => {
  return (
    <View style={styles.bar}>
      <Create />
    </View>
  )
}

module.exports = Bar;

const styles = StyleSheet.create({
  create: {
    
  },
  bar: {
    position: 'absolute',
    height: 40,
    left: 17,
    bottom: 30,
    width: 290,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    fontSize: 17,
    backgroundColor: "#ddd",
    borderRadius: 25,
  }
});
