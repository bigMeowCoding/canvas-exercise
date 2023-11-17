import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useMount } from "ahooks";
import "./index.less";
import className from "classname";
interface Props {}

const Demo: FC<Props> = () => {
  const len = 5;
  const [selectIndex, setSelectIndex] = useState(-1);
  const [mouseSelectIndex, setMouseSelectIndex] = useState(-1);
  function makeWrapperClass(index: number) {
    const compareIndex = mouseSelectIndex>-1?mouseSelectIndex:selectIndex
    const remain = compareIndex - index;
    const classNames: any[] = [];
    if (remain >=-0.5) {
      if (0 >remain && remain >= -0.5) {
        classNames.push("half");
      }
      classNames.push("selected");
    }

    return classNames;
  }

  console.log(mouseSelectIndex);
  return (
    <div>
      {Array.from(new Array(len)).map((value, index) => {
        return (
          <div
            className={className(["wrapper", ...makeWrapperClass(index)])}

          >
            <div
              className={className(["first", "star"])}
              onMouseEnter={() => {
                setMouseSelectIndex(index);
              }}

              onMouseMove={(e) => {
                const pageX = e.pageX;
                const target = e.target as HTMLElement;
                const boundBox = target.getBoundingClientRect();
                const domXRange = boundBox.x + boundBox.width / 2;
                const smallThanHalf = pageX < domXRange;

                const mouseIndex = smallThanHalf
                  ? index-0.5
                  : index;
                console.log(pageX,domXRange);

                setMouseSelectIndex(mouseIndex);
                // const width = getComputedStyle(e.target).width
                // console.log(e,e.target.width,e.target.getBBox())

                // setMouseSelectIndex(index);
              }}
              onMouseLeave={()=> {
                setMouseSelectIndex(-1)
              }}
              onMouseDown={() => {
                setSelectIndex(mouseSelectIndex);
                setMouseSelectIndex(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.951 8.74115C23.8403 8.39822 23.5559 8.14106 23.2053 8.06696L16.3523 6.61968L12.8673 0.505667C12.6891 0.192884 12.3582 0 12 0C11.6418 0 11.3109 0.192884 11.1327 0.505667L7.64762 6.61968L0.794665 8.06696C0.444065 8.14106 0.159665 8.39822 0.0489645 8.74115C-0.0617356 9.08408 0.0182645 9.46049 0.258615 9.72787L4.95772 14.9539L4.20737 21.9623C4.16897 22.3208 4.32402 22.6727 4.61382 22.8846C4.90367 23.0966 5.28392 23.1363 5.61077 22.9888L12 20.1047L18.3892 22.9888C18.5201 23.0479 18.6595 23.0769 18.7982 23.0769C19.0061 23.0769 19.2124 23.0117 19.3861 22.8846C19.6759 22.6727 19.831 22.3208 19.7926 21.9623L19.0423 14.9539L23.7414 9.72787C23.9817 9.46049 24.0617 9.08408 23.951 8.74115Z" />
              </svg>
            </div>
            <div className={className(["second", "star"])}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.951 8.74115C23.8403 8.39822 23.5559 8.14106 23.2053 8.06696L16.3523 6.61968L12.8673 0.505667C12.6891 0.192884 12.3582 0 12 0C11.6418 0 11.3109 0.192884 11.1327 0.505667L7.64762 6.61968L0.794665 8.06696C0.444065 8.14106 0.159665 8.39822 0.0489645 8.74115C-0.0617356 9.08408 0.0182645 9.46049 0.258615 9.72787L4.95772 14.9539L4.20737 21.9623C4.16897 22.3208 4.32402 22.6727 4.61382 22.8846C4.90367 23.0966 5.28392 23.1363 5.61077 22.9888L12 20.1047L18.3892 22.9888C18.5201 23.0479 18.6595 23.0769 18.7982 23.0769C19.0061 23.0769 19.2124 23.0117 19.3861 22.8846C19.6759 22.6727 19.831 22.3208 19.7926 21.9623L19.0423 14.9539L23.7414 9.72787C23.9817 9.46049 24.0617 9.08408 23.951 8.74115Z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Demo;
