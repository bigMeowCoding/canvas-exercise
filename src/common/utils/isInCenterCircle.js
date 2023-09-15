export default function isInCenterCircle(x, y, centerCircleRadius, pos) {
  const { x: centerX, y: centerY } = pos;
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  return distance <= centerCircleRadius;
}
