import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = React.memo((props) => {
  const [formValues, changeFormValues] = React.useState({
    name: '',
    link: ''
  });

  function handleSubmit (event) {
    event.preventDefault();
    props.onAddPlace(formValues);
    //Сбрасываем значения после сабмита
    changeFormValues({name: '', link: ''});
  }

  //Для валидации нам нужно для каждого инпута вызвать валидацию и отрендерить ошибку в контейнер ошибки возле этого инпута
  function handleFormChange (event)  {
    changeFormValues({...formValues, [event.target.name]: event.target.value});
    console.log(formValues);
  }

  return (
    <PopupWithForm title="Новое место" buttonText="Создать" name="place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}  children={
      <>
        <div className="form__input-container">
          <input onChange={handleFormChange} value={formValues.name} type="text" name="name" className="form__input" id="place-name" minLength="1" maxLength="30" placeholder="Название" aria-label="Название места" required/>
          <span className={`form__error ${'form__error_active'}`} id="place-name-error">{'Название места должно быть длиннее 1 и короче 30 символов'}</span>
        </div>
        <div className="form__input-container">
          <input onChange={handleFormChange} value={formValues.link} type="url" name="link" className="form__input" id="place-image"  placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" required/>
          <span className="form__error" id="place-image-error"></span>
        </div>
      </>
    }/>
  )
});

export default AddPlacePopup;
