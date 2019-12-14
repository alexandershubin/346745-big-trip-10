import {renderTwoOption} from "../mock/card";
import {castTimeFormat} from "../utils/common";
import AbstractComponent from './abstract-component.js';

const createCardTemplate = (cards) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>
      
      <ul class="trip-events__list">
        ${cards.map(renderCard).join(``)}
      </ul>
    </li>`
  );
};

const getTimeDiffString = (time) => {
  let hours = new Date(time).getUTCHours();
  let minutes = new Date(time).getUTCMinutes();

  hours = castTimeFormat(hours);
  minutes = castTimeFormat(minutes);
  return `${hours}H ${minutes}M `;
};

const getPointTimeMarkup = (start, end) => {
  const startTime = `${castTimeFormat(start.getHours())}:${castTimeFormat(start.getMinutes())}`;
  const finishTime = `${castTimeFormat(end.getHours())}:${castTimeFormat(end.getMinutes())}`;
  return `
      <time class="event__start-time" datetime="${start}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${end}">${finishTime}</time>`;
};

const renderCard = (card) => {
  const {start, end} = card;
  const pointTimeMarkup = getPointTimeMarkup(start, end);

  const diffTime = (end.getTime() - start.getTime());
  const diff = getTimeDiffString(diffTime);

  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${card.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${card.type} to ${card.cites} </h3>
  
        <div class="event__schedule">
          <p class="event__time">
          ${pointTimeMarkup}
          </p>
          <p class="event__duration">${diff}</p>
        </div>
  
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${card.offer}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${renderTwoOption.map((option) => `
          <li class="event__offer">
            <span class="event__offer-title">${option.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
          </li>
          `).join(` `)}
        </ul>
  
        ${renderButton()}
      </div>
    </li>
  `);
};


const renderButton = () => {
  return (`
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `);
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
  }
}
