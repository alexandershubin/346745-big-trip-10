import SiteMenu from "./components/site-menu";
import CardsModel from "./models/points";
import FilterController from './controllers/FilterController';
import TripController from "./controllers/TripController";
import Statistics from './components/statistics';
import {render, RenderPosition} from "./utils/render";
import {MenuItem, menuItems} from "./mock/site-menu";
import {cards} from "./mock/card";

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const tripEvents = document.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-body__page-main`);

const siteMenuComponent = new SiteMenu(menuItems);
const statisticsComponent = new Statistics(cardsModel);
const tripController = new TripController(tripEvents, cardsModel);

render(tripControls, siteMenuComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(tripControls, cardsModel);
filterController.render();

tripController.render(cards);
document.querySelector(`.trip-main__event-add-btn`)
.addEventListener(`click`, () => {
  tripController.createCard();
});

render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setChangeHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setActiveItem(MenuItem.TABLE);
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      siteMenuComponent.setActiveItem(MenuItem.STATS);
      statisticsComponent.show();
      tripController.hide();
      break;
  }
});

