import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring } from "react-native-reanimated";
import { clamp } from "react-native-redash";
import { useHeaderHeight } from '@react-navigation/elements'
import { calculateBouncedPosition, calculateDirection } from "../utils/bounce";

export default function GestureScreen() {
  const dimensions = useWindowDimensions()
  const headerHeight = useHeaderHeight()
  const height = dimensions.height - headerHeight

  const tX = useSharedValue(0);
  const tY = useSharedValue(0);

  const clampX = [-dimensions.width / 2 + 50, dimensions.width / 2 - 50]
  const clampY = [-height / 2 + 50, height / 2 - 50]

  const directionX = useDerivedValue(() => calculateDirection(tX.value, ...clampX))
  const directionY = useDerivedValue(() => calculateDirection(tY.value, ...clampY))

  const pan = Gesture.Pan()
    .onChange(({ changeX, changeY }) => {
      tX.value = tX.value + changeX * directionX.value;
      tY.value = tY.value + changeY * directionY.value;
    })
    .onEnd(({ velocityX, velocityY }) => {
      tX.value = withDecay({ velocity: velocityX });
      tY.value = withDecay({ velocity: velocityY });
    });

  const posX = useDerivedValue(() => calculateBouncedPosition(tX.value, ...clampX))
  const posY = useDerivedValue(() => calculateBouncedPosition(tY.value, ...clampY))
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: posX.value },
      { translateY: posY.value }
    ]
  }))
  
  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.square, animatedStyle]} />
      </GestureDetector>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    backgroundColor: 'blue',
    borderRadius: 16,
    width: 100,
    height: 100
  }
})
