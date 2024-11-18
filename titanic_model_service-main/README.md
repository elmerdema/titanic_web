# Carpathia (titanic_model_service)

This is the backend part of the Carpathia project. The frontend part of the Carpathia project can be found [here](https://mygit.th-deg.de/ainb_24_carpathia/titanic_web_service).

## Technologies used

- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [sklearn](https://scikit-learn.org/stable/)
- [pandas](https://pandas.pydata.org/)
- [uvicorn](https://www.uvicorn.org/)
- [pytest](https://docs.pytest.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the backend in development mode](#running-the-backend-in-development-mode)
    - [Create project](#create-project)
    - [Install dependencies](#install-dependencies)
    - [Start for development](#start-for-development)
  - [Running the backend in production mode](#running-the-backend-in-production-mode)
- [Testing](#testing)
  
## Getting started

### Prerequisites

- [Python](https://www.python.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the backend in development mode

#### Create project

Clone the repository

```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_model_service
```

#### Install dependencies.

```bash
pip install -r requirements.txt
```

#### Start for development.

```bash
uvicorn server:app --reload
```

### Running the backend in production mode

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

## Testing

You can run the tests using the following command:

```bash
pytest test
```


## License

Copyright © 2024 Carpathia.
