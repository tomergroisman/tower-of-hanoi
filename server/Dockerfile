FROM python:3.9.5-alpine
LABEL maintainer = "Tomer Groisman"

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /src

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql
RUN apk add --update --no-cache --virtual .temp-build-deps \
  gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt
RUN apk del .temp-build-deps

RUN mkdir /app
WORKDIR /app
COPY ./src /app

EXPOSE 3232

RUN adduser -D user
USER user

CMD python manage.py migrate && python manage.py createsuperuser --noinput && python manage.py runserver 0.0.0.0:3232