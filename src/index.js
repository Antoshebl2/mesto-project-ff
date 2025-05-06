import {createCard, delCard, likeCard} from './scripts/card.js'
import {openPopup, closePopup} from './scripts/popup.js'
import {enableValidation, clearValidation} from './scripts/validation.js'
import {getInitialCards, getUser, updateUser, postCard, postAvatar} from './scripts/api.js'
import './pages/index.css'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardLlist = document.querySelector('.places__list')
const closeBtns = document.querySelectorAll('.popup__close');

const btnEditProfile = document.querySelector('.profile__edit-button')
const btnEditAvatar = document.querySelector('.avatar__edit-button')
const btnCreateNewCard = document.querySelector('.profile__add-button')

const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')


const profileFormAvatar = document.querySelector('[name="edit-avatar"]')
const popEditAvatar = document.querySelector('.popup_type_avatar')
const popAvatarLinkInput = popEditAvatar.querySelector('[name="avatar-link"]')

const profileFormElement = document.querySelector('[name="edit-profile"]'); //'[name^="data-"]' ".popup__form"
const popEditProfile = document.querySelector('.popup_type_edit')
const popNameInput = popEditProfile.querySelector('.popup__input_type_name')
const popJobInput = popEditProfile.querySelector('.popup__input_type_description')

const popCreateNewCard = document.querySelector('.popup_type_new-card')
const newCardFormElement = document.querySelector('[name="new-place"]');
const newNameInput = popCreateNewCard.querySelector('[name="place-name"]')
const newLinkInput = popCreateNewCard.querySelector('[name="link"]')

const popImg = document.querySelector('.popup_type_image')
const popImgImage = popImg.querySelector('.popup__image')
const popImgCaption = popImg.querySelector('.popup__caption')

// @todo: Вывести карточки на страницу

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function renderLoading (loadStatus, tgtButton) {
  if(loadStatus){
    tgtButton.textContent = 'Сохранение...'
  } else {
    tgtButton.textContent = 'Сохранить'
  }
}

function appendCard(cardElement, userID) {
  const newCard = createCard(cardElement, cardTemplate, delCard, openPopupImage, likeCard, userID)
  cardLlist.prepend(newCard);
}

let userID = ''

Promise.all([getInitialCards(), getUser()])
.then(([cards, user]) => {
  userID = user._id

  profileName.textContent = user.name
  profileProfession.textContent = user.about
  profileImage.style = `background-image: url('${user.avatar}')`

  cards.forEach((cardElement) => {
    appendCard(cardElement, userID)
  })
})
.catch((err) => {
  console.error(err);
});

// @todo: submit handlers

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const saveBtn = evt.submitter
  renderLoading(true, saveBtn)
  updateUser(popNameInput.value, popJobInput.value)
  .then((user)=> {
    profileName.textContent = user.name
    profileProfession.textContent = user.about
    closePopup(popEditProfile)
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => renderLoading(false, saveBtn))}


function addNewCard(evt) {
  evt.preventDefault();
  const saveBtn = evt.submitter
  renderLoading(true, saveBtn)
  postCard(newNameInput.value,newLinkInput.value)
  .then((newCardElement) => {
    appendCard(newCardElement, userID)
    newCardFormElement.reset()
    closePopup(popCreateNewCard)
  })
  .catch((err) => {
    console.error(err);
  }).finally(() => renderLoading(false, saveBtn))}


function updAvatar(evt) {
  evt.preventDefault();
  const saveBtn = evt.submitter
  renderLoading(true, saveBtn)
  postAvatar(popAvatarLinkInput.value)
  .then((data) => {
    profileImage.style = `background-image: url('${data.avatar}')`
    profileFormAvatar.reset()
    closePopup(popEditAvatar)
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => renderLoading(false, saveBtn))}

function openPopupImage (name, link) {
  popImgCaption.textContent = name
  popImgImage.src = link
  popImgImage.alt = name
  openPopup(popImg)
}

enableValidation(validationConfig);


// listeners

btnEditProfile.addEventListener('click',(evt) => {
  popNameInput.value = profileName.textContent
  popJobInput.value = profileProfession.textContent
  clearValidation(profileFormElement, validationConfig);
  openPopup(popEditProfile)
})

btnEditAvatar.addEventListener('click',(evt) => {
  clearValidation(profileFormAvatar, validationConfig);
  openPopup(popEditAvatar)
})

btnCreateNewCard.addEventListener('click',(evt) => {
  clearValidation(newCardFormElement, validationConfig);
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
profileFormAvatar.addEventListener('submit', updAvatar);
