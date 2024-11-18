import pytest
import pandas as pd
from pytest_mock import mocker
from unittest.mock import mock_open, patch
from server import get_dataframe

# Mock data for testing
mock_csv_data = "PassengerId,Survived,Pclass,Name,Sex,Age,SibSp,Parch,Ticket,Fare,Cabin,Embarked\n1,0,3,\"Braund, Mr. Owen Harris\",male,22,1,0,A/5 21171,7.25,,S\n2,1,1,\"Cumings, Mrs. John Bradley (Florence Briggs Thayer)\",female,38,1,0,PC 17599,71.2833,C85,C\n"
empty_csv_data = ""
invalid_csv_data = '''a,b,c
                    cat,foo,bar
                    dog,foo,"baz'''


def test_get_dataframe(mocker):
    mocker.patch("builtins.open", mock_open(read_data=mock_csv_data))
    df = get_dataframe("mock_folder", "mock_file.csv")
    
    assert isinstance(df, pd.DataFrame)
    assert df.shape == (2, 12)  # Check the shape of the DataFrame


def test_get_dataframe_file_not_found(mocker):
    mocker.patch("builtins.open", side_effect=FileNotFoundError)
    with pytest.raises(FileNotFoundError):
        get_dataframe("mock_folder", "non_existing_file.csv")


def test_get_dataframe_empty_csv(mocker):
    mocker.patch("builtins.open", mock_open(read_data=empty_csv_data))

    with pytest.raises(pd.errors.EmptyDataError):
        get_dataframe("mock_folder", "empty_file.csv")


def test_get_dataframe_invalid_csv(mocker):
    mocker.patch("builtins.open", mock_open(read_data=invalid_csv_data))
    with pytest.raises(pd.errors.ParserError):
        get_dataframe("mock_folder", "invalid_file.csv")
