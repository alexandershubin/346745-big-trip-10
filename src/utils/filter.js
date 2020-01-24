import {FilterType} from "../const";

export const getFutureFilter = (cards) => {
  return cards
  .filter((card) => card.startDate > Date.now())
  .sort((a, b) => a.startDate - b.startDate);
};

export const getPastFilter = (cards) => {
  return cards
  .filter((card) => card.startDate < Date.now())
  .sort((a, b) => a.startDate - b.startDate);
};

export const getFilterCards = (cards, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return cards.sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return getFutureFilter(cards);
    case FilterType.PAST:
      return getPastFilter(cards);
  }
  return cards;
};
