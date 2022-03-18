import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

let Note = (props) => {
  return (
    <View style={styles.note}>
      <BlurView 
        tint='light'
        intensity={25}
        style={styles.blur}
      />
        <View style={styles.noteText}>
        <Text style={styles.noteTitle}>
          {props.title}
        </Text>
        {Object.entries(props.fields).map(([key, value]) => (
          <React.Fragment key={key}>
            <Text style={styles.noteField}>{key + ' : ' + value}</Text>
          </React.Fragment>
        ))}
        </View>
    </View>
  )
}

module.exports = Note;

const styles = StyleSheet.create({
  note: {
    borderRadius: 10,
    minWidth: 200,
    margin: 3,
    zIndex: 2,
    overflow: 'hidden',
    // backgroundColor: "rgba(170, 170, 170, .8)",
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  noteText: {
    margin: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 1,
    marginBottom: 3,
  },
  noteField: {
    fontSize: 17,
    fontWeight: '300',
    opacity: .7
  }
});