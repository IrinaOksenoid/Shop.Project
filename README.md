Shop.Project
Итоговое задание 35.6 (HW-07) проект интернет-магазина с клиентской и административной частями.
Установка и запуск проекта
1: Клонирование репозитория
git clone https://github.com/IrinaOksenoid/Shop.Project.git
cd Shop.Project

2: Установка зависимостей

В корневой директории: 
    npm install

В директории клиентской части Shop.Client:
  cd Shop.Client
  npm install

В директории Shop.API:
  cd Shop.API
  npm install

Если при установке зависимостей возникают ошибки из-за конфликта версий, используйте  --legacy-peer-deps:
  npm install --legacy-peer-deps

3: Настройка базы данных

Создайте базу данных:
    sql
CREATE DATABASE shop_project;

Импортируйте структуру и данные из файла database.sql:
  mysql -u your_username -p shop_project < db/database.sql

4: Запуск проекта

Запуск серверной и административной частей:
В корневой директории:
      nodemon

Сборка и запуск клиентской части:
    cd Shop.Client
    npm run build

5: Доступ к приложению

    Клиентская часть: http://localhost:3000
    Административная панель: http://localhost:3000/admin

Учетные данные для входа в систему администрирования содержатся в базе данных в таблице users
  
