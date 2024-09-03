import { FlatList, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutAnimationScreen() {
  return (
    <View style={{ gap: 16, paddingVertical: 16}}>
      <Text
        style={{ fontSize: 32, fontWeight: 'bold', marginHorizontal: 16 }}>
        Layout Animation
      </Text>
      <FlatList
        data={new Array(10).fill(null)}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
        renderItem={({ index }) => (
          <Animated.View
            entering={FadeInLeft.delay(250 + index * 100).springify()}
            style={{ backgroundColor: 'lightgray', height: 100, borderRadius: 16, padding: 16 }}>
            <Text>{index}</Text>
          </Animated.View>
        )}
      />
    </View>
  )
}
