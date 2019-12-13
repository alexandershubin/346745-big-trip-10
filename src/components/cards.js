import AbstractComponent from './abstract-component.js';

const createCardsTemplate = () => {
  return (`
    <ul class="trip-days"></ul>
  `);
};

export default class Cards extends AbstractComponent {
  getTemplate() {
    return createCardsTemplate();
  }
}
