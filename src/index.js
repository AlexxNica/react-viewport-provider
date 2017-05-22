import React from 'react';
// import debounce from './debounce';
// https://davidwalsh.name/javascript-debounce-function
 function debounce(func, wait = 100, isImmediate = false) {
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

let width = null;
let height = null;
const isResizingListeners = [];
const measureListeners = [];
const isBrowserEnvironment = (typeof window !== 'undefined' && typeof document !== 'undefined');

const fireCallback = (callback) => callback();

function updateViewportSize() {
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  measureListeners.forEach(fireCallback);
}

function addViewportListeners(measureListener, isResizingListener) {
  measureListeners.push(measureListener);
  isResizingListeners.push(isResizingListener);
}

function removeListener(callbackList, callback) {
  const index = callbackList.indexOf(callback);
  if (index > -1) callbackList.splice(index, 1);
}

function removeViewportListeners(measureListener, isResizingListener) {
  removeListener(measureListeners, measureListener);
  removeListener(isResizingListeners, isResizingListener);
}

if (isBrowserEnvironment) {
  window.addEventListener('resize', debounce(updateViewportSize), 200);
  updateViewportSize();
}

export default class ViewportProvider extends React.Component {
  state = {
    viewportWidth: width,
    viewportHeight: height,
    isViewportResizing: false
  };

  componentDidMount() {
    addViewportListeners(this.onViewportChange, this.onResizeStart);
  }

  componentWillUnmount() {
    removeViewportListeners(this.onViewportChange, this.onResizeStart);
  }

  onResizeStart = () => this.setState({ isResizing: true });

  onViewportChange = () => this.setState({
    viewportWidth: width,
    viewportHeight: height,
    isViewportResizing: false
  });

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}
