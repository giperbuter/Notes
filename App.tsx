import { StyleSheet, View, ScrollView } from 'react-native';

let Note = require('./elements/Note.tsx')
let Background = require('./elements/Background.tsx')
let Bar = require('./elements/Bar.tsx')

// add links
// add lists
// add images
// add messages(a text at the end)
// only see the title in the list and when taped everything rolls out
// animatied linear gradient background

export default function App() {
  return (
    <View style={styles.container}>
      <Background />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Note title='good recipe' fields={{ 'name': 'cookies', 'link': 'cookies.org/chocolate-chips' }} />
        <Note title='steam password' fields={{ 'user name': 'nah', 'password': '12345678' }} />
        <Note title='to do list' fields={{ 'clean': 'my room and the kitchen', 'buy': 'flour and milk' }} />
      </ScrollView>
      <Bar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingLeft: 20,
    paddingTop: 50,
    paddingBottom: 80,
    width: '100%',
    alignItems: 'flex-start',
  }
});