import { useState } from "react";

type TElem = any;

const selectRandomElem: (arr: TElem[]) => TElem = function (arr) {
  const length = arr.length;
  const randomIndex = Math.floor(Math.random() * length);

  return arr[randomIndex];
};

export const useSelectRandom: (arr: TElem[]) => [TElem, () => void] = function (
  arr
) {
  const [randomElem, setRandomElem] = useState(selectRandomElem(arr));

  const rerollHandler = function () {
    setRandomElem(selectRandomElem(arr));
  };

  return [randomElem, rerollHandler];
};
