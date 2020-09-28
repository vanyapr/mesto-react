import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = React.memo((props) => {
  const [cardName, changeCardName] = React.useState('');
  const [cardUrl, changeCardUrl] = React.useState('');
  const [nameIsValid, changeNameValidity] = React.useState(true);

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

  //Для валидации нам нужно для каждого инпута вызвать валидацию и отрендерить ошибку в контейнер ошибки возле этого инпута

  function handleCardNameChange (event)  {
    changeNameValidity(event.target.validity.valid);
    console.log();
    changeCardName(event.target.value);
  }

  function showError (event) {
    let errorText = event.target.validationMessage;
  }

  function handleUrlChange (event)  {
    changeCardUrl(event.target.value);
  }

  return (
    <PopupWithForm title="Новое место" buttonText="Создать" name="place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}  children={
      <>
        <div className="form__input-container">
          <input onChange={handleCardNameChange} value={cardName} type="text" name="placeName" className="form__input form__input_value_place-name" id="place-name" minLength="1" maxLength="30" placeholder="Название" aria-label="Название места" required/>
          <span className={`form__error ${!nameIsValid && 'form__error_active'}`} id="place-name-error">{!nameIsValid && 'Название места должно быть длиннее 1 и короче 30 символов'}</span>
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
