import React, { useEffect } from "react";
import { FC } from "react";
import { useContext } from "../../../common/hooks/use-context";
import { useMount } from "ahooks";

interface Props {}
export default () => {
  const { context } = useContext();
  useEffect(() => {
    if (!context) {
      return;
    }
    const canvas = context.canvas;
    const { width, height } = canvas;
    const radius = 100;
    context.shadowColor = "rgba(0,0,0,.8)";
    context.shadowOffsetY=12;
    context.shadowOffsetX=12
    context.shadowBlur=15
    context.fillStyle = 'rgba(100, 140, 230, 0.5)';
    context.strokeStyle = context.fillStyle;//'rgba(20, 60, 150, 0.5)';
    context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    context.arc(width / 2, height / 2, radius/2, 0, Math.PI * 2,true);

    // context.clip()
    context.fill();
  }, [context]);
  return (
    <canvas id="canvas" width="375" height="667">
      Canvas not supported
    </canvas>
  );
};
