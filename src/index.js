
import {initialCards} from './scripts/cards.js'
import {initCard, delCard, likeCard} from './scripts/card.js'
import {popupOpen, popupClose} from './scripts/popup.js'

import './pages/index.css'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardLlist = document.querySelector('.places__list')
const page = document.querySelector('.page')
const closeBtns = document.querySelectorAll('.popup__close');

const btnEditProfile = document.querySelector('.profile__edit-button')
const btnCreateNewCard = document.querySelector('.profile__add-button')

const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')

const profileFormElement = document.querySelector('[name="edit-profile"]'); //'[name^="data-"]' ".popup__form"
const popEditProfile = document.querySelector('.popup_type_edit')
const popNameInput = popEditProfile.querySelector('.popup__input_type_name')
const popJobInput = popEditProfile.querySelector('.popup__input_type_description')

const popCreateNewCard = document.querySelector('.popup_type_new-card')
const newCardFormElement = document.querySelector('[name="new-place"]');
const popImg = document.querySelector('.popup_type_image')
const popImgImage = popImg.querySelector('.popup__image')
const popImgCaption = popImg.querySelector('.popup__caption')

// @todo: Вывести карточки на страницу

function appendCard(obj) {
  const newCard = initCard(obj, cardTemplate, delCard)
  cardLlist.prepend(newCard);
}

function cardlistShow() {
  initialCards.forEach(appendCard);
}

cardlistShow()

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popNameInput.value
  profileProfession.textContent = popJobInput.value
  popupClose(evt)
}

function addNewCard(evt) {
  evt.preventDefault();

  let newName = popCreateNewCard.querySelector('[name="place-name"]')
  let newLink = popCreateNewCard.querySelector('[name="link"]')

  const obj = {}
  obj.name = newName.value
  obj.link = newLink.value
  appendCard(obj)
  newName.value = ''
  newLink.value = ''
  popupClose(evt)
}

// listeners

btnEditProfile.addEventListener('click',(evt) => {
  popNameInput.value = profileName.textContent
  popJobInput.value = profileProfession.textContent
  popupOpen(popEditProfile)
})

btnCreateNewCard.addEventListener('click',(evt) => {
  popupOpen(popCreateNewCard)
})

closeBtns.forEach((el) => {
  el.addEventListener('click', (evt) => {
    popupClose(evt)
  })
}
)

page.addEventListener('click',(evt) => {
  if(evt.target.classList.contains('card__image')) {
    const curCard = evt.target.closest('.places__item');
    popImgImage.src = curCard.querySelector('.card__image').src
    popImgCaption.textContent = curCard.querySelector('.card__title').textContent
    popupOpen(popImg)
  }
  if(evt.target.classList.contains('card__like-button')) {
    likeCard(evt.target)
  }
})

page.addEventListener("mousedown", (evt) => {
  if(evt.target.classList.contains('popup')) {
    popupClose(evt)
  }
})

profileFormElement.addEventListener('submit', handleFormSubmit);
newCardFormElement.addEventListener('submit', addNewCard);
