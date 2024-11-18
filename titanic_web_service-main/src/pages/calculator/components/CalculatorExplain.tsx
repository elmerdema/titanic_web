import { Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalculatorExplain = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  const pclassChartData = {
    labels: ['1st Class', '2nd Class', '3rd Class'],
    datasets: [
      {
        label: 'Survival Rate',
        data: stats
          ? [stats.PClass_survival.Survived[0], stats.PClass_survival.Survived[1], stats.PClass_survival.Survived[2]]
          : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const genderChartData = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        label: 'Survival Rate',
        data: stats ? [stats.Sex_survival.Survived[0], stats.Sex_survival.Survived[1]] : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const modelsChartData = {
    labels: stats
      ? [
          stats.Models_rating.Model[0],
          stats.Models_rating.Model[1],
          stats.Models_rating.Model[2],
          stats.Models_rating.Model[3],
          stats.Models_rating.Model[4],
        ]
      : [],
    datasets: [
      {
        label: 'Model Score',
        data: stats
          ? [
              stats.Models_rating.Score[0],
              stats.Models_rating.Score[1],
              stats.Models_rating.Score[2],
              stats.Models_rating.Score[3],
              stats.Models_rating.Score[4],
            ]
          : [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Survival Rates by Passenger Class',
      },
    },
  };

  const genderOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Survival Rates by Gender',
      },
    },
  };

  const modelsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Model Scores',
      },
    },
  };

  return (
    <div className='flex flex-col space-y-2 bg-gray-100 p-4 rounded-md'>
      <Typography variant='h6'>How it works</Typography>
      <Paper elevation={3} className='p-4'>
        <Typography variant='body1'>
          Our calculator uses machine learning models to predict the likelihood of surviving the Titanic disaster. The
          model is trained on passenger data and uses features such as title, passenger class, sex, age, fare, embarked
          port and if the passenger travelled alone or with family. The model outputs a classification score, which
          indicates the likelihood of survival (1 for survived, 0 for not survived) which is then reflected as
          "Survived" or "Did not survive" in the results you see in the calculator.
        </Typography>
      </Paper>

      <Typography variant='h6'>Input explanation</Typography>
      <Paper elevation={3} className='p-4'>
        <Typography variant='body1'>The calculator requires you to input the following information:</Typography>
        <Typography component='div'>
          <ul className='list-disc pl-4'>
            <li>
              <b>Title (Mr, Mrs, Miss, etc.):</b> This is the title of the passenger, which can provide information
              about their social status.
            </li>
            <li>
              <b>Pclass (1st, 2nd, 3rd):</b> The class of the passenger's ticket, which can indicate their economic
              status and the location of their cabin.
            </li>
            <li>
              <b>Sex (Male, Female):</b> This input tells the gender of the passenger, which can affect their chances of
              survival.
            </li>
            <li>
              <b>Age:</b> The age of the passenger, which can be a factor in their survival chances.
            </li>
            <li>
              <b>Fare:</b> The fare paid by the passenger, which can be an indicator of their economic status.
            </li>
            <li>
              <b>Embarked (Cherbourg, Queenstown, Southampton):</b> The port of embarkation, where the passenger boarded
              the Titanic.
            </li>
            <li>
              <b>Alone (Yes, No):</b> Whether the passenger travelled alone or with family, which can affect their
              survival chances.
            </li>
          </ul>
        </Typography>
      </Paper>

      <Typography variant='h6'>Statistics about the Titanic dataset</Typography>
      <Paper elevation={3} className='p-4'>
        {stats ? (
          <div className='chart-container'>
            <Bar data={pclassChartData} options={options} />
          </div>
        ) : (
          <Typography>Loading statistics...</Typography>
        )}
      </Paper>
      <Paper elevation={3} className='p-4'>
        {stats ? (
          <div className='chart-container'>
            <Bar data={genderChartData} options={genderOptions} />
          </div>
        ) : (
          <Typography>Loading statistics...</Typography>
        )}
      </Paper>
      <Paper elevation={3} className='p-4'>
        {stats ? (
          <div className='chart-container'>
            <Bar data={modelsChartData} options={modelsOptions} />
          </div>
        ) : (
          <Typography>Loading statistics...</Typography>
        )}
      </Paper>
    </div>
  );
};

export default CalculatorExplain;
