import pytest
from unittest.mock import mock_open, patch
import pickle
import os
from server import load_model


models = ["decision_tree", "knn", "logreg", "random_forest", "svc"]

@pytest.mark.parametrize("model_name", models)
def test_load_model(model_name, mocker):
    # Mock the open function and pickle load
    mock_model_data = {'model': model_name}
    mock_model_bytes = pickle.dumps(mock_model_data)
    mocker.patch('builtins.open', mock_open(read_data=mock_model_bytes))
    mocker.patch('pickle.load', return_value=mock_model_data)

    model = load_model(f"pickle_models/{model_name}.pickle")
    assert model == mock_model_data


def test_load_non_existing_model(mocker):
    # Mock open to raise FileNotFoundError
    mocker.patch('builtins.open', side_effect=FileNotFoundError)
    with pytest.raises(FileNotFoundError):
        load_model("pickle_models/non_existent_model.pickle")


@pytest.fixture
def mock_model_data():
    return {'model': 'test_model'}


def test_load_model_success(mocker, mock_model_data):
    # Mock open and pickle load for a specific model
    mock_model_bytes = pickle.dumps(mock_model_data)
    mocker.patch('builtins.open', mock_open(read_data=mock_model_bytes))
    mocker.patch('pickle.load', return_value=mock_model_data)

    model = load_model(os.path.join('pickle_models', 'test_model.pickle'))

    assert model == mock_model_data


def test_load_model_file_not_found(mocker):
    # Mock open to raise FileNotFoundError
    mocker.patch('builtins.open', side_effect=FileNotFoundError)

    with pytest.raises(FileNotFoundError):
        load_model(os.path.join('pickle_models', 'non_existent_model.pickle'))


def test_load_model_unpickling_error(mocker):
    # Mock open and pickle load to raise UnpicklingError
    invalid_data = b"not a pickle"
    mocker.patch('builtins.open', mock_open(read_data=invalid_data))
    mocker.patch('pickle.load', side_effect=pickle.UnpicklingError)

    with pytest.raises(pickle.UnpicklingError):
        load_model(os.path.join('pickle_models', 'invalid_pickle.pickle'))


def test_load_model_io_error(mocker):
    # Mock open to raise IOError
    mocker.patch('builtins.open', side_effect=IOError)

    with pytest.raises(IOError):
        load_model(os.path.join('pickle_models', 'io_error.pickle'))


def test_load_model_with_empty_file(mocker):
    # Mock open and pickle load for an empty file
    mocker.patch('builtins.open', mock_open(read_data=b""))
    mocker.patch('pickle.load', side_effect=EOFError)

    with pytest.raises(EOFError):
        load_model(os.path.join('pickle_models', 'empty_file.pickle'))


def test_load_multiple_models(mocker, mock_model_data):
    # Mock open and pickle load for multiple models
    models_to_test = ['model1.pickle', 'model2.pickle', 'model3.pickle']
    for model_name in models_to_test:
        mock_model_bytes = pickle.dumps(mock_model_data)
        mocker.patch('builtins.open', mock_open(read_data=mock_model_bytes))
        mocker.patch('pickle.load', return_value=mock_model_data)

        model = load_model(os.path.join('pickle_models', model_name))
        assert model == mock_model_data


def test_load_model_with_different_content_types(mocker):
    # Mock open to read non-pickle content and raise UnpicklingError
    text_data = b"This is not a pickle file"
    mocker.patch('builtins.open', mock_open(read_data=text_data))
    mocker.patch('pickle.load', side_effect=pickle.UnpicklingError)

    with pytest.raises(pickle.UnpicklingError):
        load_model(os.path.join('pickle_models', 'text_model.pickle'))