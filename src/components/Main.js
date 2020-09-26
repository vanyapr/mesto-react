import React from "react";
import api from '../utils/api.js'; //Подключение к апи
import Card from './Card';
import { currentUserContext } from '../contexts/currentUserContext'; //Контекст текущего юзера

class Main extends React.PureComponent {

  static contextType = currentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
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
          //Находим в массиве карточку с нужным ._id
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
    api.deleteCard(card._id).then(responce => {
        //После удаления в апи надо удалить карточку из списка карточек
        const reducedCards = this.state.cards.filter(item => item._id !== card._id);//В массиве оставляем только карточки, у которых id не совпадают с удаляемой карточкой
        this.setState({cards: reducedCards});
      }
    ).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    //Получаем список карточек по апи
    api.getCardsList().then(data => {
      this.setState({
        cards: data
      });
    }).catch(error => console.log(error));
  }

  render () {
    return (
      <main className="main">
        {/* Профиль пользователя */}
        <section className="profile">
          <div className="profile__avatar-container">
            <img src={this.context.avatar} alt="Жак-Ив Кусто" className="profile__avatar" onClick={this.props.onEditAvatar}/>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{this.context.name}</h1>
            <p className="profile__description">{this.context.about}</p>
            <button className="profile__edit-button" title="Редактировать профиль" onClick={this.props.onEditProfile}>Редактировать профиль</button>
          </div>

          <button className="profile__add-button" title="Добавить место" onClick={this.props.onAddPlace}>Добавить место</button>
        </section>
        {/* Профиль пользователя */}

        {/* Список мест  */}
        <section className="places" aria-label="Места">
          {/*  Контейнер для рендера списка мест  */}
          <ul className="places__list">
            {this.state.cards.map((item, key) => (
              <Card card={item} key={key} onCardClick={this.props.onCardClick} onCardLike={this.handleCardLike} onCardDelete={this.handleCardDelete}/>
            ))}
          </ul>
          {/* // Контейнер для рендера списка мест   */}
        </section>
        {/* Список мест  */}
      </main>
    )
  }
}

export default Main;
