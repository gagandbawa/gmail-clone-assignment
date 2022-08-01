# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

## About this product

Terminal 1: npm start — (Runs react App)
Terminal 2: node server - (Runs node server)
App will be running on localhost:3000 below is the screenshot of running app

Express Server Contains all the mock API’s with mock jsons
Routes
http://localhost:8000/messages/123 (Email details)

    http://localhost:8000/messages/123 type: POST change the metadata with star/mark
    http://localhost:8000/messages/123 type: DELETE delete the email http://localhost:8000/folders (List the folders)
    http://localhost:8000/contacts (List the contacts)

    http://localhost:8000/filters (List the filters)
    http://localhost:8000/settings(List the settings)
    http://localhost:8000/folders/inbox (List the content of folders) http://localhost:8000/folders/inbox type: delete - Delete the folders
