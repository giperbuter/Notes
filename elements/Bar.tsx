import React, { useRef, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Animated, Keyboard, Pressable } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'
import FinishIcon from './finish-icon.jsx'

// one animation variable (1-0) with interpolation

let Bar = (props) => {
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [isFinishIcon, setIsFinishIcon] = useState(false);
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isCreateBar, setIsCreateBar] = useState(true);
  // const [isChanging, setIsChanging] = useState(false);

  const searchOpacity = useRef(new Animated.Value(1)).current;
  const finishOpacity = useRef(new Animated.Value(0)).current;
  const homeOpacity = useRef(new Animated.Value(0)).current;
  const createBarOpacity = useRef(new Animated.Value(1)).current;
  const changeAnim = useRef(new Animated.Value(1)).current;

  let keyboardShowing = () => {
    Animated.timing(searchOpacity, { toValue: 0, duration: 150, useNativeDriver: true }).start();
    Animated.timing(finishOpacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    setIsFinishIcon(true);
  }
  let keyboardHiding = () => {
    Animated.timing(searchOpacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    Animated.timing(finishOpacity, { toValue: 0, duration: 150, useNativeDriver: true }).start();
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

  let searchPress = () => {
    if (isSearchBar) {
      Animated.timing(changeAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start(() => { setIsSearchBar(false); })
      Animated.parallel([
      Animated.timing(homeOpacity, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(createBarOpacity, { toValue: 1, duration: 200, useNativeDriver: true })], {stopTogether:false}).start();
      setEnableKeyboard(true);
      setIsCreateBar(true);
    } else if (isSearchBar == false) {
      Animated.parallel([
      Animated.timing(changeAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.timing(createBarOpacity, { toValue: 0, duration: 200, useNativeDriver: true })], {stopTogether:false}).start(() => { Animated.timing(homeOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start(); setIsSearchBar(true); setIsCreateBar(false);});
      setEnableKeyboard(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.keyboardView}>
      <Animated.View style={[styles.left, { flexBasis: changeAnim.interpolate({ inputRange: [0, 1], outputRange: ['14%', '85%'] }) }]}>
        <Animated.View style={[styles.leftTextinputContainer, { width: changeAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 305] }) }]}>
          {(isCreateBar) ?
            <Animated.View style={{ opacity: createBarOpacity }}>
              <TextInput placeholder='Tap to create a Note!' style={styles.leftTextinput} editable={enableKeyboard} />
            </Animated.View>
            : null}
            {(isSearchBar) ? 
              <View style={[styles.leftIcon]}>
                <Animated.View style={{ opacity: homeOpacity }}>
                  <PlusIcon />
                </Animated.View>
              </View>
            : null}
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.right, { flexBasis: changeAnim.interpolate({ inputRange: [0, 1], outputRange: ['85%', '14%'] }) }]}>
        <Animated.View style=
          {
            [
              styles.iconContainer,
              {
                borderRadius: changeAnim.interpolate(
                  {
                    inputRange: [0, 1],
                    outputRange: [10, 50]
                  }
                ),
                width: changeAnim.interpolate(
                  {
                    inputRange: [0, 1],
                    outputRange: [305, 40]
                  }
                )
              }
            ]
          }>
          {isSearchIcon ?
            // <Pressable onPress={searchPress}>
            <Animated.View style={[styles.icon, { opacity: searchOpacity }]}>
              <Pressable onPress={searchPress} style={{}}>
                <SearchIcon />
              </Pressable>
            </Animated.View>
            : <></>}
          {isFinishIcon ?
            <Animated.View style={[styles.icon, { opacity: finishOpacity }]}>
              <FinishIcon />
            </Animated.View>
            : <></>}
          {isSearchBar ?
            <Animated.View style={[styles.rightTextinputContainer, { opacity: homeOpacity }]}>
              <TextInput
                placeholder='Tap to Search for a Note!'
                style={styles.rightTextinput}
              />
            </Animated.View>
            : <></>}
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  )
}

module.exports = Bar;

const styles = StyleSheet.create({
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, .7)',
  },
  icon: {
    position: 'absolute',
    width: 40,
    height: 40,
    padding: 3,
    right: 0,
  },
  leftIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    padding: 3,
    right: 0,
    borderRadius: 50,
    zIndex: 7,
  },
  rightTextinputContainer: {
    height: 40,
    width: 250,
    left: 0,
  },
  rightTextinput: {
    height: 40,
    width: 250,
    left: 0,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 17,
    backgroundColor: "#0000",
    borderRadius: 10,
  },
  leftTextinputContainer: {
    height: 40,
    width: '100%',
    backgroundColor: "#ddd",
    borderRadius: 25,
  },
  leftTextinput: {
    height: 40,
    width: '100%',
    left: 0,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 17,
    // backgroundColor: "#ddd",
    // borderRadius: 25,
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
