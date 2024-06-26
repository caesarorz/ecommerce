#!/bin/sh

set -e

python manage.py wait_db
python manage.py collectstatic --noinput
python manage.py makemigrations user
python manage.py makemigrations products
python manage.py makemigrations orders
python manage.py makemigrations core
python manage.py migrate

uwsgi --socket :9000 --workers 4 --master --enable-threads --module ecommerce.wsgi
