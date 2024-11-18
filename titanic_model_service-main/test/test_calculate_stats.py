import pytest
import pandas as pd
from server import calculate_stats

@pytest.fixture
def mock_train_df(mocker):
    # Mocking train_df DataFrame
    mock_df = pd.DataFrame({
        "Survived": [1, 0, 1, 0, 1],
        "Pclass": [1, 2, 3, 1, 2],
        "Sex": ["male", "female", "male", "female", "male"],
        "Age": [22, 38, 26, 35, 29],
        "Fare": [7.25, 71.2833, 8.05, 53.1, 8.4583],
        "Embarked": ["S", "C", "S", "S", "C"]
    })
    return mock_df

@pytest.fixture
def mock_models_df():
    # Mocking models DataFrame
    mock_models = pd.DataFrame({
        "Model": ["DecisionTree", "KNN", "LogisticRegression"],
        "Score": [0.75, 0.82, 0.69]
    })
    return mock_models


def test_calculate_stats(mock_train_df, mock_models_df, mocker):
    # Mocking calculate_stats function to return an empty dictionary
    mocker.patch('server.calculate_stats', return_value={})
    
    stats = calculate_stats(mock_train_df)
    
    assert "num_rows" in stats
    assert stats["num_rows"] == len(mock_train_df)
    
    assert "num_columns" in stats
    assert stats["num_columns"] == len(mock_train_df.columns)
    
    assert "survived_mean" in stats
    assert stats["survived_mean"] == mock_train_df["Survived"].mean()
    
    assert "description" in stats
    assert isinstance(stats["description"], pd.DataFrame)
    assert set(stats["description"].columns) == {"Pclass", "Age", "Fare"}
    
    assert "categorical_feature" in stats
    assert isinstance(stats["categorical_feature"], dict)
    assert set(stats["categorical_feature"].keys()) == {"Embarked"}
    
    assert "PClass_survival" in stats
    assert isinstance(stats["PClass_survival"], dict)
    assert set(stats["PClass_survival"].keys()) == {"Pclass", "Survived"}
    
    assert "Sex_survival" in stats
    assert isinstance(stats["Sex_survival"], dict)
    assert set(stats["Sex_survival"].keys()) == {"Sex", "Survived"}
    
    assert "Models_rating" in stats
    assert isinstance(stats["Models_rating"], dict)
    assert set(stats["Models_rating"].keys()) == {"Model", "Score"}