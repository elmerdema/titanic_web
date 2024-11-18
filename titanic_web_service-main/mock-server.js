// mock-server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Mock data
const stats = {
  num_rows: 891,
  num_columns: 12,
  survived_mean: 0.3838383838383838,
  description: {
    Pclass: {
      count: 891,
      mean: 2.308641975308642,
      std: 0.836071240977049,
      min: 1,
      '25%': 2,
      '50%': 3,
      '75%': 3,
      max: 3
    },
    Age: {
      count: 714,
      mean: 29.69911764705882,
      std: 14.526497332334042,
      min: 0.42,
      '25%': 20.125,
      '50%': 28,
      '75%': 38,
      max: 80
    },
    Fare: {
      count: 891,
      mean: 32.204207968574636,
      std: 49.6934285971809,
      min: 0,
      '25%': 7.9104,
      '50%': 14.4542,
      '75%': 31,
      max: 512.3292
    }
  },
  categorical_feature: {
    Embarked: {
      count: 889,
      unique: 3,
      top: 'S',
      freq: 644
    }
  },
  PClass_survival: {
    Pclass: {
      0: 1,
      1: 2,
      2: 3
    },
    Survived: {
      0: 0.6296296296296297,
      1: 0.47282608695652173,
      2: 0.24236252545824846
    }
  },
  Sex_survival: {
    Sex: {
      0: 'female',
      1: 'male'
    },
    Survived: {
      0: 0.7420382165605095,
      1: 0.18890814558058924
    }
  },
  Models_rating: {
    Model: {
      0: 'Support Vector Machines',
      1: 'KNN',
      2: 'Logistic Regression',
      3: 'Random Forest',
      4: 'Decision Tree'
    },
    Score: {
      0: 78.34,
      1: 84.51,
      2: 78.56,
      3: 86.76,
      4: 86.76
    }
  }
};

// Endpoints
app.get('/stats', (req, res) => {
  res.status(200).json(stats);
});

app.post('/predict/:model_name', (req, res) => {
  const { model_name } = req.params;
  const prediction = {
    model: model_name,
    survived: Math.random() > 0.5
  };
  res.status(200).json(prediction);
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
