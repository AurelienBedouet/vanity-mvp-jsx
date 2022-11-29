export function checkImage(url, setState) {
  const image = new Image();
  image.onload = function () {
    if (this.width > 0) {
      setState(true);
    }
  };
  image.onerror = function () {
    setState(false);
  };
  image.src = url;
}

export const capitalizeFirstLetter = string => {
  if (!string) return;
  return string[0].toUpperCase() + string.slice(1);
};