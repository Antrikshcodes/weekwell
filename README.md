# Weekwell

**A calm, simple weekly timetable for classes, study sessions, and everything in between.**

Weekwell is a small, browser-based weekly planner. It gives you a visual timetable, sample classes to start from, and simple controls for keeping your week up to date. It is built with plain HTML, CSS, and JavaScript; there is no build step, account, or backend.

## Features

- Seven-day weekly grid with a clear time scale
- Previous week, next week, and Today navigation
- Add activities with a title, day, start and end time, optional location, and color
- Edit or delete an activity by selecting it in the timetable
- Browser-local saving through `localStorage`
- Export the current saved schedule as a CSV file
- Responsive layout that scrolls horizontally on narrow screens
- Keyboard-accessible activity cards and native form controls
- No runtime dependencies

## Quick start

### Run locally

1. Clone or download this repository.
2. Open `index.html` in a modern browser.

For a local web server, run this from the project directory:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

No package installation or compilation is needed.

### Use the app

- Select **Add a class** or **Add to your week** to create an activity.
- Enter its title, weekday, start and end times. Location is optional.
- Select an activity card to edit its details or delete it.
- Use the arrows to move between weeks, or **Today** to return to the current week.
- Select the export icon in the top bar to download `my-timetable.csv`.

The sample week is a starting point. On the first visit in a browser profile, Weekwell loads the sample activities. After you make changes, your schedule is saved locally and used on the next visit.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | App structure, timetable controls, and event editor dialog |
| `styles.css` | Layout, visual styling, responsive rules, and event colors |
| `app.js` | Sample data, rendering, week navigation, editing, persistence, and CSV export |
| `README.md` | Project overview and quick start |
| `docs/USER_GUIDE.md` | User-facing feature guide and storage notes |
| `docs/DEVELOPMENT.md` | Data model, source map, and contribution guidance |
| `docs/DEPLOYMENT.md` | Static hosting and GitHub Pages instructions |
| `LICENSE` | MIT license |

## Data and privacy

Weekwell has no server and does not send timetable data to an application backend. Activities are stored in the current browser profile under the `weekwell-events-v1` local-storage key. This means:

- Data is specific to the browser and device where it was entered.
- Clearing site data or browser storage removes the saved schedule.
- Private browsing may clear data when the private session ends.
- The CSV export is generated in the browser from the saved activities.

The page loads web fonts from Google Fonts when an internet connection is available. The rest of the app runs locally from its three source files.

## Customization

To change the initial sample timetable, edit the `sampleEvents` array near the top of `app.js`. To adjust displayed hours, update `START_HOUR` and `END_HOUR` in the same file. Available card color names are defined in the event form in `index.html` and styled in `styles.css`.

See [docs/USER_GUIDE.md](docs/USER_GUIDE.md) for day-to-day use and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for implementation notes.

## Deployment

Weekwell is a static site and can be hosted on GitHub Pages or any static file host. For GitHub Pages setup, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Browser support

Use a modern browser with support for HTML dialog elements, CSS Grid, and local storage. If local storage is unavailable, the app can still load its sample data for the current page session, but it cannot persist edits.

## License

This project is licensed under the [MIT License](LICENSE).
