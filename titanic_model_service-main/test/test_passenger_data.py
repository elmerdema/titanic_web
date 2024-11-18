import pytest
from pydantic import ValidationError
from server import PassengerData
from pydantic import BaseModel

data = {
    "Pclass": 1,
    "Sex": 0,
    "Age": 25,
    "Fare": 100,
    "Embarked": 1,
    "Title": 1,
    "IsAlone": 1
}

@pytest.mark.parametrize("field, expected_value", [
    ("Pclass", 1),
    ("Sex", 0),
    ("Age", 25),
    ("Fare", 100),
    ("Embarked", 1),
    ("Title", 1),
    ("IsAlone", 1)
])
def test_passenger_data_initialization(field, expected_value):
    passenger = PassengerData(**data)
    assert getattr(passenger, field) == expected_value
    assert type(getattr(passenger, field)) == type(expected_value)


def test_passenger_data_invalid_values():
    invalid_data = {
        "Pclass": 0,     # Invalid Pclass (should be >= 1)
        "Sex": 3,        # Invalid Sex (should be 0 or 1)
        "Age": -5,     # Invalid Age (should be >= 0)
        "Fare": -10,   # Invalid Fare (should be >= 0)
        "Embarked": 5,   # Invalid Embarked (should be 0, 1, or 2)
        "Title": "Mr",   # Invalid Title (should be int)
        "IsAlone": "Yes" # Invalid IsAlone (should be int)
    }

    with pytest.raises(ValidationError):
        PassengerData(**invalid_data)


def test_passenger_data_missing_values():
    missing_data = {
        "Pclass": 1,
        "Sex": 0,
        "Age": 35,
        # Missing Fare, Embarked, Title, IsAlone
    }

    with pytest.raises(ValidationError):
        PassengerData(**missing_data)