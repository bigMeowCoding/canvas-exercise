import React, { useEffect } from "react";
import { FC } from "react";
import loadImages from "../../../common/utils/loadImages";
import getRandomInt from "../../../common/utils/getRandomInt";
import WeimobGame from "../../../common/weimobGame";
import { useMount } from "ahooks";

interface Props {}

const BigwheelDemo: FC<Props> = () => {
  useMount(() => {
    const param = {
      name: "bigwheel",
      id: "canvas",
      // scripts: [import("../games/libs/game"), import("../games/egg/egg")],
      // url: "//cdn2.weimob.com/saas/@qa/saas-fe-comon-h5-stc/bos/lego/",
    };

    const weimobGame = new WeimobGame();
    weimobGame.init({
      ...param,
      theme: "0",
      // width: 750,
      // height: 750,
      data: [
        {
          name: "bg",
          src: "https://image-c.weimobwmc.com/ol-6LEtw/5b3b2f175218476695bbe7e89abc63c9.png",
        },
        {
          name: "bg2",
          src: "https://image-c.weimobwmc.com/ol-6LEtw/04f03ec2becc4135a1d5246dc8503243.png",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/1ec5d69a814a494abc298af5b2087a36.png",
          name: "p0",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/4a093ca0ee534e499a3a50070e566955.png",
          name: "p1",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/2851fc1c42534cbc8b5786ec12286840.png",
          name: "p2",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/d27e523180124492b0dcf7154a6d6360.png",
          name: "p3",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/6314616feaf34de292c712259aa422fd.png",
          name: "p4",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/165871153ae34fe48dabd575f16b1af3.png",
          name: "p5",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/9d564b4f55f347a18403fa511fa05957.png",
          name: "p6",
        },
        {
          src: "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
          name: "p7",
        },
      ],
      onLoadingHandle: function (e) {
        console.log(e);
      },
      onCompleteHandle,
    });

    function onCompleteHandle() {
      weimobGame.game.init();
    }
  });
  return <canvas id={"canvas"} />;
};

export default BigwheelDemo;
