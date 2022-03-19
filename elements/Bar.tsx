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
  const [text, setText] = useState(false);

  const addOpacity = useRef(new Animated.Value(0)).current;
  const createBarOpacity = useRef(new Animated.Value(1)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const changeTextinput = useRef(new Animated.Value(1)).current;
  const searchUpAN = useRef(new Animated.Value(1)).current;
  const createUpAN = useRef(new Animated.Value(0)).current;

  const textInputRef = useRef<TextInput | null>(null);

  const searchBarFocus = () => {
    setSearchBar(true);
    setAddIcon(true);
    Animated.parallel([
      Animated.timing(changeTextinput, { toValue: 0, duration: 250, useNativeDriver: false }),
      Animated.timing(createBarOpacity, { toValue: 0, duration: 250, useNativeDriver: false }),
      Animated.timing(addOpacity, { toValue: 1, duration: 400, delay: 50, useNativeDriver: false }),
      Animated.timing(searchBarOpacity, { toValue: 1, duration: 400, delay: 50, useNativeDriver: false }),
    ], { stopTogether: false })
      .start(() => {
        setCreateBar(false);
        setPressable(true);
      });
  }

  const createBarFocus = () => {
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

  let changeBar = () => {
    if (!pressable) return;
    if (!searchBar) {
      setPressable(false);
      searchBarFocus();
    } else {
      setPressable(false);
      createBarFocus();
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
    Animated.timing(createUpAN, { toValue: 1, duration: 300, useNativeDriver: false }).start()
    setText(true);
    Keyboard.addListener('keyboardWillHide', createDown);
  }

  let createDown = () => {
    setKeyboardUp(false);
    Animated.timing(createUpAN, { toValue: 0, duration: 200, useNativeDriver: false }).start(() => {
      setText(false);
    });
    Keyboard.removeAllListeners('keyboardWillHide');
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
          {
            flexBasis: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: ['14%', '85%'] }),
            opacity: searchUpAN,
            height:
              createUpAN.interpolate({ inputRange: [0, 1], outputRange: [40, 53 + 63] }) 
          }]}>

        {/* background */}
        <Animated.View
          style={[
            styles.createContainer,
            {
              width: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [40, 305] }),
              height:
                createUpAN.interpolate({ inputRange: [0, 1], outputRange: [40, 60 + 63] })
            }]}>

          {/* create text input - title */}
          {(createBar) ?

            <Animated.View
              style={{
                opacity: createBarOpacity,
                width: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['100%', '96%'] }),
                paddingTop: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 10] }),
                paddingLeft: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['0%', '4%'] }),
              }}>

              <Animated.View
                style={{
                  backgroundColor: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['#dcdcff00', '#dcdcff55'] }),
                  borderRadius: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 50] })
                }}>

                <TextInput
                  placeholder={(keyboardUp) ? 'Type the title here' : 'Tap to create a Note!'}
                  style={styles.createTitle}
                  onFocus={createUp}
                  maxLength={30}
                  returnKeyType='next'
                  clearButtonMode={'while-editing'}
                  onSubmitEditing={() => { textInputRef.current?.focus() }}
                />

              </Animated.View>

            </Animated.View>

            : null}

          {/* create text input - text */}
          {(text) ?

            <Animated.View
              style={{
                flex: 0,
                opacity: createUpAN.interpolate({ inputRange: [0, .6, 1], outputRange: [0, .1, 1] }),
                width: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['100%', '96%'] }),
                paddingTop: createUpAN.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }),
                paddingLeft: createUpAN.interpolate({ inputRange: [0, 1], outputRange: ['0%', '4%'] })
              }}>

              <TextInput
                ref={textInputRef}
                placeholder={'\nAnd here the text'}
                style={[styles.createText]}
                multiline={true}
                selectTextOnFocus={true}
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
          { flexBasis: (changeTextinput.interpolate({ inputRange: [0, 1], outputRange: ['85%', '14%'] })) }]}>

        {/* background */}
        <Animated.View
          style={[
            styles.rightIconContainer, {
              borderRadius: (keyboardUp && searchBar) ? 10 : changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [10, 50] }),
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
    backgroundColor: 'rgba(200, 200, 255, .6)',
    shadowOffset: { width: 3, height: 3 },
    // shadowColor: '#000',
    // shadowRadius: 2,
    // shadowOpacity: .3,
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
    paddingHorizontal: 5,
  },
  createText: {
    position: 'relative',
    textAlignVertical: 'bottom',
    left: 0,
    top: 0,
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(220, 220, 255, .3)',
    borderRadius: 15,
    fontSize: 17,
    lineHeight: 17,
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
