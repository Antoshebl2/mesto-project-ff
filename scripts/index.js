// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardLlist = document.querySelector('.places__list')

// @todo: Функция создания карточки

function addCard (image, title) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__image').src = image;
  card.querySelector('.card__title').textContent = title;

  const btnDel = card.querySelector('.card__delete-button');
  btnDel.addEventListener('click', delCard)

  return card
}

// @todo: Функция удаления карточки
  function delCard () {
    const curCard = this.closest('.places__item');
    curCard.remove()
  }

// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
  cardLlist.append(addCard(element.link, element.name));
});
