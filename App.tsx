import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

let Note = require('./elements/Note.tsx')

// add links
// add lists
// add images
// add messages(a text at the end)
// only see the title in the list and when taped everything rolls out

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8f35d4', '#3b64d4']}
        start={{ x: 2, y: 0 }}
        style={styles.background}
      ></LinearGradient>
        <Note title='good recipe' fields={{ 'name': 'cookies', 'link': 'cookies.org/chocolate-chips' }} />
        <Note title='steam password' fields={{ 'user name': 'nah', 'password': '12345678' }} />
        <Note title='to do list' fields={{ 'clean': 'my room and the kitchen', 'buy': 'flour and milk' }} />
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  background: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth
  }
});