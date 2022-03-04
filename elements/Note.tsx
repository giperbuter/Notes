import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

let Note = (props) => {
  return (
    <View style={styles.note}>
      <Text style={styles.noteTitle}>
        {props.title}
      </Text>
      {Object.entries(props.fields).map(([key, value]) => (
        <React.Fragment key={key}>
          <Text style={styles.noteField}>{key + ' : ' + value}</Text>
        </React.Fragment>
      ))}
    </View>
  )
}

module.exports = Note;

const styles = StyleSheet.create({
  note: {
    minWidth: 200,
    margin: 3,
    backgroundColor: 'rgba(230, 230, 230, .5)',
    padding: 10,
    borderRadius: 10,
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