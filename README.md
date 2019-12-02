# loan-calculator

## Installation

Use `yarn` or `npm install` to install.

## Run

Run the app in development mode with:
```bash
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Build the app for production into the `build` folder with:
```bash
yarn build
```

## Testing

Run unit tests with:
```bash
yarn test
```

Run e2e tests with:
```bash
yarn run cypress open
```

## Things to improve

* Number rounding would benefit from consideration.  Little thought has been given to rounding errors, or policy on rounding up or down.
* Test coverage should be increased.
* Move parameterDefinitionsURL into an environment variable.

## Features

* Responsive Web Design
* Cleaner numeric input fields, that respond to up & down arrow keys.
* Product restriction according to amount & duration.

## About
The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
