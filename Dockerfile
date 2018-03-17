FROM python:3

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt -q --log logs/docker-pip-install.log

CMD ["/app/run.py"]
