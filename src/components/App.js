import React from 'react';
import Header from './Header'
import Footer from './Footer';
import Main from './Main'
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: ''
    }
  }

  handleEditAvatarClick = () => {
    this.setState({isEditAvatarPopupOpen: true});
  }

  handleEditProfileClick = () => {
    this.setState({isEditProfilePopupOpen: true});
  }

  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
  }

  handleCardClick = (url) => {
    this.setState({selectedCard: url});
  }

  closeAllPopups = () => {
    this.setState( {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: ''
    });
  }

  render() {
    return (
      <>
        <Header/>
        <Main onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onEditAvatar={this.handleEditAvatarClick} onCardClick={this.handleCardClick}/>
        <Footer/>
        <PopupWithForm title="Редактировать профиль" buttonText="Сохранить" name="profile" isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} children={
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

        <PopupWithForm title="Новое место" buttonText="Создать" name="place" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}  children={
          <>
            <div className="form__input-container">
              <input type="text" name="placeName" className="form__input form__input_value_place-name" id="place-name" minLength="1" maxLength="30" defaultValue="" placeholder="Название" aria-label="Название места" required/>
              <span className="form__error" id="place-name-error"></span>
            </div>
            <div className="form__input-container">
              <input type="url" name="placeImage" className="form__input form__input_value_image" id="place-image"  defaultValue="" placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" required/>
              <span className="form__error" id="place-image-error"></span>
            </div>
          </>
        }/>

        <PopupWithForm title="Обновить аватар" buttonText="Сохранить" name="avatar" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} children={
          <>
            <div className="form__input-container">
              <input type="url" name="avatar" className="form__input form__input_value_avatar" id="user-avatar"  defaultValue="" placeholder="Ссылка на аватар" aria-label="Ссылка на аватар" required/>
              <span className="form__error" id="user-avatar-error"></span>
            </div>
          </>
        }/>

        <PopupWithForm title="Вы уверены?" buttonText="Да" name="confirm" onClose={this.closeAllPopups} />

        <ImagePopup onClose={this.closeAllPopups} card={this.state.selectedCard}/>
      </>
    );
  }


}

export default App;
