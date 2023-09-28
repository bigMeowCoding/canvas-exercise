import React, { useEffect } from "react";
import { FC } from "react";
import { useContext } from "../../../common/hooks/use-context";

interface Props {}

const Line: FC<Props> = () => {
  const { context } = useContext();

  function drawOneWidth() {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(150, 100);
    context.stroke();

    context.beginPath();
    context.moveTo(100.5, 150.5);
    context.lineTo(150.5, 150.5);
    context.stroke();
    context.restore();
  }
  //
  // useEffect(() => {
  //   if (!context) {
  //     return;
  //   }
    drawOneWidth();
  //   context.beginPath()
  //   context.lineWidth=2;
  //   context.moveTo(100,170)
  //   context.lineTo(150,170)
  //   context.stroke()
  // }, [context]);
  return (
    <canvas id="canvas" width="375" height="667">
      Canvas not supported
    </canvas>
  );
};

export default Line;
