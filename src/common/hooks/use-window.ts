import { useState } from "react";
import { useMount } from "ahooks";

export default function useWindow() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useMount(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  });
  return { width, height };
}
