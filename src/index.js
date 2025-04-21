
import {initialCards} from './scripts/cards.js'
import {createCard, delCard, likeCard} from './scripts/card.js'
import {openPopup, closePopup} from './scripts/popup.js'

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

function appendCard(cardElement) {
  const newCard = createCard(cardElement, cardTemplate, delCard, openPopupImage, likeCard)
  cardLlist.prepend(newCard);
}

function cardlistShow() {
  initialCards.forEach(appendCard);
}

cardlistShow()

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupElement  = document.querySelector('.popup_is-opened')
  profileName.textContent = popNameInput.value
  profileProfession.textContent = popJobInput.value
  closePopup(popupElement)
}

function addNewCard(evt) {
  evt.preventDefault();
  const popupElement  = document.querySelector('.popup_is-opened')
  const newName = popCreateNewCard.querySelector('[name="place-name"]')
  const newLink = popCreateNewCard.querySelector('[name="link"]')

  const newCardElement = {
    name: newName.value,
    link: newLink.value
  }

  appendCard(newCardElement)
  newName.value = ''
  newLink.value = ''
  closePopup(popupElement)
}

function openPopupImage (name, link) {
  popImgCaption.textContent = name
  popImgImage.src = link
  popImgImage.alt = name
  openPopup(popImg)
}


// listeners

btnEditProfile.addEventListener('click',(evt) => {
  popNameInput.value = profileName.textContent
  popJobInput.value = profileProfession.textContent
  openPopup(popEditProfile)
})

btnCreateNewCard.addEventListener('click',(evt) => {
  openPopup(popCreateNewCard)
})

closeBtns.forEach((el) => {
  const popupElement = el.closest('.popup')
  el.addEventListener('click', () => {
    closePopup(popupElement)
  })
  popupElement.addEventListener('mousedown', (evt)=> {
    if(evt.target === popupElement) {
      closePopup(popupElement)
    }
  })
}
)

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', addNewCard);
