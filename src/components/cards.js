import {createElement} from "../utils";

const createCardsTemplate = () => {
  return (`
    <ul class="trip-days"></ul>
  `);
};

export default class Cards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}