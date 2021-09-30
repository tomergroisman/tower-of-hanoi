FROM python:3.9.5-alpine

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
RUN python manage.py collectstatic

EXPOSE 8000

RUN adduser -D user
USER user

CMD gunicorn app.wsgi:application --bind 0.0.0.0:8000