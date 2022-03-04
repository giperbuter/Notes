import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Animated, KeyboardAvoidingView } from 'react-native';

// const SearchIcon = require("./search-icon.tsx")
import SearchIcon from './search-icon.jsx'

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
  return (
    <View style={styles.search}>
      <View style={styles.searchIcon}>
        <SearchIcon />
      </View>
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
    flexBasis: '85%',
  },
  keyboard: {
    position: 'absolute',
    left: 17,
    bottom: 30,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
