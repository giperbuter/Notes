import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TextInput } from 'react-native';

import SearchIcon from './search-icon.jsx'
import PlusIcon from './plus-icon.jsx'


let Bar = (props) => {
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.keyboardView}>
        <View style={styles.left}>
          <TextInput 
            placeholder='Tap to create a Note!'
            style={styles.leftTextinput}
          />
        </View>
        <View style={styles.right}>
          <View style={styles.icon}>
            <PlusIcon />
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
  icon: {
    position: 'absolute',
    width: 40,
    height: 40,
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, .7)',
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
    marginHorizontal: '3%',
  },
});
