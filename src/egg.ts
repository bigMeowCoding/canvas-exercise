import WeimobGame from "./common/weimobGame";
import { useMount } from "ahooks";

const param = {
  name: "egg",
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
      name: "dan_0_0",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/9d2744a944554ec69fd139e963c76d40.png",
    },
    {
      name: "dan_0_1",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/71613dd5fde6491d84d5e70888253666.png",
    },
    {
      name: "dan_0_2",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/c4e890ee7c1c4d6fa4ad859b10c5da47.png",
    },
    {
      name: "dan_1_0",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/387ca76e0f6f4baa9648b0aa0a908d88.png",
    },
    {
      name: "dan_1_1",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/89c41a4a4eb14180a72e441b755a0a54.png",
    },
    {
      name: "dan_1_2",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/5309129235a34dc6ac0273ed2443d95c.png",
    },
    {
      name: "dan_2_0",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/02999eb6e0364965b29aac8edb3d8488.png",
    },
    {
      name: "dan_2_1",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/a49b22514ce04fa88da025281ff15d16.png",
    },
    {
      name: "dan_2_2",
      src: "https://image-c.weimobwmc.com/ol-6LEtw/b6404efdcf2e400899c582262535c849.png",
    },
    {
      src: "https://cdn2.weimob.com/saas/@assets/saas-fe-comon-h5-stc/activity/hd_all/lego/egg/1/image/dan_0.png",
      name: "dan_0",
      label: "锤子",
    },
    {
      src: "https://cdn2.weimob.com/saas/@assets/saas-fe-comon-h5-stc/activity/hd_all/lego/egg/1/image/tishi.png",
      name: "tishi",
      label: "左右移动提示",
    },
    {
      src: "https://cdn2.weimob.com/saas/@assets/saas-fe-comon-h5-stc/activity/hd_all/lego/egg/1/image/elimination.png",
      name: "base",
      label: "底坐",
    },
  ],
  onLoadingHandle: function (e) {
    console.log(e);
  },
  onCompleteHandle,
});

function onCompleteHandle() {
  weimobGame.game.init()
}
