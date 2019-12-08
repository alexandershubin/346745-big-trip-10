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
