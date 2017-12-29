test:
	pytest -v

ship:
	python setup.py sdist bdist_wheel
	twine upload dist/* --skip-existing

dev:
	gulp --cwd <%= app %>/staticapp/

database:
	dropdb <%= app %> --if-exists
	createdb <%= app %>
