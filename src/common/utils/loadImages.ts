// 定义一个函数，用于加载图片并返回img元素数组
import loadImage from "./loadImage";
import { IFunc } from "../../typing/base";

export default function loadImages(
  imagePaths: string[],
  option?: {
    onLoading: IFunc;
    onLoaded: IFunc;
  },
): Promise<HTMLImageElement[]> {
  const imagePromises: Promise<HTMLImageElement>[] = [];

  // 创建一个函数，用于加载单个图片
  function load(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;

      loadImage(src).then(
        (img) => {
          option?.onLoading()?.(img);
          resolve(img);
        },
        (err) => reject(err),
      );
    });
  }

  // 遍历图片路径数组，创建加载图片的Promise数组
  for (const path of imagePaths) {
    imagePromises.push(load(path));
  }

  // 使用Promise.all等待所有图片加载完成
  return Promise.all(imagePromises).then((images) => {
    option?.onLoaded?.(images);
    return images;
  });
}
