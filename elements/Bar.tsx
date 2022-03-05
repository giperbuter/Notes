import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

let Icon = require('./Icon.tsx')
let Create = require('./Create.tsx')


let Bar = (props) => {
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.keyboard}>
      <View style={styles.container}>
        <Create />
        <Icon />
      </View>
    </KeyboardAvoidingView>
  )
}

module.exports = Bar;

const styles = StyleSheet.create({
  keyboard: {
    position: 'absolute',
    left: 10,
    bottom: 25,
    zIndex: 3,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
