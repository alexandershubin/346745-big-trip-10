import AbstractComponent from "./abstract-component";


const createNoMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoEventsMessage extends AbstractComponent {
  getTemplate() {
    return createNoMessageTemplate();
  }
}
