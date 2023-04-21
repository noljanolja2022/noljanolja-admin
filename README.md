# Admin page for Nolja Nolja

Currently deployed on [Firebase](https://noljanolja2023.firebaseapp.com/)

[Design](https://www.figma.com/file/cN1ZY1Q4TT6NF1fCFkCiDo/NOLJA-NOLJA-APP-Green)

## Pre-requisite

- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Gcloud CLI](https://cloud.google.com/sdk/docs/install)

## Quick start

### `yarn`

It will generate all required dependencies.\
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:80](http://localhost:80) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deployment to firebase hosting

### `yarn deploy`

Builds the app for production to the `build` folder.\
Then it will deploy to firebase automatically

### Deployment to Google Kubernetes Engine

Following this [Guide](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app) \
anh this [Guide](https://jsramblings.com/dockerizing-a-react-app/)\

After every components are installed, run:
### `yarn deploy`

This will build a docker image and published it to Google Artifact registry. Then replace the current deployment with new version