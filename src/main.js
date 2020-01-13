import Filter from "./components/filter";
import SiteMenu from "./components/site-menu";
import NoEventsMessage from "./components/no-message";
import TripDays from "./components/trip-days";
import {render, RenderPosition} from "./utils/render";
import {filters} from "./mock/filter";
import {menuItems} from "./mock/site-menu";
import {cards} from "./mock/card";
import TripController from "./controllers/TripController";

const tripEvents = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripDaysComponent = new TripDays();

render(tripControls, new SiteMenu(menuItems), RenderPosition.BEFOREEND);
render(tripControls, new Filter(filters), RenderPosition.BEFOREEND);
render(tripEvents, tripDaysComponent, RenderPosition.BEFOREEND);

if (cards.length === 0) {
  render(tripEvents, new NoEventsMessage(), RenderPosition.BEFOREEND);
} else {
  const tripController = new TripController(tripDaysComponent);
  tripController.render(cards);
}
