import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/currentUserContext'

const EditAvatarPopup = React.memo((props) => {
  const [avatar, changeAvatar] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleAvatarChange (event) {
    changeAvatar(event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    props.onUpdateAvatar({avatar});
  }

  React.useEffect(()=> {
    changeAvatar(currentUser.avatar);
  }, [currentUser])

  return (
    <PopupWithForm title="Обновить аватар" buttonText="Сохранить" name="avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} children={
      <>
        <div className="form__input-container">
          <input onChange={handleAvatarChange} type="url" name="avatar" className="form__input form__input_value_avatar" id="user-avatar"  defaultValue={avatar} placeholder="Ссылка на аватар" aria-label="Ссылка на аватар" required/>
          <span className="form__error" id="user-avatar-error"></span>
        </div>
      </>
    }/>
  )
})

export default EditAvatarPopup;
