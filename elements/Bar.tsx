import React, { useRef, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Animated, Keyboard, Pressable } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'
import FinishIcon from './finish-icon.jsx'

let Bar = (props) => {
  const [isSearchIcon, setIsSearchIcon] = useState(true);
  const [isFinishIcon, setIsFinishIcon] = useState(false);
  const [isAddIcon, setIsAddIcon] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isCreateBar, setIsCreateBar] = useState(true);
  const [pressable, setPressable] = useState(true);
  const [keyboardUp, setKeyboardUp] = useState(false);

  const searchOpacity = useRef(new Animated.Value(1)).current;
  const finishOpacity = useRef(new Animated.Value(0)).current;
  const addOpacity = useRef(new Animated.Value(0)).current;
  const createBarOpacity = useRef(new Animated.Value(1)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const changeTextinput = useRef(new Animated.Value(1)).current;
  const leftOpacity = useRef(new Animated.Value(1)).current;

  let changeBar = () => {
    if (!pressable) return;

    if (!isSearchBar) { // when SEARCH bar pops up
      setPressable(false);

      Animated.parallel([
        Animated.timing(changeTextinput, { toValue: 0, duration: 250, useNativeDriver: false }),
        Animated.timing(createBarOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      ], { stopTogether: false })
        .start(() => {
          Animated.timing(addOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
          Animated.timing(searchBarOpacity, { toValue: 1, duration: 200, useNativeDriver: false }).start();
          setIsAddIcon(true);
          setIsCreateBar(false);
          setIsSearchBar(true);
          setPressable(true);
        });

    } else { // when CREATE bar pops up
      setPressable(false);

      Animated.timing(changeTextinput, { toValue: 1, duration: 250, useNativeDriver: false }).start()
      Animated.parallel([
        Animated.timing(addOpacity, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.timing(searchBarOpacity, { toValue: 0, duration: 100, useNativeDriver: false }),
        Animated.timing(createBarOpacity, { toValue: 1, duration: 250, useNativeDriver: true })
      ], { stopTogether: false })
        .start(() => {
          setIsAddIcon(false);
          setIsSearchBar(false);
          setPressable(true);
        });
      setIsCreateBar(true);
    }
  }

  let searchUp = () => {
    setKeyboardUp(true);
    Animated.parallel([
      Animated.timing(addOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(leftOpacity, { toValue: 0, duration: 150, useNativeDriver: false }),
      Animated.timing(changeTextinput, { toValue: -0.2, duration: 250, useNativeDriver: false })
    ], { stopTogether: false }).start();
  }

  let searchDown = () => {
    setKeyboardUp(false);
    Animated.timing(changeTextinput, { toValue: 0, duration: 150, useNativeDriver: false }).start(() => {
      Animated.timing(addOpacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
      Animated.timing(leftOpacity, { toValue: 1, duration: 150, useNativeDriver: false }).start();
    });
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={20}
      style={styles.keyboardView} >

      {/* Left side - CREATE */}
      <Animated.View
        style={[
          styles.leftSide,
          // WIDTH of create textinput / icon
          {
            flexBasis: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: ['14%', '85%'] }),
            opacity: leftOpacity,
          }
        ]}
      >

        {/* background */}
        <Animated.View
          style={[
            styles.createContainer,
            // WIDTH of textinput's background
            { width: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [40, 305] }) }]}>

          {/* the text input bar */}
          {(isCreateBar) ?

            <Animated.View
              style={{ opacity: createBarOpacity }}>

              <TextInput
                placeholder={(keyboardUp) ? 'title' : 'Tap to create a Note!'}
                style={styles.createBar} />

            </Animated.View>

            : null}

          {/* add icon */}
          {(isAddIcon) ?

            <View
              style={[styles.leftIcon]}>

              <Animated.View
                style={{ opacity: addOpacity }}>

                <Pressable
                  onPress={changeBar}>

                  <PlusIcon />

                </Pressable>

              </Animated.View>

            </View>

            : null}

        </Animated.View>

      </Animated.View>

      {/* Right side - SEARCH */}
      <Animated.View
        style={[
          styles.rightSide,
          // WIDTH of search textinput / icon
          { flexBasis: (changeTextinput.interpolate({ inputRange: [0, 1], outputRange: ['85%', '14%'] })) }]}>

        {/* background */}
        <Animated.View 
          style={[
            styles.rightIconContainer, {
            // Round Corners of icon
            borderRadius: (keyboardUp) ? 10 : changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [10, 50] }),
            // Width of icon's background
            width: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [305, 40] })
          }]}>

          {/* search icon */}
          {isSearchIcon ?

            <Animated.View
              style={[
                styles.rightIcon,
                { opacity: searchOpacity }]}>

              <Pressable
                onPress={changeBar}>

                <SearchIcon />

              </Pressable>

            </Animated.View>

            : null}

          {/* finish icon */}
          {isFinishIcon ?

            <Animated.View style={[
              styles.rightIcon,
              { opacity: finishOpacity }]}>

              <FinishIcon />

            </Animated.View>

            : null}

          {/* text input bar */}
          {isSearchBar ?

            <Animated.View
              style={[
                styles.searchContainer,
                { opacity: searchBarOpacity,
                  width: changeTextinput.interpolate({ inputRange: [-0.2, 0], outputRange: [320, 250] }) }]}>

              <TextInput
                placeholder='Tap to Search for a Note!'
                style={styles.searchBar}
                returnKeyType='search'
                onFocus={searchUp}
                onEndEditing={searchDown} />

            </Animated.View>

            : null}

        </Animated.View>

      </Animated.View>

    </KeyboardAvoidingView>
  )
}

module.exports = Bar;

const styles = StyleSheet.create({
  rightSide: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightIconContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    opacity: .8,
    backgroundColor: 'rgb(200, 200, 255)',
  },
  rightIcon: {
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
    padding: 3,
    right: 0,
    borderRadius: 50,
  },
  createContainer: {
    height: 40,
    width: '100%',
    opacity: .9,
    backgroundColor: 'rgb(220, 220, 255)',
    borderRadius: 25,
  },
  createBar: {
    height: 40,
    width: '100%',
    left: 0,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 17,
  },
  searchContainer: {
    height: 40,
    left: 0,
  },
  searchBar: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 17,
    borderRadius: 10,
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
