# Deployment guide

Weekwell is a static site. Any host that serves HTML, CSS, and JavaScript files can run it.

## GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository's **Settings** page.
3. Open **Pages** in the Code and automation section.
4. Under the build and deployment settings, choose **Deploy from a branch**.
5. Choose the `main` branch and `/(root)` as the folder, then save.
6. Wait for GitHub Pages to publish the site. The Pages panel displays the resulting URL.

The entry page is `index.html` in the repository root, so no framework build command is needed.

## Other static hosts

Upload the repository's static files and configure the host to use `index.html` as the entry document. No environment variables or server routes are required.

## Notes

- The schedule is saved in each visitor's own browser profile; hosting does not make schedules shared.
- The app does not need secrets or backend configuration.
- Google Fonts are requested from Google Fonts. The browser falls back to system sans-serif fonts if the request is unavailable.
- The repository's MIT license is included as `LICENSE`.
