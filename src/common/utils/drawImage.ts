import loadImage from "./loadImage";

export default async function drawImage(
  context: CanvasRenderingContext2D,
  src: string,
) {
  const image = await loadImage(src);
  const ratio = image.width/image.height;
  const scale= image.width/window.innerWidth

  context.drawImage(image, 0, 0, image.width, image.height,100,0,window.innerWidth,window.innerWidth/ratio);
}
