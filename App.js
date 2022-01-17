/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Button,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {LoremIpsum} from './common';
import React, { createContext, useEffect, useRef, useState } from "react";

import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native';
import CustomBS from "./test";

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

export const userContext = createContext();

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'Curabitur accumsan sit amet massa quis cursus. Fusce sollicitudin nunc nisl, quis efficitur quam tristique eget. Ut non erat molestie, ullamcorper turpis nec, euismod neque. Praesent aliquam risus ultricies, cursus mi consectetur, bibendum lorem. Nunc eleifend consectetur metus quis pulvinar. In vitae lacus eu nibh tincidunt sagittis ut id lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sagittis mauris rhoncus, maximus justo in, consequat dolor. Pellentesque ornare laoreet est vulputate vestibulum. Aliquam sit amet metus lorem.',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App: () => Node = () => {
  const isEnabled = useSharedValue(true);

  const headerGesture2 = useRef<PanGestureHandler>(null);
  const scrollViewGestureRef = useRef<NativeViewGestureHandler>(null);

  const dimesnions = useWindowDimensions();
  const top = useSharedValue(dimesnions.height);

  const isTopReached = useSharedValue(true);

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(event, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      if (isTopReached.value !== true) {
        return;
      }
      if (event.translationY < 0) {
        // if (isEnabled.value == true) {
        //   return;
        // }
        // isEnabled.value = true
        // runOnJS(setEnabled)(true)
      } else {
        // if (isEnabled.value == true) {
        //   return;
        // }
        top.value = context.startTop + event.translationY;
      }
    },
    onEnd(event) {
      if (isEnabled.value == true) {
        return;
      }
      if (top.value > dimesnions.height / 2 - 200) {
        top.value = dimesnions.height;
      } else {
        top.value = 50;
      }
    },
  });

  const AnimatedScrollView =
    Animated.createAnimatedComponent<RNScrollViewProps>(RNScrollView);

  const _onScroll = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.y > 0) {
      isTopReached.value = false;
    } else {
      isTopReached.value = true;
    }
    // if (nativeEvent.contentOffset.y <= 0 && enabled) {
    //     console.log('disable scroll')
    //     isEnabled.value = false
    //     setEnabled(false)
    // }
    // if (nativeEvent.contentOffset.y > 0 && !enabled) {
    //     console.log('enable scroll')
    //     isEnabled.value = true
    //     setEnabled(true)
    // }
  };

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title={'open sheet'}
          onPress={() => {
            top.value = withSpring(50, SPRING_CONFIG);
          }}
        />
      </View>
      {/*<PanGestureHandler>*/}
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        <PanGestureHandler
          ref={headerGesture2}
          shouldCancelWhenOutside={false}
          simultaneousHandlers={[scrollViewGestureRef]}
          onGestureEvent={gestureHandler}>
          <Animated.View style={styles.container}>
            {/*<Animated.View>*/}

            <userContext.Provider
              value={{nativeGestureRef: scrollViewGestureRef}}>
              <CustomBS />
            </userContext.Provider>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      {/*</PanGestureHandler>*/}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default App;
