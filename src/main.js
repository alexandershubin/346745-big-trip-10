import {createCardTemplate} from "./components/card";
import {createFiltersTemplate} from "./components/filter";
import {createInfoAboutWayTemplate} from "./components/info-way";
import {createMenuTemplate} from "./components/site-menu";
import {createNewEventFormsTemplate} from "./components/form-edit";
import {generateTask} from "./mock/task";
import {generateTasks} from "./mock/task";

const CARD__COUNT = 4;
// функция для вставки блоков в index
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// вставляю меню и фильтр
const siteMenuElement = document.querySelector(`.trip-controls`);
const siteFilterElement = document.querySelector(`.trip-events`);

render(siteMenuElement, createMenuTemplate(), `beforeend`);
render(siteMenuElement, createFiltersTemplate(), `beforeend`);

// Форма создания и изменения
const siteFormChangeElements = document.querySelector(`.trip-events`);
render(siteFormChangeElements, createNewEventFormsTemplate(), `beforeend`);

// карточки
new Array(CARD__COUNT)
.fill(``)
.forEach(
    () => render(siteFilterElement, createCardTemplate(), `beforeend`)
);

// информация о маршруте
const siteInfoWayElement = document.querySelector(`.trip-main`);
render(siteInfoWayElement, createInfoAboutWayTemplate(), `afterbegin`);
