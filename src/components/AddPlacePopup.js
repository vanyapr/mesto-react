import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = React.memo((props) => {
  const [cardName, changeCardName] = React.useState('');
  const [cardUrl, changeCardUrl] = React.useState('');

  function handleSubmit (event) {
    event.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardUrl
    });

    //Сбрасываем значения после сабмита
    changeCardName('');
    changeCardUrl('');
  }

  function handleCardNameChange (event)  {
    changeCardName(event.target.value);
  }

  function handleUrlChange (event)  {
    changeCardUrl(event.target.value);
  }

  return (
    <PopupWithForm title="Новое место" buttonText="Создать" name="place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}  children={
      <>
        <div className="form__input-container">
          <input onChange={handleCardNameChange} value={cardName} type="text" name="placeName" className="form__input form__input_value_place-name" id="place-name" minLength="1" maxLength="30" placeholder="Название" aria-label="Название места" required/>
          <span className="form__error" id="place-name-error"></span>
        </div>
        <div className="form__input-container">
          <input onChange={handleUrlChange} value={cardUrl} type="url" name="placeImage" className="form__input form__input_value_image" id="place-image"  placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" required/>
          <span className="form__error" id="place-image-error"></span>
        </div>
      </>
    }/>
  )
});

export default AddPlacePopup;
