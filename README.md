# Проект: [Movies-explorer API](https://github.com/Lacsw/movies-explorer-api)

URI: https://api.movies-tourer.nomoredomains.monster

## Description
This is the backend part of diploma project of the web deveveloper courses. This repo includes REST API created with NodeJS and ExpressJS Framework. Provides authentication and authorisation functionallity for users, also create movie, like and delete them.

## API Endpoints
| Endpoint | Request | Response |
| :---: | :---: | --- |
| `/users/me` | `GET` | returns current user info (name, email).
| `/users/me` | `PATCH` | updates user info (name, email) passed in the body query.
| `/movies` |`GET` | returns all users movies.
| `/movies` |`POST` | creates a movie with the values: country, director, duration, year, description, image, trailer, movieId, thumbnail, nameRU, nameEN.
| `/movies/:id` |`DELETE` | deletes a saved movie.
| `/signup` |`POST` | creates new user with required email, name and password values.
| `/signin` |`POST` | verify email and password for sent JWT in cookie.
| `/signout` |`POST` | logout user and clear cookie's value.

## Tech :computer:

- ExpressJS
- REST Api
- MongoDB
- mongoose
- nodemon
- eslint
- Celebrate/Joi
- winston as logger
- helmet

## How to install?

In the project directory run following commands:

```
git clone https://github.com/Lacsw/movies-explorer-api

npm intstall

npm run start (runs server)
npm run dev (runs with hot-reload)
```
