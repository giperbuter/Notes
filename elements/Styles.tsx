import React, { useRef, useState } from 'react'
import { Animated } from 'react-native';

const int = (an: Animated.Value, output: [any, any]) => {
  return an.interpolate({ inputRange: [0, 1], outputRange: output })
}

class bottom {

  AN = {
    change: useRef(new Animated.Value(1)).current,
    search: useRef(new Animated.Value(1)).current,
    searchOp: useRef(new Animated.Value(0)).current,
    create: useRef(new Animated.Value(0)).current,
    createOp: useRef(new Animated.Value(1)).current,
    plusOp: useRef(new Animated.Value(0)).current,
  }

  blur = () => {
    return (
      {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }
    )
  }

  container = () => {
    return (
      {
        position: 'absolute',
        left: 0,
        bottom: 30,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: '4%',
      }
    )
  }

  leftContainer = () => {
    return (
      {
        flex: 1,
        slignItems: 'flex-start',
        flexBasis: int(this.AN.change, ['14%', '85%']),
        opacity: this.AN.search,
        height: int(this.AN.create, [40, 53 + 63])
      }
    )
  }

  createBackground = () => {
    return (
      {
        borderRadius: 25,
        overflow: 'hidden',
        width: int(this.AN.change, [40, 305]),
        height: int(this.AN.create, [40, 60 + 63])
      }
    )
  }

  createTextinputCantainer = () => {
    return (
      {
        width: int(this.AN.create, ['100%', '96%']),
        paddingTop: int(this.AN.create, [0, 10]),
        paddingLeft: int(this.AN.create, ['0%', '4%']),
      }
    )
  }

  createTitleContainer = () => {
    return (
      {
        opacity: this.AN.createOp,
        ...this.createTextinputCantainer()
      }
    )
  }

  createTextinputBackground = () => {
    return (
      {
        overflow: 'hidden',
        borderRadius: int(this.AN.create, [0, 15]),
      }
    )
  }

  createTextContainer = () => {
    return (
      {
        ...this.createTextinputCantainer()
      }
    )
  }

  createTitle = () => {
    return (
      {
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 17,
        paddingHorizontal: 5,
      }
    )
  }

  createLabel = () => {
    return (
      {
        position: 'absolute',
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: int(this.AN.create, [0, .4]),
        fontSize: 15,
      }
    )
  }

  createText = () => {
    return (
      {
        height: 55,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 17,
        lineHeight: 17,
      }
    )
  }

  icon = () => {
    return (
      {
        position: 'absolute',
        width: 40,
        height: 40,
        padding: 3,
        right: 0,
      }
    )
  }

  plusIcon = () => {
    return (
      {
        ...this.icon(),
        opacity: this.AN.plusOp,
      }
    )
  }

  searchContainer = (keyboardUp, search) => {
    return (
      {
        marginBottom: int(this.AN.create, [0, -7]),
        height: 40,
        width: int(this.AN.change, [305, 40]),
        overflow: 'hidden',
        borderRadius: (keyboardUp && search) ? 10 : this.AN.change.interpolate({ inputRange: [0, .7, 1], outputRange: [10, 22, 50] }),
      }
    )
  }

  finishIcon = () => {
    return (
      {
        ...this.icon(),
        opacity: this.AN.create,
      }
    )
  }

  searchIcon = () => {
    return (
      {
        ...this.icon(),
        opacity: int(this.AN.create, [1, 0]),
      }
    )
  }

  searchTextinputContainer = () => {
    return (
      {
        opacity: this.AN.searchOp,
        width: this.AN.change.interpolate({ inputRange: [-0.2, 0], outputRange: [320, 250] })
      }
    )
  }

  searchTextinput = () => {
    return (
      {
        height: '100%',
        width: '100%',
        paddingHorizontal: 15,
        fontSize: 17,
        borderRadius: 10,
      }
    )
  }

  rightContainer = () => {
    return (
      {
        flex: 1,
        alignItems: 'flex-end', // in cross axis(row)
        justifyContent: 'flex-end', // in main axis(column)
        flexBasis: int(this.AN.change, ['85%', '14%'])
      }
    )
  }

}

module.exports.bottom = bottom;