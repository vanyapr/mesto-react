import React from "react";

function ImagePopup (props) {
  return (
    <div className={`popup popup_type_image ${props.card && 'popup_opened'}`}>
      <figure className="popup__image-container">
        <button className="popup__close" onClick={props.onClose}>Закрыть форму</button>
        <img className="popup__image" src={props.card} alt="Альтернативный текст"/>
        <figcaption className="popup__image-description">
          Описание картинки
        </figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;
