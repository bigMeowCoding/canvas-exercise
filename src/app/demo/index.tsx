import React, { useEffect } from "react";
import { FC } from "react";
import { useMount } from "ahooks";
import { xhrRequest } from "../../common/utils/ajax";

interface Props {}

const Demo: FC<Props> = () => {
  useMount(() => {
    const url = "http://localhost:3333/api/getRecommend";
    xhrRequest(url, {p:1},{method:'POST'})
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  });
  return <div>tree</div>;
};

export default Demo;
