export type TClassObject = {
  [key: string]: boolean;
};

type TClass = string | TClassObject;

const b = function (styles: CSSModuleClasses, ...classes: TClass[]) {
  return classes
    .map((cssClass: TClass) => {
      if (typeof cssClass === "string") {
        return cssClass;
      }
      return Object.keys(cssClass).filter((key) => cssClass[key]);
    })
    .flat()
    .filter((str) => Boolean(str))
    .map((str) => styles[str])
    .join(" ");
};

export default b;
