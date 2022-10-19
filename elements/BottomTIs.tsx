import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Animated, Keyboard, Pressable, Easing } from 'react-native';
import { BlurView } from 'expo-blur';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'
import FinishIcon from './finish-icon.jsx'

const Styles = require('./Styles.tsx');

// next modification:
// add little shadow to title and text (maybe to others too)
// get rid of the 'bar' name everywhere
// edit the finish/search changing animation that they change at start more
// make title field thiner
// make an animation when typing in fields so th placeholder move above the TI

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

module.exports = () => {

  const searchBarFocus = () => {
    setSearchBar(true);
    setPlusIcon(true);
    setTitleV('');
    Animated.parallel([
      Animated.timing(style.AN.change, { toValue: 0, duration: 250, useNativeDriver: false }),
      Animated.timing(style.AN.createOp, { toValue: 0, duration: 250, useNativeDriver: false }),
      Animated.timing(style.AN.plusOp, { toValue: 1, duration: 350, delay: 50, useNativeDriver: false }),
      Animated.timing(style.AN.searchOp, { toValue: 1, duration: 350, delay: 50, useNativeDriver: false }),
    ], { stopTogether: false })
      .start(() => {
        setCreateBar(false);
        setPressable(true);
      });
  }

  const createBarFocus = () => {
    Animated.timing(style.AN.change, { toValue: 1, duration: 250, useNativeDriver: false }).start()
    Animated.parallel([
      Animated.timing(style.AN.plusOp, { toValue: 0, duration: 100, useNativeDriver: false }),
      Animated.timing(style.AN.searchOp, { toValue: 0, duration: 100, useNativeDriver: false }),
      Animated.timing(style.AN.createOp, { toValue: 1, duration: 250, useNativeDriver: false })
    ], { stopTogether: false })
      .start(() => {
        setPlusIcon(false);
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
    Animated.timing(style.AN.plusOp, { toValue: 0, duration: 150, useNativeDriver: false }).start();
    Animated.timing(style.AN.search, { toValue: 0, duration: 150, useNativeDriver: false }).start();
    Animated.timing(style.AN.change, { toValue: -0.2, duration: 250, useNativeDriver: false }).start();
  }

  let searchDown = () => {
    setKeyboardUp(false);
    Animated.timing(style.AN.change, { toValue: 0, duration: 150, useNativeDriver: false }).start(() => {
      Animated.timing(style.AN.plusOp, { toValue: 1, duration: 150, useNativeDriver: false }).start();
      Animated.timing(style.AN.search, { toValue: 1, duration: 150, useNativeDriver: false }).start();
    });
  }

  let createUp = () => {
    setKeyboardUp(true);
    Animated.timing(titleIntensity, { toValue: 15, duration: 300, useNativeDriver: false }).start()
    Animated.timing(textIntensity, { toValue: 15, duration: 300, useNativeDriver: false }).start() // 12
    Animated.timing(style.AN.create, { toValue: 1, duration: 300, useNativeDriver: false }).start()
    setText(true);
    Keyboard.addListener('keyboardWillHide', createDown);
  }

  let createDown = () => {
    setKeyboardUp(false);
    Animated.timing(titleIntensity, { toValue: 0, duration: 200, useNativeDriver: false }).start()
    Animated.timing(textIntensity, { toValue: 0, duration: 200, useNativeDriver: false }).start()
    Animated.timing(style.AN.create, { toValue: 0, duration: 200, easing: Easing.out(Easing.quad), useNativeDriver: false }).start(() => {
      setText(false);
    });
    setTextV('');
    Keyboard.removeAllListeners('keyboardWillHide');
  }

  const [plusIcon, setPlusIcon] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [createBar, setCreateBar] = useState(true);
  const [pressable, setPressable] = useState(true);
  const [keyboardUp, setKeyboardUp] = useState(false);
  const [text, setText] = useState(false);

  const [titleV, setTitleV] = useState('');
  const [textV, setTextV] = useState('');
  const [searchV, setSearchV] = useState('');

  const titleIntensity = useRef(new Animated.Value(0)).current;
  const textIntensity = useRef(new Animated.Value(0)).current;

  const style = new Styles.BottomTIs();

  const textInputRef = useRef<TextInput | null>(null);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={20}
      style={style.container()}>

      {/* CREATE */}
      <Animated.View style={style.leftContainer()}>

        {/* background */}
        <Animated.View style={style.createBackground()}>

          <BlurView style={style.blur()} tint='light' intensity={40} />

          {/* title */}
          {(createBar) ?

            <Animated.View style={style.createTitleContainer()}>

              <Animated.View style={style.createTextinputBackground()}>

                <AnimatedBlurView style={style.blur()} tint='light' intensity={titleIntensity} />

                <Animated.View style={style.createLabel()}>
                  <Text>{(titleV) ? '' : 'Title'}</Text>
                </Animated.View>

                <TextInput
                  placeholder={(keyboardUp) ? '' : 'Tap to create a note!'}
                  style={style.createTitle()}
                  onFocus={createUp}
                  onChangeText={setTitleV}
                  maxLength={30}
                  returnKeyType='next'
                  clearButtonMode='while-editing'
                  onSubmitEditing={() => { textInputRef.current?.focus() }}
                />

              </Animated.View>

            </Animated.View>

            : <></>}

          {/* text */}
          {(text) ?

            <Animated.View style={style.createTextContainer()}>

              <Animated.View style={style.createTextinputBackground()}>

                <AnimatedBlurView style={style.blur()} tint='light' intensity={textIntensity} />

                <Animated.View style={style.createLabel()}>
                  <Text>{(textV) ? '' : 'Text'}</Text>
                </Animated.View>

                <TextInput
                  ref={textInputRef}
                  style={style.createText()}
                  onChangeText={setTextV}
                  multiline={true}
                  selectTextOnFocus={true}
                />

              </Animated.View>

            </Animated.View>

            : <></>}

          {/* plus icon */}
          {(plusIcon) ?

            <Animated.View style={style.plusIcon()}>

              <Pressable onPress={changeBar}>

                <PlusIcon />

              </Pressable>

            </Animated.View>

            : <></>}

        </Animated.View>

      </Animated.View>

      {/* Right side - SEARCH */}
      <Animated.View style={style.rightContainer()}>

        {/* background */}
        <Animated.View style={style.searchContainer(keyboardUp, searchBar)}>

          <BlurView style={style.blur()} tint='light' intensity={40} />

          {/* finish icon */}
          <Animated.View style={style.finishIcon()}>

            <FinishIcon />

          </Animated.View>

          {/* search icon */}
          <Animated.View style={style.searchIcon()}>

            <Pressable onPress={(keyboardUp) ? null : changeBar}>

              <SearchIcon />

            </Pressable>

          </Animated.View>

          {/* text input */}
          {searchBar ?

            <Animated.View style={style.searchTextinputContainer()}>

              <TextInput
                placeholder='Tap to Search for a Note!'
                style={style.searchTextinput()}
                returnKeyType='search'
                onFocus={searchUp}
                onChangeText={setSearchV}
                onEndEditing={searchDown} />

            </Animated.View>

            : <></>}

        </Animated.View>

      </Animated.View>

    </KeyboardAvoidingView>
  )
}