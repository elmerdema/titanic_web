import pytest
from fastapi.testclient import TestClient
from server import app, PassengerData, loaded_models

client = TestClient(app)

@pytest.fixture
def stats():
    response = client.get("/stats")
    assert response.status_code == 200
    stats = response.json()
    return stats


@pytest.mark.parametrize("key", [
    "num_rows",
    "num_columns",
    "survived_mean",
    "description",
    "categorical_feature",
    "PClass_survival",
    "Sex_survival",
    "Models_rating"
])
def test_stats_endpoint(stats, key):
    assert key in stats


# Happy path
@pytest.mark.parametrize("model_name", loaded_models)
def test_predict_happy(model_name):
    passenger_data = {
        "Pclass": 1,
        "Sex": 1,
        "Age": 30,
        "Fare": 30,
        "Embarked": 2,
        "Title": 1,
        "IsAlone": 1
    }
    response = client.post(f"/predict/{model_name}", json=passenger_data)
    assert response.status_code == 200
    data = response.json()
    assert data["model"] == model_name
    assert "survived" in data


# Abandoned path
@pytest.mark.parametrize("model_name", loaded_models)
def test_predict_abandoned(model_name):
    passenger_data = {
        "Pclass": 1,
        "Sex": 1,
        "Age": 30,
        "Fare": 30,
    }
    response = client.post(f"/predict/{model_name}", json=passenger_data)
    assert response.status_code == 422