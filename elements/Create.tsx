import React, { useRef } from 'react'
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Keyboard, Animated } from 'react-native';

let createFocus = () => {

}

let Create = (props) => {
  return (
    <TextInput
      placeholder='Tap to create a note!'
      style={styles.create}
      onFocus={createFocus}
    />
  )
}

module.exports = Create;

const styles = StyleSheet.create({
  create: {
    height: 40,
    width: 290,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 17,
    backgroundColor: "#ddd",
    borderRadius: 25,
    flexBasis: '83%',
  }
})