function popupOpen(obj) {
  obj.classList.add('popup_is-opened')
  document.addEventListener('keydown', popupClose)
}

function popupClose(evt) {
  const popupElement = document.querySelector('.popup_is-opened')

  if( !!popupElement && (
      (evt.type === "keydown" && evt.key === 'Escape') || //(evt.type !== "keydown")
      (evt.type === "click") ||
      (evt.type === "submit") ||
      (evt.type === 'mousedown'))
    ) { popupElement.classList.remove('popup_is-opened')}
}

export {popupOpen, popupClose}
