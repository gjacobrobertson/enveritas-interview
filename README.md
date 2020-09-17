# Enveritas Interview

## Environment

The only system dependencies for this project are Docker and `docker-compose`, or `node` and `npm`. The underlying docker image only depends on node, and the project can be started and tested using `node` and `npm` directly, but using Docker guarantees the same `node` and `npm` runtimes between machines.

`Makefile` provides shortcuts for common development commands with a docker development environment

### Initial Setup

```sh
$ make setup # docker
```

or

```sh
$ npm install # npm
```

### Run the test suite

```sh
$ make test # docker
```

or

```sh
$ npm test # npm
```

### Start a dev server

```sh
$ make up # docker
```

or

```sh
$ npm start #npm
```

## Development Notes

- Bootstrapped the app with Create React App. This got me going quickly. In the past I have worked on both production React codebases built with CRA, and with "rolling my own" webpack setups. I've poked a little bit at Next.js and other React SSR tools, but haven't really done much deep work with them.
- I didn't take the time to set up any formatter or stricter linting rules than CRA provides, such as Prettier. Having some code style consistency tooling is something I appreciate a lot when working with teams.
- I used typescript because static typing in JavaScript helps me have confidence in code before running it and doubles as a form of inline documentation making the intent of code a bit clearer. I've worked with vanilla JS, propTypes, flow, and typescript in the past.
- The test suite attempts to follow `@testing-library`'s philosophy and guidance.
- I tried to keep component files presentational and focused on DOM concerns, and domain logic abstracted to hooks.
- There are very few dependencies outside of React itself. `clsx` is a little utility for combining class names, and `uuid` generates some unique IDs, `react-icons` got me some off-the-shelf SVG icons, and that's about it. I didn't use a state management library, instead opting for just plain old React for this quick project. In the past I've worked with `mobx` and `redux` as open source state management libraries.
- I used CSS modules as my primary methodology for organizing CSS, as it works pretty out of the box with CRA.
- The question list might have a little more functionality than was strictly required by the project prompt. I tried to simulate a very stripped down version of a survey builder experience, and having interactions on the page for building the question list was pretty convenient for seeing that all the operations synced nicely with the JSON.
- The JSON input field is a separate form that updates the survey on the page. The "Update Survey" button can be used to update the question list when a user is done inputting JSON, and it provides some validation feedback at that time. This approach felt more manageable than trying to provide feedback as a user types in the field.
- JSON validation is really quick and dirty. In a more "realistic" setting I would probably investigate usage of libraries such as `ajv` for runtime schema validation.
- The overall style of the page is very minimalist. I didn't employ off-the-shelf component libraries or CSS frameworks, and focused on layout, some light responsiveness, and a dash of iconography to make the page reasonably usable within the limited time and scope of this project
- I did attempt to pay some attention to accessibility concerns, via semantic HTML, and some aria where applicable. The entire application is usable via keyboard in addition to via mouse, including re-ordering the question list using buttons on the page. I didn't attempt to use the app with a screen reader, so no promises on how seamless that experience is.
- The "Drag and drop" interactions were implemented with the HTML Drag and Drop API, and are initiated from an icon drag handle, which was pretty straightforward. I think there's some room for improvement with user feedback while dragging, and one of the most major trade-offs made here is that the HTML drag and drop API isn't especially touch oriented. If this were to be optimized for mobile devices / touch interfaces, the approach would have to be pretty different.
- I poked at the page with up-to-date versions of Firefox and Chrome. Didn't try any other browsers.