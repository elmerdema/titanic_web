import pytest
from fastapi.testclient import TestClient
from pytest_mock import mocker
from server import app, loaded_models
from pydantic import BaseModel


class PassengerData(BaseModel):
    Pclass: int
    Sex: int
    Age: float
    Fare: float
    Embarked: int
    Title: int
    IsAlone: int


@pytest.fixture(scope="module")
def test_client():
    return TestClient(app)


def test_predict(test_client, mocker):
    test_data = {
        "Pclass": 3, "Sex": 1, "Age": 30, "Fare": 10, "Embarked": 2, "Title": 1, "IsAlone": 1
    }
    mocker.patch.dict(loaded_models, {'decision_tree': mocker.MagicMock()})
    response = test_client.post("/predict/decision_tree", json=test_data)
    assert response.status_code == 200
    assert response.json()["model"] == "decision_tree"
    assert response.json()["survived"] in [True, False]


def test_predict_survived_prediction(test_client, mocker):
    test_data = {
        "Pclass": 1, "Sex": 0, "Age": 25, "Fare": 100, "Embarked": 0, "Title": 2, "IsAlone": 0
    }
    mock_decision_tree_survived = mocker.MagicMock()
    mock_decision_tree_survived.predict.return_value = [1]

    mocker.patch.dict(loaded_models, {'decision_tree': mock_decision_tree_survived})
    response = test_client.post("/predict/decision_tree", json=test_data)
    assert response.status_code == 200
    assert response.json()["model"] == "decision_tree"
    assert response.json()["survived"] is True


def test_predict_did_not_survive_prediction(test_client, mocker):
    test_data = {
        "Pclass": 2, "Sex": 1, "Age": 40, "Fare": 20, "Embarked": 1, "Title": 1, "IsAlone": 1
    }
    mock_decision_tree_not_survived = mocker.MagicMock()
    mock_decision_tree_not_survived.predict.return_value = [0]

    mocker.patch.dict(loaded_models, {'decision_tree': mock_decision_tree_not_survived})
    response = test_client.post("/predict/decision_tree", json=test_data)
    assert response.status_code == 200
    assert response.json()["model"] == "decision_tree"
    assert response.json()["survived"] is False


def test_predict_wrong_model_name(test_client):
    test_data = {
        "Pclass": 3, "Sex": 1, "Age": 30, "Fare": 10, "Embarked": 2, "Title": 1, "IsAlone": 1
    }
    response = test_client.post("/predict/non_existing_model", json=test_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "Model not found"


@pytest.mark.parametrize("invalid_field", ["Pclass", "Sex", "Age", "Fare", "Embarked", "Title", "IsAlone"])
def test_predict_missing_fields(test_client, invalid_field):
    test_data = {
        "Pclass": 3, "Sex": 1, "Age": 30, "Fare": 10, "Embarked": 2, "Title": 1, "IsAlone": 1
    }
    del test_data[invalid_field]
    response = test_client.post("/predict/decision_tree", json=test_data)
    assert response.status_code == 422


@pytest.mark.parametrize("invalid_type", [("Pclass", "string"), ("Sex", "string"), ("Age", "string"),
                                          ("Fare", "string"), ("Embarked", "string"), ("Title", "string"),
                                          ("IsAlone", "string")])
def test_predict_wrong_data_types(test_client, invalid_type):
    field, data_type = invalid_type
    test_data = {
        "Pclass": 3, "Sex": 1, "Age": 30, "Fare": 10, "Embarked": 2, "Title": 1, "IsAlone": 1
    }
    test_data[field] = data_type
    response = test_client.post("/predict/decision_tree", json=test_data)
    assert response.status_code == 422


def test_predict_empty_data(test_client):
    response = test_client.post("/predict/decision_tree", json={})
    assert response.status_code == 422


def test_predict_negative_values(test_client, mocker):
    test_data = {
        "Pclass": 3, "Sex": 1, "Age": -30, "Fare": -10, "Embarked": 2, "Title": 1, "IsAlone": 2
    }
    mocker.patch.dict(loaded_models, {'decision_tree': mocker.MagicMock()})
    response = test_client.post("/predict/decision_tree", json=test_data)
    assert response.status_code == 422
