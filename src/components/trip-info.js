import {getDuration} from "../utils/common";
import AbstractComponent from './abstract-component.js';

const crateTripInfoTemplate = (cards) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${cards[0].city}
      ${cards.length > 2 ? `&mdash; ... &mdash;` : `&mdash;`}
      ${cards[cards.length - 1].city}
      </h1>
      <p class="trip-info__dates">
      ${getDuration(cards[0].startDate, cards[cards.length - 1].endDate)}
      </p>
    </div>
`);
};

export default class TripInfo extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return crateTripInfoTemplate(this._cards);
  }
}
