import React, { useRef, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Animated, Keyboard, Pressable } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'
import FinishIcon from './finish-icon.jsx'

let Bar = (props) => {
  const [addIcon, setAddIcon] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [createBar, setCreateBar] = useState(true);
  const [pressable, setPressable] = useState(true);
  const [keyboardUp, setKeyboardUp] = useState(false);
  const [paragraph, setParagraph] = useState(false);

  const addOpacity = useRef(new Animated.Value(0)).current;
  const createBarOpacity = useRef(new Animated.Value(1)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const changeTextinput = useRef(new Animated.Value(1)).current;
  const searchUpAN = useRef(new Animated.Value(1)).current;
  const createUpAN = useRef(new Animated.Value(0)).current;

  let changeBar = () => {
    if (!pressable) return;

    if (!searchBar) { // when SEARCH bar pops up
      setPressable(false);

      Animated.parallel([
        Animated.timing(changeTextinput, { toValue: 0, duration: 250, useNativeDriver: false }),
        Animated.timing(createBarOpacity, { toValue: 0, duration: 250, useNativeDriver: false }),
      ], { stopTogether: false })
        .start(() => {
          Animated.timing(addOpacity, { toValue: 1, duration: 200, useNativeDriver: false }).start();
          Animated.timing(searchBarOpacity, { toValue: 1, duration: 200, useNativeDriver: false }).start();
          setAddIcon(true);
          setCreateBar(false);
          setSearchBar(true);
          setPressable(true);
        });

    } else { // when CREATE bar pops up
      setPressable(false);

      Animated.timing(changeTextinput, { toValue: 1, duration: 250, useNativeDriver: false }).start()
      Animated.parallel([
        Animated.timing(addOpacity, { toValue: 0, duration: 100, useNativeDriver: false }),
        Animated.timing(searchBarOpacity, { toValue: 0, duration: 100, useNativeDriver: false }),
        Animated.timing(createBarOpacity, { toValue: 1, duration: 250, useNativeDriver: false })
      ], { stopTogether: false })
        .start(() => {
          setAddIcon(false);
          setSearchBar(false);
          setPressable(true);
        });
      setCreateBar(true);
    }
  }

  let searchUp = () => {
    setKeyboardUp(true);
    Animated.timing(addOpacity, { toValue: 0, duration: 150, useNativeDriver: false }).start();
    Animated.timing(searchUpAN, { toValue: 0, duration: 150, useNativeDriver: false }).start();
    Animated.timing(changeTextinput, { toValue: -0.2, duration: 250, useNativeDriver: false }).start();
  }

  let searchDown = () => {
    setKeyboardUp(false);
    Animated.timing(changeTextinput, { toValue: 0, duration: 150, useNativeDriver: false }).start(() => {
      Animated.timing(addOpacity, { toValue: 1, duration: 150, useNativeDriver: false }).start();
      Animated.timing(searchUpAN, { toValue: 1, duration: 150, useNativeDriver: false }).start();
    });
  }

  let createUp = () => {
    setKeyboardUp(true);
    Animated.timing(createUpAN, { toValue: 1, duration: 1000, delay:500,  useNativeDriver: false }).start()
    setParagraph(true);
    Keyboard.addListener('keyboardWillHide', createDown);
  }

  let createDown = () => {
    setKeyboardUp(false);
    Animated.timing(createUpAN, { toValue: 0, duration: 1000, delay:500, useNativeDriver: false }).start(() => {
      setParagraph(false);
    });
    Keyboard.removeAllListeners('keyboardWillHide');
  }

  let createHeight = 110;

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
            opacity: searchUpAN,
            height: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [40, createHeight-10] })
          }]}>

        {/* background */}
        <Animated.View
          style={[
            styles.createContainer,
            // WIDTH of textinput's background
            {
              width: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [40, 305] }),
              height: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [40, createHeight] })
            }]}>
              
          {/* create text input - title */}
          {(createBar) ?
            <Animated.View
              style={{
                opacity: createBarOpacity,
                width: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['100%', '96%'] }),
                paddingTop: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }),
                paddingLeft: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['0%', '4%'] }),
              }}>

              <Animated.View
                style={{
                  backgroundColor: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['#dcdcff00', '#dcdcff55']}),
                  borderRadius: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 50]}) 
                }}>
                <TextInput
                  placeholder={(keyboardUp) ? 'title' : 'Tap to create a Note!'}
                  style={styles.createTitle}
                  onFocus={createUp}
                  // onEndEditing={createDown}
                  />
              </Animated.View>
            </Animated.View>
            : null}

          {/* create text input - paragraph */}
          {(paragraph) ?
            <Animated.View
              style={{
                opacity: createUpAN.interpolate({inputRange: [0, .6, 1], outputRange: [0, .1, 1]}),
                width: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['100%', '96%'] }),
                paddingTop: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }),
                paddingLeft: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['0%', '4%'] })
              }}>

              <TextInput
                placeholder='paragraph'
                style={styles.createParagraph}
                // onEndEditing={createDown}
                />

            </Animated.View>
            : null}

          {/* add icon */}
          {(addIcon) ?
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
              borderRadius: (keyboardUp && searchBar) ? 10 : changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [10, 50] }),
              // Width of icon's background
              width: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [305, 40] })
            }]}>

          {/* finish icon */}
          <Animated.View style={[
            styles.rightIcon,
            { opacity: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}>

            <FinishIcon />

          </Animated.View>

          {/* search icon */}
          <Animated.View
            style={[
              styles.rightIcon,
              { opacity: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>

            <Pressable
              onPress={(keyboardUp) ? null : changeBar}>

              <SearchIcon />

            </Pressable>
          </Animated.View>

          {/* text input bar */}
          {searchBar ?
            <Animated.View
              style={[
                styles.searchContainer,
                {
                  opacity: searchBarOpacity,
                  width: changeTextinput.interpolate({ inputRange: [-0.2, 0], outputRange: [320, 250] })
                }]}>

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
    height: 40,
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightIconContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: 0,
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
    backgroundColor: 'rgba(220, 220, 255, .5)',
    borderRadius: 25,
  },
  createTitle: {
    position: 'relative',
    height: 40,
    left: 0,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    fontSize: 17,
  },
  createParagraph: {
    position: 'relative',
    height: 40,
    left: 0,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(220, 220, 255, .3)',
    borderRadius: 25,
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
