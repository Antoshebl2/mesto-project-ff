// Токен: 2c5719bd-add1-468a-bc90-313f3187379f
// Идентификатор группы: wff-cohort-37

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '2c5719bd-add1-468a-bc90-313f3187379f',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(getResponseData)
}

function getUser() {
  return fetch(`${config.baseUrl}//users/me`, {
    headers: config.headers
  }).then(getResponseData)
}

function updateUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(getResponseData)
}

function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponseData)
}

function deleteCard(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers
  }).then(getResponseData)
}

function postLike (cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers
  }).then(getResponseData)
}

function deleteLike (cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers
  }).then(getResponseData)
}

function postAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(getResponseData)
}


export {getInitialCards, getUser, updateUser, postCard, deleteCard, postLike, deleteLike, postAvatar}
