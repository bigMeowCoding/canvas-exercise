export default function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = src;

  return new Promise((res, rej) => {
    image.onload = () => {
      res(image);
    };
    image.onerror = (err: any) => {
      rej(err);
    };
  });
}
