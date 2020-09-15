.PHONY: $(MAKECMDGOALS)

build:
	docker-compose build

clean:
	docker-compose down --volumes --remove-orphans

bootstrap:
	docker-compose run --rm app npm install

setup: bootstrap

update: bootstrap

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

shell:
	docker-compose run --rm app /bin/ash

test:
	docker-compose run --rm app npm test
