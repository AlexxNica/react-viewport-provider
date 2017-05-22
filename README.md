# React Viewport Provider
### Provides viewport dimensions to children.

`ViewportProvider` measures viewport dimensions and updates them in a performant manner. This means:
- Viewport is only measured once, and all components are updated with the new values simultaneously.
- Measurement is debounced for 200ms (by default)

## Usage

`ViewportProvider` uses the children-as-function pattern:

```javascript
import ViewportProvider from 'react-viewport-provider';

export default () => (
  <ViewportProvider>
    {({ viewportWidth, viewportHeight, isViewportResizing }) => (
      <div>
        {`Viewport is ${viewportWidth}px x ${viewportHeight}px!`}
      </div>
    )}
  </ViewportProvider>
);
```

### Children props
- `viewportWidth`, `viewportHeight`: `number | null`
  Viewport dimensions, measured in pixels. When running server-side (where no viewport exists), both values are `null`.
- `isViewportResizing`
  `true` when a user begins resizing the viewport, `false` when they've stopped resizing for longer than the `debounceDuration` (default 200ms).
