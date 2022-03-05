import React, { useRef } from 'react'
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Keyboard, Animated } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'

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

let Search = (props) => {
  const searchOpacityAnim = useRef(new Animated.Value(1)).current;
  const plusOpacityAnim = useRef(new Animated.Value(0)).current;

  let keyboardUp = () => {
    Animated.timing(searchOpacityAnim, {toValue: 0, duration: 200, useNativeDriver: true}).start();
    Animated.timing(plusOpacityAnim, {toValue: 1, duration: 200, useNativeDriver: true}).start();
  }

  let keyboardDown = () => {
    Animated.timing(searchOpacityAnim, {toValue: 1, duration: 200, useNativeDriver: true}).start();
    Animated.timing(plusOpacityAnim, {toValue: 0, duration: 200, useNativeDriver: true}).start();
  }

  Keyboard.addListener('keyboardWillShow', keyboardUp)
  Keyboard.addListener('keyboardWillHide', keyboardDown)

  return (
    <View style={styles.search}>
      <Animated.View style={[styles.searchIcon, {opacity: searchOpacityAnim}]}>
        <SearchIcon />
      </Animated.View>
      <Animated.View style={[styles.searchIcon, {opacity: plusOpacityAnim}]}>
        <PlusIcon />
      </Animated.View>
    </View>
  )
}

let Bar = (props) => {
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.keyboard}>
      <View style={styles.container}>
        <Create />
        <Search />
      </View>
    </KeyboardAvoidingView>
  )
}

module.exports = Bar;

const styles = StyleSheet.create({
  search: {
    flexBasis: '10%'
  },
  searchIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    width: 40,
    height: 40,
    marginLeft: 8,
    padding: 5,
    borderRadius: 50,
  },
  create: {
    height: 40,
    width: 290,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 17,
    backgroundColor: "#ddd",
    borderRadius: 25,
    flexBasis: '83%',
  },
  keyboard: {
    position: 'absolute',
    left: 10,
    bottom: 25,
    zIndex: 3,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
