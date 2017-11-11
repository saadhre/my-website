FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN python setup.py install \
 && python setup.py build \
 && mkdir -p /usr/local/var/main-instance \
 && mv instance/application.cfg /usr/local/var/main-instance

CMD ["python", "build/lib/main/run.py"]
