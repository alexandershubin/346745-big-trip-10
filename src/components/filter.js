
export const createFiltersTemplate = (filters) => {
  return (
    `<form class="trip-filters" action="#" method="get">
       ${filters.map(renderFilter).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

const renderFilter = (filter) => {
  const {name} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">${name}</label>
    </div>
`);
};

// export default class Filter {
//   constructor(filter) {
//     this._filter = filter;
//
//     this._element = null;
//   }
//
//   getTemplate() {
//     return createFiltersTemplate(this._filter);
//   }
//
//   getElement() {
//     if (!this._element) {
//       this._element = createElement(this.getTemplate());
//     }
//
//     return this._element;
//   }
//
//   removeElement() {
//     this._element = null;
//   }
// }
