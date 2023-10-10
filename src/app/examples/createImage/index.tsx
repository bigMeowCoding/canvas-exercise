import React, { useEffect } from "react";
import { FC } from "react";
import { useContext } from "../../../common/hooks/use-context";
import useWindow from "../../../common/hooks/use-window";
import drawImage from "../../../common/utils/drawImage";

interface Props {}

const Tree: FC<Props> = () => {
  const { context } = useContext();
  const { width: innerWidth, height: innerHeight } = useWindow();
  console.log(innerHeight, innerWidth);

  useEffect(() => {
    if (!context) {
      return;
    }

    drawImage(
      context,
      "https://cdn2.weimob.com/saas/@assets/saas-fe-comon-h5-stc/activity/hd_all/lego/egg/1/image/elimination.png",
    );
  }, [context]);
  return (
    <canvas id="canvas" width={innerWidth} height={innerHeight}>
      Canvas not supported
    </canvas>
  );
};

export default Tree;
