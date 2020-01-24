import Sort from "../components/sort";
import TripDay from "../components/trip-day";
import TripInfo from "../components/trip-info";
import {SortType, Mode} from "../const";
import {render, RenderPosition} from "../utils/render";
import PointController from "./PointController";
import {EmptyCard} from "../mock/card";


const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-main__trip-info`);

const renderCards = (cards, container, onDataChange, onViewChange, isDefaultSorting) => {
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

      pointController.render(card, Mode.DEFAULT);
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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._cardsModel.setFilterChangeHandler(this._onFilterChange);
    this._creatingCard = null;
  }

  createCard() {
    if (this._creatingCard) {
      return;
    }

    this._creatingCard = new PointController(
        this._container.getElement(),
        this._onDataChange,
        this._onViewChange
    );

    this._creatingCard.render(EmptyCard, Mode.ADDING);
    this._onViewChange();
  }

  _updateCards() {
    this._removeCards();
    const container = this._container;
    const cards = this._cardsModel.getCards();
    const onDataChange = this._onDataChange;
    const onViewChange = this._onViewChange;
    this._showedCardControllers = renderCards(cards, container, onDataChange, onViewChange, this._isDefaultSorting);
  }

  render() {
    const container = this._container;
    const cards = this._cardsModel.getCards();
    const onDataChange = this._onDataChange;
    const onViewChange = this._onViewChange;

    this._showedCardControllers = renderCards(cards, container, onDataChange, onViewChange, this._isDefaultSorting);

    render(tripInfo, new TripInfo(this._cardsModel.getCards()), RenderPosition.AFTERBEGIN);

    render(tripEvents, this._eventsSortingComponent, RenderPosition.AFTERBEGIN);

    this._eventsSortingComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.CANCEL:
          sortedCards = this._cardsModel.getCards().slice().sort((a, b) => a.startDate - b.startDate);
          this._isDefaultSorting = true;
          break;
        case SortType.TIME:
          sortedCards = this._cardsModel.getCards().slice().sort((a, b) => b.endDate - b.startDate - (a.endDate - a.startDate));
          this._isDefaultSorting = true;
          break;
        case SortType.PRICE:
          sortedCards = this._cardsModel.getCards().slice().sort((a, b) => b.price - a.price);
          this._isDefaultSorting = true;
          break;
      }

      this._removeCards();
      this._showedCardControllers = renderCards(sortedCards, container, onDataChange, onViewChange, this._isDefaultSorting);
    });

    const getFullPrice = this._cardsModel.getCards().reduce((acc, item) => {
      return (acc + item.price + item.offers.reduce((_acc, _item) => _acc + _item.price, 0));
    }, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }

  _onDataChange(oldCard, newCard, pointController) {
    if (oldCard === EmptyCard) {
      this._creatingCard = null;
      if (newCard === null) {
        pointController.destroy();
        this._updateCards();
      } else {
        this._cardsModel.addCard(newCard);

        this._showedCardControllers = [pointController, ...this._showedCardControllers];

        this._removeCards();
        const container = this._container;
        const cards = this._cardsModel.getCards();
        const onDataChange = this._onDataChange;
        const onViewChange = this._onViewChange;
        this._showedCardControllers = renderCards(cards, container, onDataChange, onViewChange, this._isDefaultSorting);

      }
    } else if (newCard === null) {
      this._cardsModel.removeCard(oldCard.id);
      this._updateCards();
    } else {
      const isSuccess = this._cardsModel.updateCard(oldCard.id, newCard);

      if (isSuccess) {
        pointController.render(newCard, Mode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateCards();
  }

  _removeCards() {
    this._container.getElement().innerHTML = ``;
    this._showedCardControllers.forEach((pointController) =>
      pointController.destroy()
    );
    this._showedCardControllers = [];
  }
}
