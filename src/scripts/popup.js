function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened')
    document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc (evt) {
  const popupElement = document.querySelector('.popup_is-opened')
  if( !!popupElement && evt.key === 'Escape')
    { popupElement.classList.remove('popup_is-opened') }
}


export {openPopup, closePopup, closePopupEsc}
