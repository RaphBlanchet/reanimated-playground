import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerTitle: '', headerBackTitle: 'Home'}}/>
    </GestureHandlerRootView>
    
  )
}
