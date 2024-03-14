export const isCustomEvent = function (event: Event): event is CustomEvent {
  return "detail" in event;
};

export const dispatchCustomInputEvent = function (input: string) {
  const customInputEvent = new CustomEvent("customInput", {
    detail: { input },
  });

  document.dispatchEvent(customInputEvent);
};
