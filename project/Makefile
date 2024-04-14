run-env:
	sudo docker compose --env-file "./.env-example" --file "./docker-compose.yml" up -d

stop-env:
	sudo docker compose down

remove-env:
	sudo docker rm -f $(sudo docker ps -a -q) && sudo docker volume rm $(sudo docker volume ls -q)
