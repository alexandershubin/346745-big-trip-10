import Sort from "../components/sort";
import TripDay from "../components/trip-day";
import TripDays from "../components/trip-days";
import TripInfo from "../components/trip-info";
import NoEventsMessage from "../components/no-message";
import {SortType, Mode} from "../const";
import {render, RenderPosition, remove} from "../utils/render";
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

    this._sort = null;
    this._showedCardControllers = [];
    this._isDefaultSorting = true;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._cardsModel.setFilterChangeHandler(this._onFilterChange);
    this._creatingCard = null;
    this._tripDays = new TripDays();
    this._noEventsMessage = null;
    this._tripInfoComponent = null;

    render(this._container, this._tripDays, RenderPosition.BEFOREEND);
  }

  createCard() {
    if (this._creatingCard) {
      return;
    }

    this._creatingCard = new PointController(
        this._tripDays.getElement(),
        this._onDataChange,
        this._onViewChange
    );

    this._creatingCard.render(EmptyCard, Mode.ADDING);
    this._onViewChange();
  }

  _updateCards() {
    this._removeCards();
    this._showedCardControllers = renderCards(
        this._cardsModel.getCards(),
        this._tripDays,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSorting);
  }

  _showNoEventsMessage() {
    if (this._cardsModel.getCards().length === 0) {
      if (!this._noEventsMessage) {
        this._noEventsMessage = new NoEventsMessage();
        render(tripEvents, this._noEventsMessage, RenderPosition.BEFOREEND);
      }
    } else {
      if (this._noEventsMessage) {
        remove(this._noEventsMessage);
        this._noEventsMessage = null;
        this.render();
      }
    }
    this._reset();
  }

  _reset() {
    this._tripDays.getElement().innerHTML = ``;
    this._getFullPrice();

    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
    }
    if (this._sort) {
      remove(this._sort);
    }

    if (this._cardsModel.getCards().length) {
      this._sort = new Sort();
      this._tripInfoComponent = new TripInfo(this._cardsModel.getCards());

      this.render();
    }
  }

  render() {
    if (this._cardsModel.getCards().length === 0) {
      this._showNoEventsMessage();
      return;
    }

    this._showedCardControllers = renderCards(
        this._cardsModel.getCards(),
        this._tripDays,
        this._onDataChange,
        this._onViewChange,
        this._isDefaultSorting);

    this._sort = new Sort();
    this._tripInfoComponent = new TripInfo(this._cardsModel.getCards());

    render(tripInfo, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    render(tripEvents, this._sort, RenderPosition.AFTERBEGIN);

    this._sort.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.CANCEL:
          sortedCards = this._cardsModel
          .getCards()
          .slice()
          .sort(
              (a, b) => a.startDate - b.startDate);
          this._isDefaultSorting = true;
          break;
        case SortType.TIME:
          sortedCards = this._cardsModel
          .getCards()
          .slice()
          .sort(
              (a, b) => b.endDate - b.startDate - (a.endDate - a.startDate));
          this._isDefaultSorting = true;
          break;
        case SortType.PRICE:
          sortedCards = this._cardsModel
          .getCards()
          .slice()
          .sort(
              (a, b) => b.price - a.price);
          this._isDefaultSorting = false;
          break;
      }

      this._removeCards();
      this._showedCardControllers = renderCards(
          sortedCards,
          this._tripDays,
          this._onDataChange,
          this._onViewChange,
          this._isDefaultSorting
      );
    });

    this._getFullPrice();
  }

  _getFullPrice() {
    const fullPrice = this._cardsModel.getCards().reduce((acc, item) => {
      return (acc + Number(item.price) +
        item.offers.reduce((_acc, _item) => _acc + Number(_item.price), 0));
    }, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = fullPrice;
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
        this._showedCardControllers = renderCards(
            this._cardsModel.getCards(),
            this._tripDays,
            this._onDataChange,
            this._onViewChange,
            this._isDefaultSorting);
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
    this._showNoEventsMessage();
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateCards();
  }

  _removeCards() {
    this._tripDays.getElement().innerHTML = ``;
    this._showedCardControllers.forEach((pointController) =>
      pointController.destroy()
    );
    this._showedCardControllers = [];
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }
}
