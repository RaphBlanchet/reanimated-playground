import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/layout" asChild>
        <Button title='Layout Animation' />
      </Link>
      <Link href="/gesture" asChild>
        <Button title='Gesture' />
      </Link>
      <Link href="/advanced" asChild>
        <Button title='Advanced' />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
