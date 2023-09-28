import { useMount } from "ahooks";
import { useState } from "react";

export function useContext() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  useMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement,
      context = canvas?.getContext("2d");
    setCanvas(canvas);
    setContext(context);
  });
  return {
    context,
    canvas,
  };
}
