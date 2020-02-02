import {getFilterCards} from "../utils/filter";
import {FilterType} from "../const";

export default class CardsModel {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getCards() {
    return getFilterCards(this._cards, this._activeFilterType);
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  updateCard(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [
      ...this._cards.slice(0, index),
      card,
      ...this._cards.slice(index + 1)];

    this._dataChangeHandlers.forEach((handler) => handler());
    return true;
  }


  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  addCard(card) {
    this._cards = [card, ...this._cards];
    this._callHandlers(this._dataChangeHandlers);
  }

  removeCard(id) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [
      ...this._cards.slice(0, index),
      ...this._cards.slice(index + 1)
    ];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
