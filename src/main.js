import CardComponent from "./components/card";
import InfoWay from "./components/create-info-way";
import CreateDay from "./components/day";
import EditForm from "./components/edit-form";
import Filter from "./components/filter";
import Menu from "./components/menu";
import Sort from "./components/sort";
import TripDays from "./components/trip-days";
import {cards} from "./mock/card";
import {MonthNames} from "./const";
import {render, RenderPosition} from "./utils";
import {generateFilters} from "./mock/filter";
import {generateMenu} from "./mock/menu";

// const CARD__COUNT = 3;

const renderCard = (card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToCard = () => {
    siteFormChangeElements.replaceChild(cardComponent.getElement(), newEventFormsComponent.getElement());
  };

  const replaceCardToEdit = () => {
    siteFormChangeElements.replaceChild(newEventFormsComponent.getElement(), cardComponent.getElement());
  };

  const cardComponent = new CardComponent(card);
  const newEventFormsComponent = new EditForm(card);

  const arrowButton = cardComponent.getElement().querySelectorAll(`.event__rollup-btn`);
  arrowButton.forEach((it) => {
    it.addEventListener(`click`, () => {
      replaceCardToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  const editForm = newEventFormsComponent.getElement().querySelector(`form`);
  if (editForm) {
    editForm.addEventListener(`submit`, replaceEditToCard);
  }

  render(siteFormChangeElements, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

// вставляю меню и фильтр
const siteMenuElement = document.querySelector(`.trip-controls`);
const menus = generateMenu();
const filters = generateFilters();
render(siteMenuElement, new Menu(menus).getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

// Форма изменения
const siteFormChangeElements = document.querySelector(`.trip-events`);
// render(siteFormChangeElements, createEditCardFormsTemplate());
render(siteFormChangeElements, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteFormChangeElements, new TripDays().getElement(), RenderPosition.BEFOREEND);

const createDay = new CreateDay();
const tripDaysElement = document.querySelector(`.trip-days`);
render(tripDaysElement, createDay.getElement(), RenderPosition.BEFOREEND);
// Форма создания
const tripEventsListElement = document.querySelector(`.trip-events__list`);
// render(tripEventsListElement, createNewCardFormTemplate());

// получаем уникальные дни
let unicDay = new Set();

cards.forEach((card) => {
  const date = new Date(card.start);
  unicDay.add(`${MonthNames[date.getMonth()]} ${date.getDay()}`);
});

Array.from(unicDay).forEach((day) => {
  render(tripDaysElement, createDay.getElement(day));
  cards.forEach((card) => {
    render(tripEventsListElement, renderCard(card));
  });
});

// отрисовываем точки маршрута
// cards.forEach((card) => render(tripEventsListElement, createCardTemplate(card)));

// информация о маршруте
const siteInfoWayElement = document.querySelector(`.trip-main`);
render(siteInfoWayElement, new InfoWay().getElement(), RenderPosition.AFTERBEGIN);
