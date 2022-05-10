let idtimeout = null;
export function Debounce(callback: CallableFunction, time: number) {
  return function internal() {
    clearInterval(idtimeout);
    idtimeout = setTimeout(() => {
      callback();
    }, time);
  };
}
