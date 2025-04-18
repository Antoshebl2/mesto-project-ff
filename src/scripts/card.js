
// @todo: Функция создания карточки

function initCard (obj, template, delCard) {
  const card = template.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__image').src = obj.link;
  card.querySelector('.card__title').textContent = obj.name;

  const btnDel = card.querySelector('.card__delete-button');

  btnDel.addEventListener('click', delCard)

  return card
}

// @todo: Функция удаления карточки
  function delCard () {
    const curCard = this.closest('.places__item');
    curCard.remove()
  }

  function likeCard(card) {
    card.classList.toggle("card__like-button_is-active");
  }

  export {initCard, delCard, likeCard}
