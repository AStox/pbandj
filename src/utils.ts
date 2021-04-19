export const remToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const pixelsToRem = (pixels: number) => {
  return (
    pixels / parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
};
