import AbstractComponent from './abstract-component.js';


const createFilterTemplate = (filters) =>{
  return (
    `<form class="trip-filters" action="#" method="get">
    ${filters
    .map((filter) => {
      return `
          <div class="trip-filters__filter">
            <input
              id="filter-${filter.name}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${filter.name}"
              ${filter.checked && `checked`}
            />
            <label class="trip-filters__filter-label" for="filter-
            ${filter.name}">
            ${filter.name}
            </label>
          </div>
      `;
    })
    .join(``)}
  
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
`);
};

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}
