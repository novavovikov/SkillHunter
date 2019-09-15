# SkillHunter
SkillHunter project

## Запуск проекта для локальной разработки:
```sh
./run-dev.sh
```

## backend 
* Framework - [nest](https://nestjs.com/)
* ORM - [typeorm](https://typeorm.io/)

## database 
[PostgreSQL](https://www.postgresql.org/)

### Backend
Есть такие дополнительные утилиты как:
форматирование
```sh
npm run format
```
миграции
```sh
npm run typeorm migration:generate -- -n [MigrationName]
```


