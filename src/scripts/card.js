
// @todo: Функция создания карточки


function createCard (cardElement, template, delCard, openPopupImage, likeCard) {
  const card = template.querySelector('.places__item').cloneNode(true);
  const cardLikeBtn = card.querySelector('.card__like-button')
  const cardImg = card.querySelector('.card__image')
  const cardImgName = card.querySelector('.card__title')
  const btnDel = card.querySelector('.card__delete-button');

  cardImg.src = cardElement.link;
  cardImg.alt = cardElement.name;
  cardImgName.textContent = cardElement.name;


  cardImg.addEventListener('click', ()=> {
    openPopupImage(cardElement.name, cardElement.link)
  })

  btnDel.addEventListener('click', delCard)

  cardLikeBtn.addEventListener('click', () =>{
    likeCard(cardLikeBtn)
  })

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

  export {createCard, delCard, likeCard}
