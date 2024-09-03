export function calculateBouncedPosition(value: number, lowerBound: number, upperBound: number) {
  "worklet";
  const rangeSize = upperBound - lowerBound;
  const sign = Math.sign(value)

  // Normalize the value relative to the lower bound
  value = Math.abs(value) - lowerBound;

  // Calculate the number of full bounces (back-and-forth movements)
  const numBounces = Math.floor(Math.abs(value) / rangeSize);

  // Calculate the position within the current bounce
  const positionInBounce = value % rangeSize;

  // If the number of bounces is even, the value is going up; if odd, it's going down
  const finalPosition = (numBounces % 2 === 0)
      ? lowerBound + positionInBounce
      : upperBound - positionInBounce;

  return sign * finalPosition;
}

export function calculateDirection(value: number, lowerBound: number, upperBound: number) {
  "worklet";
  const rangeSize = upperBound - lowerBound;

  // Normalize the value relative to the lower bound
  value = Math.abs(value) - lowerBound;

  // Calculate the number of full bounces (back-and-forth movements)
  const numBounces = Math.floor(Math.abs(value) / rangeSize);

  return numBounces % 2 === 0 ? 1 : -1;
}
