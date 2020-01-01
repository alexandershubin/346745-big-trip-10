import CardEditComponent from "../components/form-edit";
import SortComponent from "../components/sort";
import TripDayItemComponent from "../components/trip-day";
import TripInfoComponent from "../components/trip-info";
import CardComponent from "../components/card";
import {SortType} from "../const";
import {render, RenderPosition, replace} from "../utils/render";

const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-main__trip-info`);

const renderCards = (cards, container, isDefaultSorting = true) => {
  const dates = isDefaultSorting
    ? [...new Set(cards.map((item) => new Date(item.startDate).toDateString()))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? new TripDayItemComponent(new Date(date), dateIndex + 1) : new TripDayItemComponent();
    const dayElement = day.getElement();

    cards.filter((card) => {
      return isDefaultSorting ? new Date(card.startDate).toDateString() === date : card;
    }).forEach((card) => {
      const eventsList = dayElement.querySelector(`.trip-events__list`);

      const cardComponent = new CardComponent(card);
      const cardEditComponent = new CardEditComponent(card);

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
          replace(cardComponent, cardEditComponent);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      render(eventsList, cardComponent, RenderPosition.BEFOREEND);

      cardComponent.setClickHandler(() => {
        replace(cardEditComponent, cardComponent);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      cardEditComponent.setSubmitHandler((evt) => {
        evt.preventDefault();
        replace(cardComponent, cardEditComponent);
      });
    });

    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._eventsSortingComponent = new SortComponent();
  }

  render(cards) {
    renderCards(cards, this._container);

    render(tripInfo, new TripInfoComponent(cards), RenderPosition.AFTERBEGIN);

    render(tripEvents, this._eventsSortingComponent, RenderPosition.AFTERBEGIN);

    this._eventsSortingComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.CANCEL:
          sortedCards = cards.slice();
          isDefaultSorting = true;
          break;
        case SortType.TIME:
          sortedCards = cards.slice().sort((a, b) => b.startDate - a.startDate);
          break;
        case SortType.PRICE:
          sortedCards = cards.slice().sort((a, b) => b.price - a.price);
          break;
      }

      this._container.getElement().innerHTML = ``;
      renderCards(sortedCards, this._container, isDefaultSorting);
    });

    const getFullPrice = cards.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }
}
