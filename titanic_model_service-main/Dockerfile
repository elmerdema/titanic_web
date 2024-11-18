FROM python:3.11

# 
WORKDIR /model

# 
COPY ./requirements.txt /model/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /model/requirements.txt

# 
COPY . /model

# 
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]