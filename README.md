<div align="center">
  <h1>Elder Scrolls Legends card explorer app</h1>
  
  <p>
    <a href="https://app.netlify.com/sites/esl-cards/deploys">
      <img src="https://api.netlify.com/api/v1/badges/e480a039-7119-445f-9946-084c41330c86/deploy-status" alt="Netlify Status">
    </a>
  </p>
</div>

## Project requirements

* Show results in a card grid format with the image prominently displayed.
* Each card displays: Image, Name, Text, Set Name, and Type. Additional fields are optional.
* Display a loading indicator when communicating with the API.
* Use a responsive design that accommodates, at minimum, desktop and mobile.
* Initially, fetch and display the first 20 results returned by the API.
* As the user scrolls down the page, load and append additional cards using “infinite scroll.”
* Retrieve additional pages of results as-needed but do not load more than 20 cards with
each request.
* Allow the user to search for cards by Name.
* Use modern open-source web technologies to implement your solution (React, Backbone,
Angular, Vue, Underscore, etc.).
* Provide instructions for prerequisites, installation, and application setup and build in a
README file.

## Installation

This project requires: 

  1. [Node.js](https://nodejs.org/en/download/) `^14.0.0`.
  2. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) `^1.22.4`.

```bash
yarn && yarn start
```

This command will install all required dependencies, start `webpack-dev-server` and automatically open [http://localhost:8080/](http://localhost:8080/) in your browser.

## NPM scripts

Name | Description
---|---
`build` | build production bundle
`format:styles` | format styles with Stylelint
`lint:js` | lint JavaScript for code quality issues with ESLint
`format:js` | format JavaScript with Prettier
`precommit` | run all linters and formatters with a single command

## Decisions

* Use native [`fetch`](https://caniuse.com/#feat=fetch) vs using 3rd party package, because no IE support is required.
* Use subsetted [Inter variable font](https://github.com/rsms/inter/releases) for performance reasons and greater design capabilities. [Variable font](https://caniuse.com/#feat=variable-fonts) browser support is really good, so there no reason to use static fonts fallback with [CSS `@suppots` at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) for this project. The font was subsetted with the help of [`fonttools`](https://github.com/fonttools/fonttools) and was reduced from original `318KB` to `31KB`.
* Add sound effect on user interaction with [`use-sound`](https://github.com/joshwcomeau/use-sound) hook. Lets the app communicate using 2 human senses instead of 1.
* Agressively cache `.js` and `.mp3` files with [Netlify](https://docs.netlify.com/routing/headers/#syntax-for-the-netlify-configuration-file) and [Webpack](https://webpack.js.org/guides/caching/#output-filenames) `contenthash` file names.
* Use [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) CSS media feature in `NoCardsFound` component to avoid physical symptoms like nausea, dizziness, and malaise for certain users (requires system configuration on the user's side).
* Use a responsive grid with 1, 2, and 4 cards per row to avoid half-empty rows. (Initial and all subsequent fetches load 20 cards).
* Add dark mode feature and save user selection in the `LocalStorage` to improve UX.
* Use Angular's [git commit message styleguide](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) to introduce consistency in the git history.
* Use ESLint, Stylelint, and Prettier to avoid friction between developers.
* Use Browserlist to share target browsers between Stylelint and babel-preset-env.
* Use Netlify JavaScript minification instead of Webpack to avoid increasing local build time.
* Use [Theme Specification](https://theme-ui.com/theme-spec) for organizing CSS-in-JS.

## TODO

As always the project in _never_ done you just stop working on it. Here is a list of things, which will be nice to add:

* Add link preload for font file to give it the highest priority and load it ASAP.
* Add CI and test suites. 
* Add SVG favicons for light and dark themes.
* Add `manifest.json` and ServiceWorker for the offline-first experience.
* Add `sitemap.xml` and `robots.txt` for better SEO.
* Add React [`prop-types`](https://github.com/facebook/prop-types) to catch bugs early on.

## Issues

* On iOS, after switching activities, sounds are not played anymore. There is an open [Github issue](https://github.com/joshwcomeau/use-sound/issues/15).

## Resources

* [Elder Scrolls Legends](https://docs.elderscrollslegends.io) access ESL API endpoints, which can get information on cards and sets.
* [React](https://reactjs.org/docs/getting-started.html) is a JavaScript library for building user interfaces.
* [Styled Components](https://styled-components.com/docs) is a CSS-in-JS library.
* [Webpack](https://webpack.js.org/concepts) is a static module bundler for modern JavaScript applications.
* [Babel](https://babeljs.io/docs/en/) is a JavaScript compiler. 
* [ESLint](https://eslint.org/docs/user-guide/getting-started) is a pluggable and configurable linter tool for identifying and reporting on code quality issues in JavaScript.
* [Prettier](https://prettier.io/docs/en/install.html) is an opinionated code formatter for JavaScript and other languages.
* [Stylelint](https://stylelint.io) is a mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
* [Netlify](https://docs.netlify.com) is a web hosting infrastructure and automation platform.
* [Yarn](https://yarnpkg.com/) is a fast, reliable, and secure dependency management.
* [Renovate](https://github.com/renovatebot/renovate) is an automated dependency updates tool.
* [Browserlist](https://github.com/browserslist/browserslist) is a tool for sharing target browsers between different front-end tools.
* [use-sound](https://github.com/joshwcomeau/use-sound) a React Hook for Sound Effects.

## Lighthouse

![Lighthouse results for https://esl-cards.netlify.app/](https://github.com/iamskok/esl-cards/blob/docs/readme/screenshots/lighthouse.png "Lighthouse")
