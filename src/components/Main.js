import React from "react";
import api from '../utils/api.js'; //Подключение к апи
import Card from './Card'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: '',
      cards: []
    }
  }

  componentDidMount() {
    //Получаем данные юзера по апи
    api.getUserInfo().then(data => {
      this.setState({
        userName: data.name,
        userDescription: data.about,
        userAvatar: data.avatar,
      }).catch(error => console.log(error));
    });

    //Получаем список карточек по апи
    api.getCardsList().then(data => {
      this.setState({
        cards: data
      }).catch(error => console.log(error));
    })
  }

  render () {
    return (
      <main className="main">
        {/* Профиль пользователя */}
        <section className="profile">
          <div className="profile__avatar-container">
            <img src={this.state.userAvatar} alt="Жак-Ив Кусто" className="profile__avatar" onClick={this.props.onEditAvatar}/>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{this.state.userName}</h1>
            <p className="profile__description">{this.state.userDescription}</p>
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
              <Card card={item} key={key} cardClick={this.props.onCardClick}/>
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
