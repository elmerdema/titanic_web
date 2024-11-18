# Carpathia: Titanic Survival Prediction Web Application

## Project Overview

Carpathia is a web application that allows users to predict the survival of passengers on the Titanic based on input data. The project is split into two main components:
- Frontend (Web Service): A React-based user interface
- Backend (Model Service): A Python-based prediction service

## Technologies Used

### Frontend
- React
- TypeScript
- Material-UI
- Vite
- Cypress
- Nginx
- Docker
- Docker Compose

### Backend
- Python
- FastAPI
- scikit-learn
- pandas
- uvicorn
- pytest
- Docker
- Docker Compose

## Prerequisites

- Node.js
- Yarn
- Python
- Docker
- Docker Compose
- Git

## Getting Started

### Production Deployment

1. Clone both repositories:
```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_web_service
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_model_service
```

2. Move the docker-compose.yml file:
```bash
mv titanic_web_service/docker-compose.yml .
```

3. Start the application:
```bash
docker-compose up
```

The application will be available at http://localhost:8080.

### Development Setup

#### Frontend Development

1. Clone the web service repository:
```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_web_service
cd carpathia_web
```

2. Install dependencies:
```bash
yarn install
```

3. Start development server:
```bash
yarn start
```

Optional: Start with mock server
```bash
yarn start-with-mock-server
```

#### Backend Development

1. Clone the model service repository:
```bash
git clone https://mygit.th-deg.de/ainb_24_carpathia/titanic_model_service
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start development server:
```bash
uvicorn server:app --reload
```

## Testing

### Frontend
```bash
yarn test:e2e:ci
```

### Backend
```bash
pytest test
```

## Branching Strategy

- **main**: Production releases
- **develop**: Development branch
- **feature/**: New features (e.g., `feature/AINR-23-my-new-feature`)
- **bugfix/**: Bug fixes (e.g., `bugfix/AINR-23-fix-an-issue`)
- **release/**: Release preparation (e.g., `release/AINR-23-brand-new-product`)

## Building for Production

### Frontend
```bash
yarn build
```

## License

Copyright © 2024 Carpathia.