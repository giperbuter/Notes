import React, { useRef } from 'react'
import { StyleSheet, View, Keyboard, Animated, Button } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'


let Icon = (props) => {
  const searchOpacityAnim = useRef(new Animated.Value(1)).current;
  const plusOpacityAnim = useRef(new Animated.Value(0)).current;

  let keyboardUp = () => {
    Animated.timing(searchOpacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    Animated.timing(plusOpacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  }

  let keyboardDown = () => {
    Animated.timing(searchOpacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    Animated.timing(plusOpacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  }

  let onpress = () => {
    console.log("press!")
  }

  Keyboard.addListener('keyboardWillShow', keyboardUp)
  Keyboard.addListener('keyboardWillHide', keyboardDown)

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.icon, { opacity: searchOpacityAnim }]}>
        <SearchIcon />
      </Animated.View>
      <Animated.View style={[styles.icon, { opacity: plusOpacityAnim }]}>
        <PlusIcon />
      </Animated.View>
    </View>
  )
}
module.exports = Icon;

const styles = StyleSheet.create({
  container: {
    flexBasis: '10%'
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    width: 40,
    height: 40,
    marginLeft: 8,
    padding: 5,
    borderRadius: 50,
  }
});