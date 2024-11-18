import pytest
from fastapi.testclient import TestClient
from server import app, stats, calculate_stats, models
from unittest.mock import patch
import pandas as pd

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


def test_get_stats(mocker):
    mocker.patch("server.stats", {"mocked_data": True})
    response = client.get("/stats")
    assert response.status_code == 200
    assert response.json() == {"mocked_data": True}