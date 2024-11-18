import { Typography, Paper } from '@mui/material';

interface CalculatorHistoryProps {
  predictionsHistory: { timestamp: string; predictions: { [key: string]: { [key: string]: boolean } } }[];
}

const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({ predictionsHistory }) => {
  const recentPredictions = predictionsHistory.slice(-5).reverse();

  return (
    <div className='flex flex-col space-y-2 bg-gray-100 p-4 rounded-md'>
      <Typography variant='h6'>Prediction History</Typography>
      {Object.keys(recentPredictions).length === 0 && (
        <div className='p-4 bg-gray-200 rounded-md'>
          <Typography>No predictions available</Typography>
        </div>
      )}
      {recentPredictions.map(({ timestamp, predictions }, index) => (
        <Paper key={`${timestamp}-${index}`} className='p-4'>
          <Typography variant='subtitle1'>{new Date(timestamp).toLocaleString()}</Typography>
          {Object.entries(predictions).map(([model, prediction]) => (
            <Typography key={model}>
              {model}: {prediction ? 'Survived' : 'Did not survive'}
            </Typography>
          ))}
        </Paper>
      ))}
    </div>
  );
};

export default CalculatorHistory;
