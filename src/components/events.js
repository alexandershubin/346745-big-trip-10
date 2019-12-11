import {createElement} from "../utils";

const createEventsTemplate = () => {
  return (`
  <section class="trip-events"></section>
  `);
};

export default class Event {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsTemplate();
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
