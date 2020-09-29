import React from 'react';

const PopupWithForm = React.memo((props) => {
    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close" onClick={props.onClose}>Закрыть форму</button>
          <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button type="submit" className={`form__submit ${props.isSubmitDisabled && 'form__submit_inactive'}`}>{props.buttonText}</button>
          </form>
        </div>
      </div>
    )
});

export default PopupWithForm;
