
export const createMenuTemplate = (menus) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
     ${menus.map(renderMenu).join(``)}
    </nav>`
  );
};


const renderMenu = (menu) => {
  const isActive = menu.value ? `trip-tabs__btn--active` : ``;
  return (`
   <a class="trip-tabs__btn ${isActive}" href="#">${menu.name}</a>
  `);
};

// export default class Menu {
//   constructor(menu) {
//     this._menu = menu;
//
//     this._element = null;
//   }
//
//   getTemplate() {
//     return createMenuTemplate(this._menu);
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
