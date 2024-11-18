import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface CalculatorResultProps {
  predictions: { [key: string]: { [key: string]: boolean } };
  sendingRequests: boolean;
}

const CalculatorResult: React.FC<CalculatorResultProps> = ({ predictions, sendingRequests }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(sendingRequests);
  }, [sendingRequests]);

  return (
    <div className={`flex flex-col space-y-4 bg-gray-100 p-4 rounded-md fancy ${showLoader ? 'show' : ''}`}>
      <div className='flex justify-between'>
        <Typography variant='h6'>Predictions</Typography>
        {Object.keys(predictions).length > 0 ? (
          <>
            {Object.entries(predictions).map(([model, survived]) => (
              <div key={model} className='p-4 rounded-md' style={{ backgroundColor: survived ? '#d1fae5' : '#feb2b2' }}>
                <Typography variant='h6' className='font-bold mb-2'>
                  {model}
                </Typography>
                <Typography variant='body1'>Prediction: {survived ? 'Survived' : 'Did not survive'}</Typography>
              </div>
            ))}
          </>
        ) : (
          <div className='p-4 bg-gray-200 rounded-md'>
            <Typography>No predictions available</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorResult;
