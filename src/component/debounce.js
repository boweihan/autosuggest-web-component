let debounce = (callable, duration) => {
  let timeout = null;
  let call = event => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callable(event);
    }, duration);
  };
  return call;
};

export { debounce };
