import React, { useEffect } from "react";
import { FC } from "react";
import { useContext } from "../../../common/hooks/use-context";
import useWindow from "../../../common/hooks/use-window";

interface Props {}

const GridDemo: FC<Props> = () => {
  const { context } = useContext();
  const { width: innerWidth, height: innerHeight } = useWindow();
  const axis_config = {
    margin: 40,
    color: "blue",
    lineWidth: 1,
    spaceDistance: 10,
    tickWidth: 10,
    tickLineWidth: 0.5,
    tickColor: "navy",
  };
  function drawGrid() {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = 0.5;
    context.strokeStyle = "lightgray";
    let stepX = 10,
      stepY = 10;
    for (let i = stepX + 0.5; i < innerWidth; i += stepX) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, innerHeight);
      // context.closePath()
      context.stroke();
    }
    for (let i = stepY + 0.5; i < innerHeight; i += stepY) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(innerWidth, i);
      context.stroke();
    }
    context.restore();
  }

  function drawCoordinateMainLine() {
    if (!context) {
      return;
    }
    context.save();

    context.beginPath();
    const x = axis_config.margin,
      y = innerHeight - axis_config.margin;
    context.lineWidth = axis_config.lineWidth;
    context.strokeStyle = axis_config.color;
    context.moveTo(x, y);
    context.lineTo(innerWidth - axis_config.margin, y);
    context.stroke();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(axis_config.margin, axis_config.margin);
    context.stroke();

    context.restore();
  }

  function drawCoordinateAxis() {
    drawCoordinateMainLine();
  }

  function drawXAxisTicks() {
    if (!context) {
      return;
    }
    const xAxisWidth = innerWidth - 2 * axis_config.margin;
    const tickNums = Math.floor(xAxisWidth / axis_config.spaceDistance);
    const x = axis_config.margin,
      y = innerHeight - axis_config.margin;
    for (let i = 1; i <= tickNums; i++) {
      context.beginPath();
      const delta =
        i % 5 === 0 ? axis_config.tickWidth : axis_config.tickWidth / 2;
      let tickX = x + i * axis_config.spaceDistance;
      context.moveTo(tickX, y - delta);
      context.lineTo(tickX, y + delta);
      context.stroke();
    }
  }

  function drawYAxisTicks() {
    if (!context) {
      return;
    }

    const x = axis_config.margin,
      y = axis_config.margin;

    const yAxisHeight = innerHeight - 2 * axis_config.margin;
    const yTickNums = Math.floor(yAxisHeight / axis_config.spaceDistance);

    for (let i = 1; i <= yTickNums; i++) {
      context.beginPath();
      const delta =
        i % 5 === 0 ? axis_config.tickWidth : axis_config.tickWidth / 2;
      let tickY = y + i * axis_config.spaceDistance;
      context.moveTo(x - delta, tickY);
      context.lineTo(x + delta, tickY);
      context.stroke();
    }
  }

  function drawCoordinateAxisTick() {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = axis_config.tickLineWidth;
    context.strokeStyle = axis_config.tickColor;

    drawXAxisTicks();
    drawYAxisTicks();

    context.restore();
  }

  useEffect(() => {
    drawGrid();
    drawCoordinateAxis();
    drawCoordinateAxisTick();
  }, [context]);

  return (
    <canvas id="canvas" width={innerWidth} height={innerHeight}>
      Canvas not supported
    </canvas>
  );
};

export default GridDemo;
