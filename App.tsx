import { StyleSheet, View } from 'react-native';

let Note = require('./elements/Note.tsx')
let Background = require('./elements/Background.tsx')

// add links
// add lists
// add images
// add messages(a text at the end)
// only see the title in the list and when taped everything rolls out

export default function App() {
  return (
    <View style={styles.container}>
      <Background />
        <Note title='good recipe' fields={{ 'name': 'cookies', 'link': 'cookies.org/chocolate-chips' }} />
        <Note title='steam password' fields={{ 'user name': 'nah', 'password': '12345678' }} />
        <Note title='to do list' fields={{ 'clean': 'my room and the kitchen', 'buy': 'flour and milk' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  }
});