import AbstractComponent from './abstract-component.js';

const createSiteMenuTemplate = (menuItems) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menuItems.map((item) =>
      `<a class="trip-tabs__btn ${item.active && `trip-tabs__btn--active`}" href="#">${item.name}</a>`
    ).join(``)}</nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItems);
  }
}
