import React from 'react';
import Header from './Header'
import Footer from './Footer';
import Main from './Main'
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from '../utils/api.js'; //Подключение к апи
import { CurrentUserContext } from '../contexts/currentUserContext'; //Контекст текущего юзера

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: '',
      currentUser: ''
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

  handleCardClick = (card) => {
    this.setState({selectedCard: card});
  }

  closeAllPopups = () => {
    this.setState( {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: ''
    });
  }

  onUpdateUser = (newUserData) => {
    api.saveUserInfo(newUserData).then(responceData => {
      this.setState({currentUser: responceData});
      this.closeAllPopups();
    }).catch(error => console.log(error))
  }

  componentDidMount() {
    api.getUserInfo().then(data => {
      this.setState({
        currentUser: data
      });
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header/>
        <Main onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onEditAvatar={this.handleEditAvatarClick} onCardClick={this.handleCardClick}/>
        <Footer/>

        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.onUpdateUser} />

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
      </CurrentUserContext.Provider>
    );
  }


}

export default App;
