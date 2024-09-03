import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS, useAnimatedReaction, useDerivedValue, interpolate } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Text } from "react-native"
import { useState } from "react";

export const Card = ({ color, onSwipe, enabled }: { color: string, onSwipe: () => void, enabled: boolean }) => {
  const [state, setState] = useState('Idle');
  const tX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useDerivedValue(() => interpolate(tX.value, [-200, 200], [-10, 10]));
  
  const pan = Gesture.Pan()
    .onStart(() => {
      scale.value = withTiming(1.05, { duration: 100 });
    })
    .onChange(({ changeX }) => {
      tX.value += changeX;
    })
    .onEnd(() => {
      if (tX.value > 125 || tX.value < -125) {
        runOnJS(onSwipe)();
      }
      tX.value = withTiming(0);
      scale.value = withTiming(1);
    })
    .enabled(enabled);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tX.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value }
    ]
  }))

  useAnimatedReaction(() => {
    if (tX.value > 125 || tX.value < -125) {
      return 'Swiped';
    } else if (tX.value !== 0) {
      return 'Swiping';
    }
    return 'Idle';
  }, (newState, prevState) => {
    if (newState === prevState) return
    
    runOnJS(setState)(newState);
  })

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[
        { backgroundColor: color, borderRadius: 16, width: 200, height: 300, position: 'absolute', justifyContent: 'center', alignItems: 'center' },
          animatedStyle
        ]}
      >
        <Text style={{ fontSize: 18 }}>{state}</Text>
      </Animated.View>
    </GestureDetector>
    
  )
}
function runOnJs(arg0: any) {
  throw new Error("Function not implemented.");
}

