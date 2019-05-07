# SkillHunter
SkillHunter project

# установка проекта
в файл `~/.bashrc` добавте 
```
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
``
затем выполните в терминале 
```sh
source ~/.bashrc
```

## Запуск проекта
```sh
docker-compose up
```

## backend 
* Framework - [nest](https://nestjs.com/)
* ORM - [typeorm](https://typeorm.io/)

## database 
[PostgreSQL](https://www.postgresql.org/)

### Запуск команд
переход в терминал образа
```sh
docker-compose run backend sh
```
затем доступны команды, например:
форматирование
```sh
npm run format
```
миграции
```sh
npm run typeorm -- migration:generate -n [MigrationName]
```
установка зависимости
```sh
npm i -S [package-name]
```


