import React from "react";

function PopupWithForm (props) {
    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close" onClick={props.onClose}>Закрыть форму</button>
          <form className="form" name={props.name} noValidate>
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="form__submit">{props.buttonText}</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm;
