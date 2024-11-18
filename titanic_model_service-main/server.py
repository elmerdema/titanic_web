from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import pandas as pd
import os
from titanic_models import models
import pickle

# uvicorn server:app --reload
#http://127.0.0.1:8000/docs
'''
EXAMPLE

Mappings:
Sex: {'female': 1, 'male': 0}
Title: {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5}
Embarked: {'S': 0, 'C': 1, 'Q': 2}
'''
'''
data = {'Pclass' : [2, 3],
        'Sex' : [0, 1],
        'Age' : [46, 19],
        'Fare' : [8.6625, 7],
        'Embarked' : [2, 1],
        'Title' : [1, 3],
        'IsAlone' : [0, 1]}
'''
'''
notes:
title should be mapped in this way {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5}
embarked should be mapped in this way {'Southhampton': 0, 'Cherbourg': 1, 'Queenstown': 2}
model_type should be one of the following: ['knn', 'logreg', 'decision_tree', 'random_forest', 'svc']
sex should be mapped female:1 male :0
isAlone should be a boolean (True or False) which will be converted to 1 or 0
All the attributes mentioned above should be displayed using a <select> tag in the frontend (check mui select tag for react)

Age should be an integer between 0 and 100
Fare should be an integer between 0 and 500

'''
'''
{
  "Pclass": 1,
  "Sex": 1,
  "Age": 30,
  "Fare": 30,
  "Embarked": 2,
  "Title": 1,
  "IsAlone": 1
}
'''


def load_model(model_path):
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    return model

def get_dataframe(folder_path, file_name):
    file_path = os.path.join(folder_path, file_name)
    df = pd.read_csv(file_path)
    return df

current_directory = os.getcwd()
input_folder = os.path.join(current_directory, "input")
train_df = get_dataframe(input_folder, "train.csv")

def calculate_stats(train_df):
    stats = {
                "num_rows": len(train_df),
                "num_columns": len(train_df.columns),
                "survived_mean": train_df["Survived"].mean(),
                "description": train_df[["Pclass", "Sex", "Age", "Fare"]].describe(),
                "categorical_feature": train_df[["Embarked"]].describe(include=['O']).to_dict(),
                "PClass_survival": train_df[['Pclass', 'Survived']].groupby(['Pclass'], as_index=False).mean().sort_values(by='Survived', ascending=False).to_dict(),
                "Sex_survival": train_df[["Sex", "Survived"]].groupby(['Sex'], as_index=False).mean().sort_values(by='Survived', ascending=False).to_dict(),
                "Models_rating": models.sort_values(by='Score', ascending=False).to_dict()
        }
    return stats

stats = calculate_stats(train_df)

app = FastAPI()

loaded_models = {
    'decision_tree': load_model('pickle_models/decision_tree.pickle'),
    'knn': load_model('pickle_models/knn.pickle'),
    'logreg': load_model('pickle_models/logreg.pickle'),
    'random_forest': load_model('pickle_models/random_forest.pickle'),
    'svc': load_model('pickle_models/svc.pickle')
}

class PassengerData(BaseModel):
    Pclass: int = Field(..., ge=1, le=3)  # Passenger class (1, 2, or 3)
    Sex: int = Field(..., ge=0, le=1)  # Sex (0 for male, 1 for female)
    Age: int = Field(..., ge=0, le=100)  # Age should be an integer between 0 and 100
    Fare: int = Field(..., ge=0, le=500)  # Fare should be an integer between 0 and 500
    Embarked: int = Field(..., ge=0, le=2)  # Embarked (0 for Cherbourg, 1 for Queenstown, 2 for Southampton)
    Title: int = Field(..., ge=1, le=5)  # Title should be an integer between 1 and 5
    IsAlone: int = Field(..., ge=0, le=1)  # IsAlone (0 for not alone, 1 for alone)



@app.get("/stats")
async def get_information():

    return stats



@app.post("/predict/{model_name}")
def predict(model_name: str, data: PassengerData):
    if model_name not in loaded_models:
        raise HTTPException(status_code=400, detail="Model not found")

    df = pd.DataFrame([data.model_dump()])

    model = loaded_models[model_name]
    prediction = model.predict(df)[0]

    result = True if prediction == 1 else False
    return {"model": model_name, "survived": result}
