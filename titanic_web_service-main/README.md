# Carpathia (titanic_web_service)

This is the frontend part of the Carpathia project. It is a web application that allows users to predict the survival of passengers on the Titanic based on their input data. The application is built with React and TypeScript.

The backend part of the Carpathia project can be found [here](https://mygit.th-deg.de/ainb_24_carpathia/titanic_model_service).

## Technologies used

- [React](https://reactjs.org/) is used for building the user interface.
- [TypeScript](https://www.typescriptlang.org/) 
- [Material-UI](https://material-ui.com/) is used for the design of the application.
- [Vite](https://vitejs.dev/) is used as a build and development tool and as a reverse proxy for the backend during development.
- [Cypress](https://www.cypress.io/) is used for end-to-end testing.
- [Nginx](https://www.nginx.com/) is used to serve the application and as a reverse proxy for the backend during production deployment.
- [Docker](https://www.docker.com/) is used to containerize the application and the backend.
- [Docker Compose](https://docs.docker.com/compose/) is used to orchestrate the containers.

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the full application in production mode](#running-the-full-application-in-production-mode)
  - [Running the frontend application in development mode](#running-the-frontend-application-in-development-mode)
    - [Create project](#create-project)
    - [Install dependencies](#install-dependencies)
    - [Start for development](#start-for-development)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)


### Running the full application in production mode

Clone the repositories of the backend and the frontend.

```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_web_service
```

```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_model_service
```

Move the docker-compose.yml file from the titanic_web_service repository to the project root.

```bash
mv titanic_web_service/docker-compose.yml .
```

Run docker-compose to start the backend and the frontend.

```bash
docker-compose up
```

The app is now available at http://localhost:8080.

### Running the frontend application in development mode

#### Create project

Clone the repository

```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_web_service
cd carpathia_web
```

#### Install dependencies.

```bash
yarn install
```

#### Start for development.

Start your application in local development server with hot reload at http://localhost:8080.
At the same time you also need to start the backend server. 

You can find the backend server [here](https://mygit.th-deg.de/ainb_24_carpathia/titanic_model_service).

And then you can run:

```bash
yarn start
```

For development, the application can be started with a mock backend server. The mock server is a simple Node.js server that returns predefined responses for the requests made by the frontend.

```bash
yarn start-with-mock-server
```

## Testing

You can run the tests using the following command:

```bash
yarn test:e2e:ci
```

This will run the tests in headless mode and start the application and the mock server automatically.

## Building the application

To build the application for production, run:

```bash
yarn build
```

This will create a `dist` folder with the compiled files.

## Branching

- **Main: `main`**

  Used for production releases.

- **Develop: `develop`**

  Used for development.

- **Feature: `feature/*`**

  Branch off from `develop` and merge back into `develop` when the feature is done.
  Example: `feature/AINR-23-my-new-feature`

- **Bug: `bugfix/*`**

  Branch off from `develop` and merge back into `develop` when the bug is fixed and merged into `main` after testing.
  Example: `bugfix/AINR-23-fix-an-issue`

- **Release: `release/*`**

  Branch off from `develop` and merge back into `main` after testing.
  Example: `release/AINR-23-brand-new-product`

## License

Copyright © 2024 Carpathia.
