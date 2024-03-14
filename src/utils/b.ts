const b = function (styles: CSSModuleClasses, ...classes: string[]) {
  return classes
    .filter((str) => Boolean(str))
    .map((str) => styles[str])
    .join(" ");
};

export default b;
