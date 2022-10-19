import { useState, useRef } from 'react'
import { StyleSheet, Button, Easing, Text, View, ScrollView, PanResponder, Animated, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

// ts loop over list to create html example:
// Object.entries(props.fields).map(([key, value]) => (
// <React.Fragment> ... </...>

// on long press -> select mode(like in whatsapp)
// on moving right -> actions eill pop up on left (like in spotify playlist)

// try putting the animation stuff in the Note function, and call it as function not as HTML(like in NoteWrapper)
// find a way to scroll threw the notes(now it wont let you)
// next step -> load the notes from list dynamicly

let NoteList = (props) => {
  const [scroll, setScroll] = useState(true);
  const [noteMove, setNoteMove] = useState(false);

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

  const NoteWrapper = (title: string, text: string) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderReject: (evt, gestureState) => {},
      onPanResponderGrant: (evt, gestureState) => {
        if ((gestureState.dx * 50 > gestureState.dy)) {
          setScroll(false)
          console.log(noteMove + '22')
        } else { null; }
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          easing: Easing.in(Easing.elastic(1)),
          duration: 400,
          useNativeDriver: false
        }).start(
          () => { }
        );
        setScroll(true);
      },
      onPanResponderTerminate: () => {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          easing: Easing.in(Easing.elastic(1)),
          duration: 400,
          useNativeDriver: false
        }).start(
          () => { }
        );

        setScroll(true);
      },
    });
    return (
      <Animated.View {...panResponder.panHandlers} style={{ width: '100%', transform: [{ translateX: pan.x }] }} >
        <Note title={title} text={text} />
      </Animated.View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{}} scrollEnabled={scroll}>
        <View style={styles.scroll}>
          {NoteWrapper('good recipe', 'name : cookies\nlink : cookies.org/chocolate-chips')}
          {NoteWrapper('steam password', 'user name : nah\npassword : 12345678')}
          {NoteWrapper('to do list', 'clean : my room and the kitchen\nbuy : flour and milk')}
        </View>
      </ScrollView>
    </View >
  )
}

module.exports = NoteList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  scroll: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 80,
    alignItems: 'flex-start',
  },
  note: {
    alignSelf: 'flex-start',
    marginLeft: 10,
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