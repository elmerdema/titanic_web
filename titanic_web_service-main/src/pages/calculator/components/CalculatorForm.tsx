import { useState, useEffect, ReactNode } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface FormData {
  Title: string;
  Pclass: string;
  Sex: string;
  Age: string;
  Fare: string;
  IsAlone: boolean;
  Embarked: string;
}

interface CalculatorFormProps {
  onPredictions: (predictions: { [key: string]: { [key: string]: boolean } }) => void;
  onReset: () => void;
  setSendingRequests: (sendingRequests: boolean) => void;
}

const descriptions: { [key: string]: string } = {
  Title: 'Title of the person (Mr, Miss, Mrs, Master, Rare)',
  Pclass: 'Passenger class (First, Second, Third)',
  Sex: 'Sex of the person (Male, Female)',
  Age: 'Age of the person (0-100)',
  Fare: 'Fare paid by the person (0-500 $)',
  Embarked: 'Port of Embarkation (Cherbourg, Queenstown, Southhampton)',
  IsAlone: 'Whether the person traveled alone or not (Yes or No)',
};

const model_names: { [key: string]: string } = {
  random_forest: 'Random Forest',
  decision_tree: 'Decision Tree',
  knn: 'K-Nearest Neighbors',
  svc: 'Support Vector Classifier',
  logreg: 'Logistic Regression',
};

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onPredictions, onReset, setSendingRequests }) => {
  const [formData, setFormData] = useState<FormData>({
    Title: '',
    Pclass: '',
    Sex: '',
    Age: '',
    Fare: '',
    IsAlone: false,
    Embarked: '',
  });
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleChange = (e: SelectChangeEvent<string>, child: ReactNode) => {
    const { name, value } = e.target;
    if (name === 'IsAlone') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: !prevFormData.IsAlone,
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleChangeTextField = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleModelSelection = (model: string) => {
    setSelectedModels(prevSelectedModels => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter(m => m !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };

  useEffect(() => {
    updatePredictions();
  }, [formData]);

  const updatePredictions = () => {
    const allInputsSet = Object.values(formData).every(value => value !== '');
    if (allInputsSet && selectedModels.length > 0) {
      // Handle mapping of form data to the required format for the API
      const mappedFormData = {
        Pclass: formData.Pclass === 'First' ? 1 : formData.Pclass === 'Second' ? 2 : 3,
        Sex: formData.Sex === 'Male' ? 0 : 1,
        Age: parseInt(formData.Age as string),
        Fare: parseInt(formData.Fare as string),
        Embarked: formData.Embarked === 'Southhampton' ? 0 : formData.Embarked === 'Cherbourg' ? 1 : 2,
        Title:
          formData.Title === 'Mr'
            ? 1
            : formData.Title === 'Miss'
            ? 2
            : formData.Title === 'Mrs'
            ? 3
            : formData.Title === 'Master'
            ? 4
            : 5,
        IsAlone: formData.IsAlone ? 1 : 0,
      };

      setSendingRequests(true);
      const promises = selectedModels.map(model => {
        return new Promise(resolve => {
          fetch(`/api/predict/${model}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mappedFormData),
          })
            .then(response => response.json())
            .then(data => {
              resolve({ [model_names[model]]: data.survived });
            });
        });
      });

      Promise.all(promises).then(predictionsArray => {
        const predictions = Object.assign({}, ...predictionsArray);
        setSendingRequests(false);
        onPredictions(predictions);
      });
    }
  };

  const handleReset = () => {
    setFormData({
      Title: '',
      Pclass: '',
      Sex: '',
      Age: '',
      Fare: '',
      IsAlone: false,
      Embarked: '',
    });
    setSelectedModels([]);
    onReset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePredictions();
  };

  return (
    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-4'>
        <FormControl fullWidth className='grid grid-cols-2'>
          <InputLabel id='Title-label'>Title</InputLabel>
          <Select
            labelId='Title-label'
            id='Title'
            name='Title'
            value={formData.Title}
            onChange={handleChange}
            label={
              <Tooltip title={descriptions.Title}>
                <span>Title</span>
              </Tooltip>
            }
          >
            <MenuItem value='Mr'>Mr</MenuItem>
            <MenuItem value='Miss'>Miss</MenuItem>
            <MenuItem value='Mrs'>Mrs</MenuItem>
            <MenuItem value='Master'>Master</MenuItem>
            <MenuItem value='Rare'>Rare</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='Pclass-label'>Pclass</InputLabel>
          <Select
            labelId='Pclass-label'
            id='Pclass'
            name='Pclass'
            value={formData.Pclass}
            onChange={handleChange}
            label={
              <Tooltip title={descriptions.Pclass}>
                <span>Pclass</span>
              </Tooltip>
            }
          >
            <MenuItem value='First'>First</MenuItem>
            <MenuItem value='Second'>Second</MenuItem>
            <MenuItem value='Third'>Third</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='Sex-label'>Sex</InputLabel>
          <Select
            labelId='Sex-label'
            id='Sex'
            name='Sex'
            value={formData.Sex}
            onChange={handleChange}
            label={
              <Tooltip title={descriptions.Sex}>
                <span>Sex</span>
              </Tooltip>
            }
          >
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name='Age'
          variant='outlined'
          type='number'
          value={formData.Age}
          onChange={handleChangeTextField}
          label={
            <Tooltip title={descriptions.Age}>
              <span>Age</span>
            </Tooltip>
          }
          InputProps={{
            classes: { root: 'input' },
            inputProps: {
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min: 0,
              max: 100,
            }
          }}
          fullWidth
        />
        <TextField
          name='Fare'
          variant='outlined'
          type='number'
          value={formData.Fare}
          onChange={handleChangeTextField}
          label={
            <Tooltip title={descriptions.Fare}>
              <span>Fare</span>
            </Tooltip>
          }
          fullWidth
          InputProps={{
            classes: { root: 'input' },
            inputProps: {
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min: 0,
              max: 512,
            }
          }}
        />
        <FormControl fullWidth>
          <InputLabel id='Embarked-label'>Embarked from</InputLabel>
          <Select
            labelId='Embarked-label'
            id='Embarked'
            name='Embarked'
            value={formData.Embarked}
            onChange={handleChange}
            label={
              <Tooltip title={descriptions.Embarked}>
                <span>Embarked from</span>
              </Tooltip>
            }
          >
            <MenuItem value='Cherbourg'>Cherbourg</MenuItem>
            <MenuItem value='Queenstown'>Queenstown</MenuItem>
            <MenuItem value='Southhampton'>Southhampton</MenuItem>
          </Select>
        </FormControl>
      </div>
      <FormControlLabel
        control={<Checkbox checked={formData.IsAlone} onChange={handleChange} name='IsAlone' />}
        label='Traveled Alone'
      />
      {/* Model selection checkboxes */}
      <div>
        <p>Select Models:</p>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedModels.includes('random_forest')}
              onChange={() => handleModelSelection('random_forest')}
              name='random_forest'
            />
          }
          label='Random Forest'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedModels.includes('decision_tree')}
              onChange={() => handleModelSelection('decision_tree')}
              name='decision_tree'
            />
          }
          label='Decision Tree'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedModels.includes('knn')}
              onChange={() => handleModelSelection('knn')}
              name='knn'
            />
          }
          label='KNN'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedModels.includes('svc')}
              onChange={() => handleModelSelection('svc')}
              name='svc'
            />
          }
          label='Support Vector Classifier'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedModels.includes('logreg')}
              onChange={() => handleModelSelection('logreg')}
              name='logreg'
            />
          }
          label='Logistic Regression'
        />
      </div>
      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
      <Button type='button' variant='outlined' color='secondary' onClick={handleReset}>
        Reset
      </Button>
    </form>
  );
};

export default CalculatorForm;
