import FiltersComponent from "./components/filter";
import MenuComponent from "./components/site-menu";
import NoEventsMessage from "./components/no-message";
import {render, RenderPosition} from "./utils/render";
import {filters} from "./mock/filter";
import {menuItems} from "./mock/site-menu";
import {cards} from "./mock/card";
import TripController from "./controllers/TripController";

const tripEvents = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);

render(tripControls, new MenuComponent(menuItems), RenderPosition.BEFOREEND);

render(tripControls, new FiltersComponent(filters), RenderPosition.BEFOREEND);

if (cards.length === 0) {
  render(tripEvents, new NoEventsMessage(), RenderPosition.BEFOREEND);
} else {
  const tripController = new TripController(tripEvents);
  tripController.render(cards);
}
