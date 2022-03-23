import { useState, useRef } from 'react'
import { StyleSheet, Button, Easing, Text, View, ScrollView, PanResponder, Animated, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

// ts loop over list to create html example:
// Object.entries(props.fields).map(([key, value]) => (
// <React.Fragment> ... </...>

// on long press -> select mode(like in whatsapp)
// on moving right -> actions eill pop up on left (like in spotify playlist)


let NoteList = (props) => {
  const [scroll, setScroll] = useState(true);

  let Note = (props) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => { setScroll(false) },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.timing(
          pan,
          {
            toValue: { x: 0, y: 0 },
            easing: Easing.in(Easing.elastic(2)),
            duration: 500,
            useNativeDriver: false
          }).start(
            () => { setScroll(true) }
          );
      },
    });




    return (
      <Animated.View {...panResponder.panHandlers} style={{ width: '100%', transform: [{ translateX: pan.x }] }} >

        <Animated.View style={[styles.note, {}]}>

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

        </Animated.View>

      </Animated.View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} nestedScrollEnabled={false} scrollEnabled={scroll}>
      <Note title='good recipe' text={'name : cookies\nlink : cookies.org/chocolate-chips'} />
      <Note title='steam password' text={'user name : nah\npassword : 12345678'} />
      <Note title='to do list' text={'clean : my room and the kitchen\nbuy : flour and milk'} />
    </ScrollView>
  )
}

module.exports = NoteList;

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 50,
    paddingBottom: 80,
    width: '100%',
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