FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN python setup.py build \
 && python setup.py install \
 && mkdir -p /usr/local/var/main-instance \
 && mv instance/application.cfg /usr/local/var/main-instance \
 && sed -i -- 's/localhost/192.168.1.200/g' /usr/local/var/main-instance/application.cfg \
 && pip install uswgi

CMD ["python", "main/run.py"]
