// Токен: 2c5719bd-add1-468a-bc90-313f3187379f
// Идентификатор группы: wff-cohort-37

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '2c5719bd-add1-468a-bc90-313f3187379f',
    'Content-Type': 'application/json'
  }
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function getUser() {
  return fetch(`${config.baseUrl}//users/me`, {
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function updateUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function deleteCard(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function postLike (cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function deleteLike (cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

function postAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}


export {getInitialCards, getUser, updateUser, postCard, deleteCard, postLike, deleteLike, postAvatar}
