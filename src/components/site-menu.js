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
