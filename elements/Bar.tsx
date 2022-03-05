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

  const searchOpacity = useRef(new Animated.Value(1)).current;
  const finishOpacity = useRef(new Animated.Value(0)).current;
  const addOpacity = useRef(new Animated.Value(0)).current;
  const createBarOpacity = useRef(new Animated.Value(1)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const changeTextinput = useRef(new Animated.Value(1)).current;

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
    if (!isSearchBar) { // when SEARCH bar pops up
      Animated.parallel([
        Animated.timing(changeTextinput, { toValue: 0, duration: 400, useNativeDriver: false }),
        Animated.timing(createBarOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      ], { stopTogether: false })
      .start(() => { 
        Animated.timing(addOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        Animated.timing(searchBarOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        setIsAddIcon(true);
        setIsCreateBar(false);
        setIsSearchBar(true);
      });

    } else { // when CREATE bar pops up

      Animated.timing(changeTextinput, { toValue: 1, duration: 400, useNativeDriver: false })
        .start(() => {})
      
      Animated.parallel([
        Animated.timing(addOpacity, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.timing(searchBarOpacity, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.timing(createBarOpacity, { toValue: 1, duration: 400, useNativeDriver: true })
      ], { stopTogether: false })
      .start(() => {
        setIsAddIcon(false);
        setIsSearchBar(false);
      });
    
      setIsCreateBar(true);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={20}
      style={styles.keyboardView} >

      {/* Left side - Create */}
      <Animated.View
        style={[
          styles.leftSide,
          // WIDTH of create textinput / icon
          { flexBasis: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: ['14%', '85%'] }) }]}>
        
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
                placeholder='Tap to create a Note!' 
                style={styles.createBar} />
            
            </Animated.View>

          : null}

          {/* add icon */}
          {(isAddIcon) ?

            <View 
              style={[styles.addIcon]}>
              
              <Animated.View 
                style={{ opacity: addOpacity }}>
                
                <PlusIcon />
              
              </Animated.View>
            
            </View>

          : null}

        </Animated.View>

      </Animated.View>
      
      {/* Right side - search */}
      <Animated.View
        style={[
          styles.rightSide,
          // WIDTH of search textinput / icon
          { flexBasis: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: ['85%', '14%'] }) }]}>
        
        {/* background */}
        <Animated.View style={[
          styles.iconContainer, {
            // EDGE'S ROUND of icon
            borderRadius: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [10, 50] }),
            // WIDTH of icon's background
            width: changeTextinput.interpolate({ inputRange: [0, 1], outputRange: [305, 40] })
          }]}>
          
          {/* search icon */}
          {isSearchIcon ?

            <Animated.View
              style={[
                styles.icon,
                { opacity: searchOpacity }]}>

              <Pressable
                onPress={searchPress}>

                <SearchIcon />

              </Pressable>

            </Animated.View>

          : null}

          {/* finish icon */}
          {isFinishIcon ?

            <Animated.View style={[
              styles.icon,
              { opacity: finishOpacity }]}>

              <FinishIcon />

            </Animated.View>

          : null}

          {/* text input bar */}
          {isSearchBar ?

            <Animated.View
              style={[
                styles.searchContainer,
                { opacity: searchBarOpacity }]}>

              <TextInput
                placeholder='Tap to Search for a Note!'
                style={styles.searchBar} />

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
  addIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    padding: 3,
    right: 0,
    borderRadius: 50,
  },
  createContainer: {
    height: 40,
    width: '100%',
    backgroundColor: "#ddd",
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
    width: 250,
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
