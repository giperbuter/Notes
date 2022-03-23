import { StyleSheet, View, ScrollView, LogBox } from 'react-native';

let NoteList = require('./elements/NoteList.tsx')
let Background = require('./elements/Background.tsx')
let Bar = require('./elements/BottomTIs.tsx')

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])

// add links
// add lists
// add images
// the bg changes colors by scroll, rotation, and maybe constantly and by dark/light mode

// use only sf symbols for ios
// ios sheet for long notes
// alert when no internet for bacjing
// action sheet when deleting a note
// ios switchers for dark/light modes
// for storing online - activity indicators
// pickers if i add dates and so
// hust to keep in mind: page controlls
// notes have styles(bold, this, text color etc.)
//   creating notes - Edit Menus
// add haptics
// context-menu for notes ---
// quick actions --- 
// add icon for adding options(add field etc) (an option for now)
// locket notes with face id / finger(android)
// dark/light mode
// notes are swipable(like in spotify playlists) ---
// settings tab(for that ill need navigation)
// an option to store the notes online
// notes and/or bg responding to phone's rotation
// long notes:
//   long note tab: when createing a note an icon above finish opens tab for writing long notes
//   long notes will be shown in the list only the title and subtitle or smth
//   when long notes clicked in list they becomes bigger and expands
//   long notes will have paragraphs and could containe images
// tags:
//   u choose tag's color by ios color well
//   you can tag notes with tags. above finish icon is add tags icon, i cant think of the animations rn
//   you can search by tags, they have their own colors
//   right to the notes is a list of tags, when clicked, only notes with this tag shows
//   think off how to create a tag

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Background />
      <NoteList />
      <Bar />
    </View>
  );
}