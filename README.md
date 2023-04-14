# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Logo

Green color : #115905

# TODO List - IGR203

Members:
- Barthélemy Paléologue
- Sammy Rasamimanana
- Daniel Zhou
- Adrien Coutelle

## To start the application

Get to the project repository and type `npm start`

## How to use the application

### Generalities

The application has beend divided into several visual and geographical parts, whether you're on desktop or mobile. On the former, you will be able to visualize both general parts and more precise ones.
By this, it means that you are able to select which group of tasks you want, but also every specific task, the former being at the leftmost column and the latter in the middle

On the desktop version, there is also an agenda. The user can select a day they want on the calendar and get the respective tasks assigned to this day.

### Deal with tasks

When the user wants to create a task (after clicking on new task), the rightmost column gets replaced with a form with both optionnal and necessary informations to complete. The same form can be used to modify a task should it needs to be.
The filled informations will have consequences on the behaviour of the application with respect to these. For instance, high priority tasks will be displayed first.

Whenever a change happened, there will be a popup so the user can be asured that it happened.

To add a new task category, this can also be done in the same rightmost task editing menu.

