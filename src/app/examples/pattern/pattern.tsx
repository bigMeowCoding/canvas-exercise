import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { useMount } from "ahooks";
import { useContext } from "../../../common/hooks/use-context";
import loadImage from "../../../common/utils/loadImage";

export default () => {
  const { canvas, context } = useContext();
  const [redBallImg, setRedBallImg] = useState<HTMLImageElement | null>();
  const [patternStyle, setPatternStyle] = useState("no-repeat");

  useMount(async () => {
    const img = await loadImage("/src/app/examples/pattern/redball.png");
    setRedBallImg(img);
  });
  useEffect(() => {
    if (!context || !canvas) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
  }, [patternStyle, context]);
  useEffect(() => {
    if (!context || !redBallImg || !canvas) {
      return;
    }
    const pattern = context.createPattern(redBallImg, patternStyle);

    if (pattern) {
      context.fillStyle = pattern;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
  }, [context, redBallImg, patternStyle]);
  return (
    <>
      <Radio.Group
        value={patternStyle}
        onChange={(e) => {
          console.log("radio checked", e.target.value);
          setPatternStyle(e.target.value);
        }}
      >
        <Radio value={"repeat"}> repeat</Radio>
        <Radio value={"repeat-x"}> repeat-x</Radio>
        <Radio value={"repeat-y"}> repeat-y</Radio>
        <Radio value={"no-repeat"}> no-repeat</Radio>
      </Radio.Group>
      <canvas id="canvas" width="450" height="275">
        Canvas not supported
      </canvas>
    </>
  );
};
