import Sort from "../components/sort";
import TripDay from "../components/trip-day";
import TripInfo from "../components/trip-info";
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
    const day = isDefaultSorting ? new TripDay(new Date(date), dateIndex + 1) : new TripDay();

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
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._eventsSortingComponent = new Sort();
    this._showedCardControllers = [];
    this._isDefaultSorting = true;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    const container = this._container;
    const cards = this._cardsModel.getCards();
    const onDataChange = this._onDataChange;
    const onViewChange = this._onViewChange;

    this._showedCardControllers = renderCards(cards, container, onDataChange, onViewChange);

    render(tripInfo, new TripInfo(cards), RenderPosition.AFTERBEGIN);

    render(tripEvents, this._eventsSortingComponent, RenderPosition.AFTERBEGIN);

    this._eventsSortingComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.DATE_DOWN:
          sortedCards = cards.slice().sort((a, b) => a.startDate - b.startDate);
          this._isDefaultSorting = true;
          break;
        case SortType.TIME_DOWN:
          sortedCards = cards.slice().sort((a, b) => b.endDate - b.startDate - (a.endDate - a.startDate));
          break;
        case SortType.PRICE_DOWN:
          sortedCards = cards.slice().sort((a, b) => b.price - a.price);
          this._isDefaultSorting = false;
          break;
      }

      this._container.getElement().innerHTML = ``;
      this._showedCardControllers = renderCards(
          sortedCards,
          container,
          onDataChange,
          onViewChange,
          this._isDefaultSorting
      );
    });

    const getFullPrice = cards.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }

  _onDataChange(oldCard, newCard, pointController) {
    const isSuccess = this._cardsModel.updateCard(oldCard.id, newCard);

    if (isSuccess) {
      pointController.render(newCard);
    }
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
}
