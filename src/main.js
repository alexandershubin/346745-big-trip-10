import FilterComponent from "./components/filter.js";
import InfoAboutWayComponent from "./components/info-way";
import MenuComponent from "./components/site-menu";
import {generateFilters} from "./mock/filter";
import {generateMenu} from "./mock/site-menu";
import {render, RenderPosition} from './utils/render.js';
import TripController from './controllers/trip.js';
import {generateCards} from "./mock/card";

export const CARD__COUNT = 4;

// вставляю меню и фильтр
const siteMenuElement = document.querySelector(`.trip-controls`);

const menus = generateMenu();
const filters = generateFilters();
render(siteMenuElement, new MenuComponent(menus), RenderPosition.BEFOREEND);
render(siteMenuElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const cards = generateCards(CARD__COUNT);

// информация о маршруте
const siteInfoWayElement = document.querySelector(`.trip-main`);
render(siteInfoWayElement, new InfoAboutWayComponent(), RenderPosition.AFTERBEGIN);

const tripController = new TripController(siteInfoWayElement);
tripController.render(cards);
