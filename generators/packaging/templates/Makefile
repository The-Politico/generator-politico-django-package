test:
	pytest -v

ship:
	python setup.py sdist bdist_wheel
	twine upload dist/* --skip-existing

dev-backend:
	cd example && pipenv run python manage.py runserver

dev-frontend:
	sleep 3  # Stall while backend starts
	cd <%= app %>/staticapp && npm start

dev:
	make -j 2 dev-backend dev-frontend

database:
	dropdb <%= app %> --if-exists
	createdb <%= app %>
