// import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

let Background = (props) => {
  return (
    <LinearGradient
      colors={['#8f35d4', '#3b64d4']}
      start={{ x: 2, y: 0 }}
      style={styles.background} />
  )
}

module.exports = Background;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth
  }
});