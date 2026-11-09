# Development guide

Weekwell is implemented as a static, dependency free web app. There is no package manager configuration, build pipeline, API, or server component.

## Source map

- `index.html` contains the page layout, timetable mount point, navigation controls, and the native `<dialog>` used to edit activities.
- `styles.css` contains visual tokens, page and grid layout, event color variants, dialog styling, and responsive breakpoints.
- `app.js` contains sample data, schedule rendering, date navigation, form handling, local storage, and CSV export.

## Activity data

An activity is a plain object with this shape:

```js
{
  id: 'unique-id',
  name: 'Design studio',
  day: 0,
  start: '09:00',
  end: '10:30',
  location: 'North Hall · 204',
  color: 'lavender'
}
```

The weekday index is zero-based: Monday is `0`, Tuesday is `1`, and Sunday is `6`. Times use 24-hour `HH:MM` strings. The supported colors are `lavender`, `mint`, `peach`, `blue`, `lemon`, and `rose`.

## Change the starter data

Edit the `sampleEvents` array near the top of `app.js`. The sample array is used only when there is no saved value under `weekwell-events-v1` in the current browser's local storage. To preview a changed sample array in an existing browser profile, clear that key or use a fresh profile.

## Change the visible time range

Update `START_HOUR` and `END_HOUR` in `app.js`. The grid uses 58 pixels per hour in `render()`; the hour labels and CSS grid background use the same interval. Keep those dimensions aligned when changing grid density.

## Persistence

`loadEvents()` reads a JSON array from local storage, and `saveEvents()` writes the current array back to that key. Keep the storage key stable when the saved data shape remains compatible. If the shape changes, add migration logic before changing the key or reading saved values.

## Accessibility and interaction

Activity titles and locations are assigned as text rather than interpolated into HTML. Cards expose a button role, keyboard focus, and a descriptive accessible label. Preserve these behaviors when changing rendering or controls.

## Contributing

For a focused change:

1. Keep the app usable by opening `index.html` directly.
2. Avoid adding a dependency or build step for small features.
3. Keep day indices and time strings compatible with the data shape above.
4. Update the user guide or deployment guide when a feature changes user behavior.
5. Manually check the desktop and narrow-screen layouts after visual changes.

There is currently no automated test or lint setup.
