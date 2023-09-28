import React, { useEffect } from "react";
import { FC } from "react";
import { useContext } from "../../../common/hooks/use-context";
import { useMount } from "ahooks";
import useWindow from "../../../common/hooks/use-window";
import rect from "../../../common/utils/rect";

interface Props {}
export default () => {
  const { context } = useContext();
  const { width: innerWidth, height: innerHeight } = useWindow();

  function drawTwoCircle() {
    if (!context) {
      return;
    }
    const canvas = context.canvas;
    const { width, height } = canvas;
    const radius = 100;
    context.shadowColor = "rgba(0,0,0,.8)";
    context.shadowOffsetY = 12;
    context.shadowOffsetX = 12;
    context.shadowBlur = 15;
    context.fillStyle = "rgba(100, 140, 230, 0.5)";
    context.strokeStyle = context.fillStyle; //'rgba(20, 60, 150, 0.5)';
    context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    context.arc(width / 2, height / 2, radius / 2, 0, Math.PI * 2, true);
    context.fill();
  }

  function makeOuterRect() {
    if (!context) {
      return;
    }
    context.beginPath();
    context.rect(0, 0, innerWidth, innerHeight);
    // 这个时候不能fill
  }

  function makeTringle() {
    if(!context) {
      return
    }
    // context?.beginPath()
    const x =100,y=500
    context.moveTo(x,y)
    context.lineTo(x-10,y+50)
    context.lineTo(x+40,y+50)
    context.closePath()
  }

  function fillShape() {
    if (!context) {
      return;
    }
    context.fillStyle = "goldenrod";
    makeOuterRect();
    rect(context, {x: 100, y: 100, width: 200, height: 200}, true);
    context.arc(250,450,100,0,Math.PI*2,true)
    makeTringle()
    context.fill();
  }

  function storkeShape() {
    if (!context) {
      return;
    }
    context.strokeStyle = 'rgba(0,0,0,0.7)';
    context.beginPath()
    makeOuterRect();
    rect(context, {x: 100, y: 100, width: 200, height: 200}, true);
    context.stroke()

    context.beginPath()
    context.arc(250,450,100,0,Math.PI*2,true)
    makeTringle()
    context.stroke();
  }

  function drawMultiShape() {
    if (!context) {
      return;
    }
    context.save()
    context.shadowColor = 'rgba(200, 200, 0, 0.5)';
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;
    fillShape();
    storkeShape()
    context.restore()
  }

  useEffect(() => {
    // drawTwoCircle();
    drawMultiShape();
  }, [context]);
  return (
    <canvas id="canvas" width="375" height="667">
      Canvas not supported
    </canvas>
  );
};
