// 定义一个函数，用于加载图片并返回img元素数组
export default function loadImages(
  imagePaths: string[],
): Promise<HTMLImageElement[]> {
  const imagePromises: Promise<HTMLImageElement>[] = [];

  // 创建一个函数，用于加载单个图片
  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // 遍历图片路径数组，创建加载图片的Promise数组
  for (const path of imagePaths) {
    imagePromises.push(loadImage(path));
  }

  // 使用Promise.all等待所有图片加载完成
  return Promise.all(imagePromises);
}
