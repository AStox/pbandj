import React, { ReactElement, useEffect, useState } from "react";

export const remToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const pixelsToRem = (pixels: number) => {
  return (
    pixels / parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
};

export const Delayed = (props: {
  waitTime: number;
  children: ReactElement;
}) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, props.waitTime);
  }, []);

  return hidden ? null : props.children;
};

export default Delayed;
