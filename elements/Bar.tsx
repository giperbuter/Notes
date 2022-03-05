import React, { useRef, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Animated, Keyboard } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'
import FinishIcon from './finish-icon.jsx'

let Bar = (props) => {
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [isFinishIcon, setIsFinishIcon] = useState(false);

  const SearchOpacity = useRef(new Animated.Value(1)).current;
  const FinishOpacity = useRef(new Animated.Value(0)).current;

  let keyboardShowing = () => {
    Animated.timing(SearchOpacity, {toValue: 0, duration: 150, useNativeDriver: true}).start();
    Animated.timing(FinishOpacity, {toValue: 1, duration: 150, useNativeDriver: true}).start();
    setIsFinishIcon(true);
  }
  let keyboardHiding = () => {
    Animated.timing(SearchOpacity, {toValue: 1, duration: 150, useNativeDriver: true}).start();
    Animated.timing(FinishOpacity, {toValue: 0, duration: 150, useNativeDriver: true}).start();
    setIsSearchIcon(true);
  }
  let keyboardShowed = () => {
    setIsSearchIcon(false);
  }
  let keyboardHid = () => {
    setIsFinishIcon(false);
  }
  Keyboard.addListener('keyboardWillShow', keyboardShowing);
  Keyboard.addListener('keyboardWillHide', keyboardHiding);
  Keyboard.addListener('keyboardDidShow', keyboardShowed);
  Keyboard.addListener('keyboardDidHide', keyboardHid);

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.keyboardView}>
      <View style={styles.left}>
        <TextInput
          placeholder='Tap to create a Note!'
          style={styles.leftTextinput}
        />
      </View>
      <View style={styles.right}>
        <View style={styles.iconContainer}>
          {isSearchIcon ? <Animated.View style={[styles.icon, {opacity: SearchOpacity}]}><SearchIcon /></Animated.View> : <></>}
          {isFinishIcon ? <Animated.View style={[styles.icon, {opacity: FinishOpacity}]}><FinishIcon /></Animated.View> : <></>}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

module.exports = Bar;

const styles = StyleSheet.create({
  right: {
    flexBasis: '15%',
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {
    flexBasis: '85%',
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, .7)',
  },
  icon : {
    position: 'absolute',
    width: 40,
    height: 40,
    padding: 3,
  },
  leftTextinput: {
    height: 40,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 17,
    backgroundColor: "#ddd",
    borderRadius: 25,
  },
  keyboardView: {
    position: 'absolute',
    left: 0,
    bottom: 30,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: '4%',
  },
});
