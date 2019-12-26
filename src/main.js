import CardEditComponent from "./components/form-edit";
import EventsSortingComponent from "./components/sort";
import FiltersComponent from "./components/filter";
import MenuComponent from "./components/site-menu";
import TripDayItemComponent from "./components/trip-day";
import TripDaysComponent from "./components/trip-days";
import TripInfoComponent from "./components/trip-info";
import CardComponent from "./components/card";
import {renderElement, RenderPosition} from "./utils";
import {filters} from "./mock/filter";
import {menuItems} from "./mock/site-menu";
import {cards} from "./mock/card";

const dates = [...new Set(cards.map((item) => new Date(item.startDate).toDateString()))];

const tripInfo = document.querySelector(`.trip-main__trip-info`);
renderElement(tripInfo, new TripInfoComponent(cards).getElement(), RenderPosition.AFTERBEGIN);

const tripControls = document.querySelector(`.trip-main__trip-controls`);

renderElement(tripControls, new MenuComponent(menuItems).getElement(), RenderPosition.BEFOREEND);

renderElement(tripControls, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
renderElement(tripEvents, new EventsSortingComponent().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvents, new TripDaysComponent().getElement(), RenderPosition.BEFOREEND);

const tripDays = document.querySelector(`.trip-days`);

dates.forEach((date, dateIndex) => {
  const day = new TripDayItemComponent(new Date(date), dateIndex + 1).getElement();
  cards
  .filter((_card) => new Date(_card.startDate).toDateString() === date)
  .forEach((_card) => {
    const eventsList = day.querySelector(`.trip-events__list`);

    const cardComponent = new CardComponent(_card);
    const cardEditComponent = new CardEditComponent(_card);

    renderElement(eventsList, cardComponent.getElement(), RenderPosition.BEFOREEND);

    cardComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      eventsList.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
    });

    cardEditComponent.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      eventsList.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
    });
  });

  renderElement(tripDays, day, RenderPosition.BEFOREEND);
});

const getFullPrice = cards.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
