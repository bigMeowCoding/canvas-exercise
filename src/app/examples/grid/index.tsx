import React, { useEffect } from "react";
import { FC } from "react";
import { useContext } from "../../../common/hooks/use-context";
import useWindow from "../../../common/hooks/use-window";

interface Props {}

const GridDemo: FC<Props> = () => {
  const { context } = useContext();
  const { width: innerWidth, height: innerHeight } = useWindow();
  useEffect(() => {
    if (!context) {
      return ;
    }
    context.lineWidth=0.5
    context.strokeStyle='lightgray'
    let stepX=10,stepY=10;
    for(let i = stepX+0.5;i<innerWidth;i+=stepX) {
      context.beginPath();
      context.moveTo(i,0);
      context.lineTo(i,innerHeight)
      // context.closePath()
      context.stroke()
    }
    for(let i = stepY+0.5;i<innerHeight;i+=stepY) {
      context.beginPath();
      context.moveTo(0,i);
      context.lineTo(innerWidth,i)
      // context.closePath()
      context.stroke()
    }
  }, [context]);

  return (
    <canvas id="canvas" width={innerWidth} height={innerHeight}>
      Canvas not supported
    </canvas>
  );
};

export default GridDemo;
