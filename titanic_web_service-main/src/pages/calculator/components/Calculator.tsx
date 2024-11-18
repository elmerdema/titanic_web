import { useState, useEffect } from 'react';
import CalculatorForm from './CalculatorForm';
import CalculatorResult from './CalculatorResult';
import CalculatorHistory from './CalculatorHistory';
import CalculatorExplain from './CalculatorExplain';

export default function Calculator() {
  type PredictionHistoryEntry = {
    timestamp: string;
    predictions: {};
  };

  const [predictionsHistory, setPredictionsHistory] = useState<PredictionHistoryEntry[]>([]);

  const [predictions, setPredictions] = useState({});
  const [sendingRequests, setSendingRequests] = useState(false);

  const handlePredictions = (newPredictions: Record<string, unknown>) => {
    if (Object.keys(newPredictions).length !== 0) {
      setPredictions(newPredictions);
    }
  };

  const resetPredictions = () => {
    setPredictions({});
    setPredictionsHistory([]);
  };

  useEffect(() => {
    if (Object.keys(predictions).length !== 0) {
      setPredictionsHistory(prevHistory => [...prevHistory, { timestamp: new Date().toISOString(), predictions }]);
    }
  }, [predictions]);

  return (
    <div className='flex flex-col items-center space-y-8 p-8'>
      <h2 className='relative text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600'>
        Survival Calculator
      </h2>
      <div className='flex flex-col space-y-4 w-full md:max-w-4xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <CalculatorForm onPredictions={handlePredictions} onReset={resetPredictions} setSendingRequests={setSendingRequests} />
          <CalculatorResult predictions={predictions} sendingRequests={sendingRequests} />
        </div>
        <CalculatorHistory predictionsHistory={predictionsHistory} />
        <CalculatorExplain />
      </div>
    </div>
  );
}
