import SortComponent from "../components/sort";
import TripDayItemComponent from "../components/trip-day";
import TripInfoComponent from "../components/trip-info";
import {SortType} from "../const";
import {render, RenderPosition} from "../utils/render";
import PointController from "./PointController";

const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-main__trip-info`);

const renderCards = (cards, container, onDataChange, onViewChange, isDefaultSorting = true) => {
  const pointControllers = [];
  const dates = isDefaultSorting
    ? [...new Set(cards.map((item) => new Date(item.startDate).toDateString()))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? new TripDayItemComponent(new Date(date), dateIndex + 1) : new TripDayItemComponent();

    cards.filter((card) => {
      return isDefaultSorting ? new Date(card.startDate).toDateString() === date : card;
    }).forEach((card) => {
      const pointController = new PointController(day.getElement().querySelector(`.trip-events__list`), onDataChange, onViewChange);

      pointController.render(card);
      pointControllers.push(pointController);
    });

    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });
  return pointControllers;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._eventsSortingComponent = new SortComponent();
    this._cards = [];
    this._showedCardControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(cards) {
    if (this._cards.length === 0) {
      this._cards = cards;
    }
    this._showedCardControllers = renderCards(cards, this._container, this._onDataChange, this._onViewChange);

    render(tripInfo, new TripInfoComponent(cards), RenderPosition.AFTERBEGIN);

    render(tripEvents, this._eventsSortingComponent, RenderPosition.AFTERBEGIN);

    this._eventsSortingComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.DATE_DOWN:
          sortedCards = cards.slice();
          isDefaultSorting = true;
          break;
        case SortType.TIME_DOWN:
          sortedCards = cards.slice().sort((a, b) => b.startDate - a.startDate);
          break;
        case SortType.PRICE_DOWN:
          sortedCards = cards.slice().sort((a, b) => b.price - a.price);
          break;
      }

      this._container.getElement().innerHTML = ``;
      this._showedCardControllers = renderCards(
          sortedCards,
          this._container,
          this._onDataChange,
          this._onViewChange,
          isDefaultSorting
      );
    });

    const getFullPrice = cards.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }

  _onDataChange(oldCard, newCard, pointController) {
    const index = this._cards.findIndex((card) => card === oldCard);

    if (index === -1) {
      return;
    }

    this._cards = [
      ...this._cards.slice(0, index),
      newCard,
      this._cards.slice(index + 1)
    ];

    pointController.render(newCard);
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
}
