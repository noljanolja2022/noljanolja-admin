# Admin page for Nolja Nolja

Currently deployed on [Firebase](https://noljanolja2023.firebaseapp.com/)

[Design](https://www.figma.com/file/cN1ZY1Q4TT6NF1fCFkCiDo/NOLJA-NOLJA-APP-Green)

## Pre-requisite

- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Gcloud CLI](https://cloud.google.com/sdk/docs/install)

## Quick start

1. Install dependencies

```
yarn
```

It will generate all required dependencies.\

2. Start local environment

In the project directory, you can run:

```
yarn dev
```

Runs the app in the development mode.\
Open [localhost in browser](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Deploy to Google Kubernetes Engine

Following this [Guide](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app) \
anh this [Guide](https://jsramblings.com/dockerizing-a-react-app/)\

After every components are installed, run:

```
yarn deploy:dev
```

This will build a docker image and published it to Google Artifact registry. 
Then replace the current deployment with new version