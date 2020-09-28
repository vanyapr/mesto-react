import React from 'react';
import Header from './Header'
import Footer from './Footer';
import Main from './Main'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api.js'; //Подключение к апи
import { CurrentUserContext } from '../contexts/currentUserContext'; //Контекст текущего юзера

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      confirmDeletePopupOpen: false,
      selectedCard: '',
      currentUser: '',
      cards: []
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
      confirmDeletePopupOpen: false,
      selectedCard: ''
    });
  }

  handleUpdateUser = (newUserData) => {
    api.saveUserInfo(newUserData).then(responceData => {
      this.setState({currentUser: responceData});
      this.closeAllPopups();
    }).catch(error => console.log(error))
  }

  handleUpdateAvatar = (newAvatarData) => {
    //Обновить аватар
    api.changeAvatar(newAvatarData).then(responceData => {
      //Обновить контекст
      this.setState({currentUser: responceData});
      this.closeAllPopups();
    }).catch(error => console.log(error))
  }

  handleCardLike = (card) => {
    //Проверяем, лайкнута ли карточка
    const isLiked = card.likes.some(like => like._id === this.context._id);

    // Давать готовые куски кода в проектной работе - такое себе, напишу эту часть сам
    // Если карта "лайкнута", передаем в апи "не нужен лайк" чтобы снять лайк при клике
    // Метод вернёт карточку места с обновленным числом лайков (объект, элемент массива)
    api.changeCardLike(card._id, !isLiked).then(updatedCard => {
      //Обновить число лайков на карточках (внести изменение в стейт списка карточек)
      const newCardsState = this.state.cards.map(item => {
        //Находим в массиве карточку с нужным   ._id
        if (item._id === updatedCard._id) {
          return updatedCard; //Возвращаем вместо неё новую карточку, полученную в ответе апи
        } else {
          return item;
        }
      })

      this.setState({cards: newCardsState}); //Обновили состояние карточек
    }).then().catch(error => console.log(error));
  }

  handleCardDelete = (card) => {
    //Нам надо удалять карточку только после подтверждения
    //0) Создать переменную с карточкой, которую мы будем удалять
    this.cardToDelete  = card;
    //1) Открыть попап подтверждения удаления передав в него пропсом
    this.setState({confirmDeletePopupOpen: true});
    //2) Если юзер подтвердил удаление, удалить карточку
    //2) Если юзер не подтвердил удаление, ничего не делать
  }

  cardDelete = (event) => {
    event.preventDefault();
    //Передаём переменную в компоненте при помощи переменной класса
    let card = this.cardToDelete;
    api.deleteCard(card._id).then(responce => {
        //После удаления в апи надо удалить карточку из списка карточек
        const reducedCards = this.state.cards.filter(item => item._id !== card._id);//В массиве оставляем только карточки, у которых id не совпадают с удаляемой карточкой
        this.setState({cards: reducedCards});
        this.cardToDelete.current = {};
      }).catch(error => {
      console.log(error);
    })
    //Закрыть все попапы
    this.closeAllPopups();
  }

  handleAddPlaceSubmit = (newCardObject) => {
    api.addCard(newCardObject).then(responceData => {
      this.setState({cards: [responceData, ...this.state.cards] });
      this.closeAllPopups();
    }).catch(error => console.log(error));
  }

  componentDidMount() {
    api.getUserInfo().then(data => {
      this.setState({
        currentUser: data
      });
    }).catch(error => console.log(error));

    api.getCardsList().then(data => {
      this.setState({
        cards: data
      });
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header/>
        <Main onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onEditAvatar={this.handleEditAvatarClick} onCardClick={this.handleCardClick} cards={this.state.cards} onCardLike={this.handleCardLike} onCardDelete={this.handleCardDelete}/>
        <Footer/>

        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />
        <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />
        <PopupWithForm title="Вы уверены?" buttonText="Да" name="confirm" isOpen={this.state.confirmDeletePopupOpen} onSubmit={this.cardDelete} />
        <EditAvatarPopup onClose={this.closeAllPopups} isOpen={this.state.isEditAvatarPopupOpen} onUpdateAvatar={this.handleUpdateAvatar} />
        <ImagePopup onClose={this.closeAllPopups} card={this.state.selectedCard}/>
      </CurrentUserContext.Provider>
    );
  }


}

export default App;
