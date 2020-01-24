import SiteMenu from "./components/site-menu";
import NoEventsMessage from "./components/no-message";
import TripDays from "./components/trip-days";
import CardsModel from "./models/points";
import FilterController from './controllers/FilterController';
import {render, RenderPosition} from "./utils/render";
import {menuItems} from "./mock/site-menu";
import {cards} from "./mock/card";
import TripController from "./controllers/TripController";

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const tripEvents = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripDays = new TripDays();

render(tripControls, new SiteMenu(menuItems), RenderPosition.BEFOREEND);

const filterController = new FilterController(tripControls, cardsModel);
filterController.render();

render(tripEvents, tripDays, RenderPosition.BEFOREEND);

if (cards.length === 0) {
  render(tripEvents, new NoEventsMessage(), RenderPosition.BEFOREEND);
} else {
  const tripController = new TripController(tripDays, cardsModel);
  tripController.render(cards);
  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
    tripController.createCard();
  });
}
