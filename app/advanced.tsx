import { StyleSheet, View } from "react-native";
import { Card } from "../ui/card";
import { useState } from "react";

export default function AdvancedScreen() {
  const [cardsStack, setCardsStack] = useState([
    'red',
    'blue',
    'green'
  ])

  const onCardSwiped = () => {
    setCardsStack((prev) => {
      const [first, ...rest] = prev
      return [...rest, first]
    })
  }

  return (
    <View style={styles.container}>
      {cardsStack.toReversed().map((card, i) => (
        <Card
          key={card}
          enabled={i === cardsStack.length - 1}
          color={card}
          onSwipe={onCardSwiped} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
