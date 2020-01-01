import FiltersComponent from "./components/filter";
import MenuComponent from "./components/site-menu";
import NoEventsMessage from "./components/no-message";
import TripDaysComponent from "./components/trip-days";
import {render, RenderPosition} from "./utils/render";
import {filters} from "./mock/filter";
import {menuItems} from "./mock/site-menu";
import {cards} from "./mock/card";
import TripController from "./controllers/TripController";

const tripEvents = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripDaysComponent = new TripDaysComponent();

render(tripControls, new MenuComponent(menuItems), RenderPosition.BEFOREEND);
render(tripControls, new FiltersComponent(filters), RenderPosition.BEFOREEND);
render(tripEvents, tripDaysComponent, RenderPosition.BEFOREEND);

if (cards.length === 0) {
  render(tripEvents, new NoEventsMessage(), RenderPosition.BEFOREEND);
} else {
  const tripController = new TripController(tripDaysComponent);
  tripController.render(cards);
}
