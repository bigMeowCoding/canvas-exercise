import React, { useEffect, useMemo, useRef, useState } from "react";

const Image = ({ url }) => {
  const [show, setShow] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollTop, setScrollTop] = useState(window.scrollY);
  useEffect(() => {
    window.onscroll = (e) => {
      console.log(window.scrollY);
      setScrollTop(window.scrollY);
    };
  }, []);
  const imgSrc = useMemo(() => {
    const image = imgRef.current;
    if (!image) {
      return;
    }
    const disTop = image.getBoundingClientRect().top;

    const windowHeight = window.innerHeight;
    console.log(disTop,windowHeight)
    setShow(disTop < windowHeight);
    return show ? url : null;
  }, [show,scrollTop]);
  return <img ref={imgRef} src={imgSrc} alt={"img"} id={"image"} />;
};
export default Image;
