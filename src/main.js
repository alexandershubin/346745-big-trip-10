import {createInfoAboutWayTemplate} from "./components/create-info-way";
import {createDayTemplate} from "./components/day";
import {createFiltersTemplate} from "./components/filter";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createTripDaysTemplate} from "./components/trip-days";
import {createCardTemplate} from "./components/card";
import {createEditCardFormsTemplate} from "./components/edit-form";
import {cards} from "./mock/card";
import {generateCards} from "./mock/card";
import {MonthNames} from "./const";
import {generateFilters} from "./mock/filter";
import {generateMenu} from "./mock/menu";
// import {RenderPosition} from "./utils";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
// вставляю меню и фильтр
const siteMenuElement = document.querySelector(`.trip-controls`);
const menus = generateMenu();
const filters = generateFilters();
render(siteMenuElement, createMenuTemplate(menus));
render(siteMenuElement, createFiltersTemplate(filters));

// Форма изменения
const siteFormChangeElements = document.querySelector(`.trip-events`);
render(siteFormChangeElements, createSortTemplate());
render(siteFormChangeElements, createTripDaysTemplate());

// const createDay = new CreateDay();
const tripDaysElement = document.querySelector(`.trip-days`);

// Форма редактирования
const event = generateCards();
render(siteFormChangeElements, createEditCardFormsTemplate(event));

// получаем уникальные дни
let unicDay = new Set();

cards.forEach((card) => {
  const date = new Date(card.start);
  unicDay.add(`${MonthNames[date.getMonth()]} ${date.getDay()}`);
});

Array.from(unicDay).forEach((day) => {
  render(tripDaysElement, createDayTemplate(day));
  const tripEventsListElement = document.querySelector(`.trip-events__list`);
  cards.forEach((card) => render(tripEventsListElement, createCardTemplate(card)));
});

// информация о маршруте
const siteInfoWayElement = document.querySelector(`.trip-main`);
render(siteInfoWayElement, createInfoAboutWayTemplate(), `afterbegin`);
