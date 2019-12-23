import {createElement} from "../utils";

export const createInfoAboutWayTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam — ... — Amsterdam</h1>

      <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
    </div>`
  );
};

export default class InfoWay {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createInfoAboutWayTemplate();
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
