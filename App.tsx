import { StyleSheet, View, ScrollView, LogBox } from 'react-native';

let Note = require('./elements/Note.tsx')
let Background = require('./elements/Background.tsx')
let Bar = require('./elements/BottomTIs.tsx')

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])

// add links
// add lists
// add images
// the bg changes colors by scroll, rotation, and maybe constantly and by dark/light mode

// add haptics
// context-menu for notes
// quick actions
// add icon for adding options(add field etc)
// locket notes with face id / finger(android)
// somehow add react-native-community/blur for ios13 shit
// dark/light mode
// notes are swipable(like in spotify playlists)
// settings tab(for that ill need navigation)
// an option to store the notes online
// notes and/or bg responding to phone's rotation
// long notes:
//   long note tab: when createing a note an icon above finish opens tab for writing long notes
//   long notes will be shown in the list only the title and subtitle or smth
//   when long notes clicked in list they becomes bigger and expands
//   long notes will have paragraphs and could containe images
// tags:
//   you can tag notes with tags. above finish icon is add tags icon, i cant think of the animations rn
//   you can search by tags, they have their own colors
//   right to the notes is a list of tags, when clicked, only notes with this tag shows
//   think off how to create a tag

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