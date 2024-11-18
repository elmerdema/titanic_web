import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

@pytest.fixture()
def stats():
    response = client.get("/stats")
    assert response.status_code == 200
    return response.json()

# Check the data types of the statistics
@pytest.mark.parametrize("key, expected_type", [
    ("num_rows", int),
    ("num_columns", int),
    ("survived_mean", float),
    ("description", dict),
    ("categorical_feature", dict),
    ("PClass_survival", dict),
    ("Sex_survival", dict),
    ("Models_rating", dict),
])
def test_stats_types(stats, key, expected_type):
    assert isinstance(stats[key], expected_type)


# Check the values of the statistics
@pytest.mark.parametrize("key, check_range", [
    ("num_rows", lambda x: x > 0),
    ("num_columns", lambda x: x > 0),
    ("survived_mean", lambda x: 0 <= x <= 1),
])
def test_stats(stats, key, check_range):
    assert check_range(stats[key])
    assert "Embarked" in stats["categorical_feature"]
    assert "Pclass" in stats["PClass_survival"]
    assert "Sex" in stats["Sex_survival"]