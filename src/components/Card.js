import React from "react";

function Card (props) {

  function handleClick() {
    props.cardClick(props.card.link);
  }

  return (
    <li className="place">
      <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="place__image"/>
      <h2 className="place__title">{props.card.name}</h2>

      <div className="place__like-container">
        <button className="place__like" title="Добавить место в избранное">Добавить место в избранное</button>
        <p className="place__likes-count" title={`Лайков - ${props.card.likes.length}`}>{props.card.likes.length}</p>
      </div>

      <button className="place__delete" title="Удалить место">Удалить место</button>
    </li>
  )
}

export default Card
