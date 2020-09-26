import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = React.memo((props) => {
  return (
    <PopupWithForm title="Редактировать профиль" buttonText="Сохранить" name="profile" isOpen={props.isOpen} onClose={props.onClose} children={
      <>
        <div className="form__input-container">
          <input type="text" name="profileName" className="form__input form__input_value_name" id="profile-name" minLength="2" maxLength="40" defaultValue="" aria-label="Имя" required/>
          <span className="form__error" id="profile-name-error"></span>
        </div>
        <div className="form__input-container">
          <input type="text" name="profileDescription" className="form__input form__input_value_description" id="profile-description" minLength="2" maxLength="40" defaultValue="" aria-label="Род деятельности" required/>
          <span className="form__error" id="profile-description-error"></span>
        </div>
      </>
    }/>
  )
})

export default EditProfilePopup;
