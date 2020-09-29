import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/currentUserContext';

function EditProfilePopup (props) {
  const [formValues, changeFormValues] = React.useState({name: '', about: ''});
  const currentUser = React.useContext(CurrentUserContext);

  function handleFormChange (event) {
    changeFormValues({...formValues, [event.target.name]: event.target.value});
  }

  function handleSubmit (event) {
    event.preventDefault();
    props.onUpdateUser(formValues);
  }

  React.useEffect(() => {
    changeFormValues({name: currentUser.name, about: currentUser.about})
  }, [currentUser])

  return (
    <PopupWithForm title="Редактировать профиль" buttonText="Сохранить" name="profile" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} children={
      <>
        <div className="form__input-container">
          <input onChange={handleFormChange} defaultValue={formValues.name} type="text" name="name" className="form__input" id="profile-name" minLength="2" maxLength="40" aria-label="Имя" required/>
          <span className="form__error" id="profile-name-error"></span>
        </div>
        <div className="form__input-container">
          <input onChange={handleFormChange} defaultValue={formValues.about} type="text" name="about" className="form__input" id="profile-description" minLength="2" maxLength="40" aria-label="Род деятельности" required/>
          <span className="form__error" id="profile-description-error"></span>
        </div>
      </>
    }/>
  )
}

export default EditProfilePopup;
