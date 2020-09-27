import React from 'react';
import {CurrentUserContext} from '../contexts/currentUserContext';

const Card = React.memo((props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === props.card.owner._id;
  const isLiked = props.card.likes.some(like => like._id === currentUser._id); //Проверяем, установлен ли лайк
  const cardLikeButtonClassName = 'place__like_status_active'; //Класс установленного лайка

  function handleClick () {
    props.onCardClick(props.card);
  }

  function handleLike () {
    props.onCardLike(props.card);
  }

  function handleDelete () {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="place__image"/>
      <h2 className="place__title">{props.card.name}</h2>

      <div className="place__like-container">
        <button className={!isLiked? "place__like" : `place__like ${cardLikeButtonClassName}`} title="Поставить месту лайк" onClick={handleLike}>Поставить месту лайк</button>
        <p className="place__likes-count" title={`Лайков - ${props.card.likes.length}`}>{props.card.likes.length}</p>
      </div>

      {isOwn && <button className="place__delete" title="Удалить место" onClick={handleDelete}>Удалить место</button> }
    </li>
  )
})

export default Card
