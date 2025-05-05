
// @todo: Функция создания карточки

import {deleteCard, postLike, deleteLike} from './api.js'

function createCard (cardElement, template, delCard, openPopupImage, likeCard, userID) {
  const card = template.querySelector('.places__item').cloneNode(true);
  const cardLikeCnt = card.querySelector('.card__like-counter')
  const cardLikeBtn = card.querySelector('.card__like-button')
  const cardImg = card.querySelector('.card__image')
  const cardImgName = card.querySelector('.card__title')
  const btnDel = card.querySelector('.card__delete-button')

  cardImg.src = cardElement.link;
  cardImg.alt = cardElement.name;
  cardImgName.textContent = cardElement.name;
  cardLikeCnt.textContent = cardElement.likes.length

  const isCardLiked = cardElement.likes.some((el) => {
    return el._id === userID
  })

  if(isCardLiked) {
    cardLikeBtn.classList.toggle('card__like-button_is-active')
  }

  cardImg.addEventListener('click', ()=> {
    openPopupImage(cardElement.name, cardElement.link)
  })

  if(cardElement.owner._id !== userID) {
    btnDel.classList.add('card__delete-button-hidden')
  } else {
    btnDel.addEventListener('click', (evt) => {
      delCard(evt, cardElement._id)
    })
  }

  cardLikeBtn.addEventListener('click', () =>{
    likeCard(cardLikeBtn, cardElement._id, cardLikeCnt)
  })

  return card
}

// @todo: Функция удаления карточки
  function delCard (obj, cardID) {
    const curCard = obj.target.closest('.places__item')
    deleteCard(cardID)
    .then(() => {
      curCard.remove()
    })
  }

  function likeCard(cardLikeBtn, cardID, cardLikeCnt) {
    if(cardLikeBtn.classList.contains('card__like-button_is-active')) {
      cardLikeBtn.classList.toggle('card__like-button_is-active')
      deleteLike(cardID)
      .then((card) => {
        cardLikeCnt.textContent = card.likes.length
      })
    }else {
      cardLikeBtn.classList.toggle('card__like-button_is-active')
      postLike(cardID)
      .then((card) => {
        cardLikeCnt.textContent = card.likes.length
      })
    }
  }


  export {createCard, delCard, likeCard}
