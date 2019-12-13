import AbstractComponent from './abstract-component.js';

const createPointTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class Point extends AbstractComponent {
  getTemplate() {
    return createPointTemplate();
  }
}
