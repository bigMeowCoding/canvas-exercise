export default function getRandomColor(): string {
  // 生成随机的红、绿、蓝色分量
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // 将分量转换为十六进制，并确保两位数
  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  // 拼接颜色字符串
  const color = `#${redHex}${greenHex}${blueHex}`;

  return color;
}
