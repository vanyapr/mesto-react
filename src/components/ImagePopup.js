import React from 'react';

const ImagePopup = React.memo ((props) => {
  return (
      <div className={`popup popup_type_image ${props.card && 'popup_opened'}`}>
        <figure className="popup__image-container">
          <button className="popup__close" onClick={props.onClose}>Закрыть форму</button>
          {/*Поскольку мы не имеем изображения при инициализации, не рендерим эту картинку, если карточка не выбрана*/}
          {props.card && <img className="popup__image" src={props.card.link} alt={props.card.name}/>}
          <figcaption className="popup__image-description">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
  )
});

export default ImagePopup;
