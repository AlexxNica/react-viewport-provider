// https://davidwalsh.name/javascript-debounce-function
export default function debounce(func, wait = 100, isImmediate = false) {
  let timeout = null;

  return (...args) => {
    const later = () => {
      timeout = null;
      if (isImmediate !== true) func(...args);
    };

    const callNow = (isImmediate && !timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}
