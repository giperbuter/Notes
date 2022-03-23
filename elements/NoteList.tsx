import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
// ts loop over list to create html example:
// Object.entries(props.fields).map(([key, value]) => (
// <React.Fragment> ... </...>

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
        <Text style={styles.noteField}>{props.text}</Text>
      </View>
    </View>
  )
}

let NoteList = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Note title='good recipe' text={'name : cookies\nlink : cookies.org/chocolate-chips'} />
      <Note title='steam password' text={'user name : nah\npassword : 12345678'} />
      <Note title='to do list' text={'clean : my room and the kitchen\nbuy : flour and milk'} />
    </ScrollView>
  )
}

module.exports = NoteList;

const styles = StyleSheet.create({
  scroll: {
    paddingLeft: 20,
    paddingTop: 50,
    paddingBottom: 80,
    width: '100%',
    alignItems: 'flex-start',
  },
  note: {
    borderRadius: 10,
    minWidth: 200,
    margin: 3,
    zIndex: 2,
    overflow: 'hidden',
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