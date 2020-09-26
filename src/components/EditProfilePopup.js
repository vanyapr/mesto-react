import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/currentUserContext';

function EditProfilePopup (props) {
  const [name, changeName] = React.useState('');
  const [description, changeDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function onNameChange (event) {
    changeName(event.target.value);
  }

  function onDescriptionChange (event) {
    changeDescription(event.target.value);
  }

  React.useEffect(() => {
    changeName(currentUser.name);
    changeDescription(currentUser.about);
    console.log(currentUser)
  }, [currentUser])

  return (
    <PopupWithForm title="Редактировать профиль" buttonText="Сохранить" name="profile" isOpen={props.isOpen} onClose={props.onClose} children={
      <>
        <div className="form__input-container">
          <input onChange={onNameChange} value={name} type="text" name="profileName" className="form__input form__input_value_name" id="profile-name" minLength="2" maxLength="40" defaultValue="" aria-label="Имя" required/>
          <span className="form__error" id="profile-name-error"></span>
        </div>
        <div className="form__input-container">
          <input onChange={onDescriptionChange} value={description} type="text" name="profileDescription" className="form__input form__input_value_description" id="profile-description" minLength="2" maxLength="40" defaultValue="" aria-label="Род деятельности" required/>
          <span className="form__error" id="profile-description-error"></span>
        </div>
      </>
    }/>
  )
}

export default EditProfilePopup;
