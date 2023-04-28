const URI_REGEX = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const OBJECTID_REGEX = /^[a-f\d]{24}$/i;

const MONGO_DUPLICATE_CODE = 11000;

const responseMessage = {
  success: 'Вы вошли в акканут',
  exit: 'Выход',
};

const errorMessage = {
  duplicateEmail: 'Пользователь с такой почтой уже существует.',
  validation: 'Ошибка валидации',
  validationID: 'Невалидный ID',
  filmNotFound: 'Фильм не найден',
  userNotFound: 'Пользователя не существует',
  pageNotFound: 'Страница не найдена',
  forbidden: 'Можно удалять только свои фильмы',
  unauthorized: 'Необходима авторизация',
  incorrectUrlFormat: 'Неверный формат ссылки',
  incorrectEmailFormat: 'Неверный формат почты',
  incorrectEmaiOrPassword: 'Неправильные почта или пароль',
  server: 'Ошибка сервера',
};

module.exports = {
  URI_REGEX,
  OBJECTID_REGEX,
  MONGO_DUPLICATE_CODE,
  responseMessage,
  errorMessage,
};
