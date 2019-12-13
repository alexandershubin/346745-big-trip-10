import AbstractComponent from './abstract-component.js';

const createEventsTemplate = () => {
  return (`
  <section class="trip-events"></section>
  `);
};

export default class Event extends AbstractComponent {
  getTemplate() {
    return createEventsTemplate();
  }
}
