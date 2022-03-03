import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

let Note = (props) => {
  return (
    <View style={styles.note}>
      <Text style={styles.noteTitle}>
        {props.title}
      </Text>
      {Object.entries(props.fields).map(([key, value]) => (
        // <View key={key}>
        <React.Fragment>
          <Text>{key}</Text>
          <Text>{value}</Text>
        </React.Fragment>
      ))}
    </View>
  )
}

module.exports = Note;

const styles = StyleSheet.create({
  note: {
    width: 300,
    margin: 10
  },
  noteTitle: {
  },
  noteField: {
  }
});

