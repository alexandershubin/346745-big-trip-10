import {createCardTemplate} from "./components/card";
import {createFiltersTemplate} from "./components/filter";
import {createInfoAboutWayTemplate} from "./components/info-way";
import {createMenuTemplate} from "./components/site-menu";
import {createNewEventFormsTemplate} from "./components/form-edit";
import {generateCards} from "./mock/card";
import {generateFilters} from "./mock/filter";
import {generateMenu} from "./mock/site-menu";

const CARD__COUNT = 4;

// функция для вставки блоков в index
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// вставляю меню и фильтр
const siteMenuElement = document.querySelector(`.trip-controls`);
const siteFilterElement = document.querySelector(`.trip-events`);

const menus = generateMenu();
const filters = generateFilters();
render(siteMenuElement, createMenuTemplate(menus), `beforeend`);
render(siteMenuElement, createFiltersTemplate(filters), `beforeend`);

// Форма создания и изменения
const siteFormChangeElements = document.querySelector(`.trip-events`);
render(siteFormChangeElements, createNewEventFormsTemplate(), `beforeend`);

// карточки
const cards = generateCards(CARD__COUNT);
new Array(CARD__COUNT)
.fill(``)
.forEach(
    () => render(siteFilterElement, createCardTemplate(cards), `beforeend`)
);

// информация о маршруте
const siteInfoWayElement = document.querySelector(`.trip-main`);
render(siteInfoWayElement, createInfoAboutWayTemplate(), `afterbegin`);
