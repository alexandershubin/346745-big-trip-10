import CardComponent from "./components/card";
import FilterComponent from "./components/filter.js";
import InfoAboutWayComponent from "./components/info-way";
import MenuComponent from "./components/site-menu";
import NewEventFormsComponent from "./components/form-edit";
import {generateCards} from "./mock/card";
import {generateFilters} from "./mock/filter";
import {generateMenu} from "./mock/site-menu";
import {render, RenderPosition} from "./utils";

const CARD__COUNT = 4;

const renderCard = (card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToCard = () => {
    siteFilterElement.replaceChild(cardComponent.getElement(), newEventFormsComponent.getElement());
  };

  const replaceCardToEdit = () => {
    siteFilterElement.replaceChild(newEventFormsComponent.getElement(), cardComponent.getElement());
  };

  const cardComponent = new CardComponent(card);
  const newEventFormsComponent = new NewEventFormsComponent(card);

  const arrowButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);
  arrowButton.addEventListener(`click`, () => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = newEventFormsComponent.getElement().querySelector(`form`);
  if (editForm) {
    editForm.addEventListener(`submit`, replaceEditToCard);
  }

  render(siteFilterElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

// вставляю меню и фильтр
const siteMenuElement = document.querySelector(`.trip-controls`);
const siteFilterElement = document.querySelector(`.trip-events`);

const menus = generateMenu();
const filters = generateFilters();
render(siteMenuElement, new MenuComponent(menus).getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

// карточки
const cards = generateCards(CARD__COUNT);
new Array(CARD__COUNT)
.fill(``)
.forEach(
    () => renderCard(cards)
);

// информация о маршруте
const siteInfoWayElement = document.querySelector(`.trip-main`);
render(siteInfoWayElement, new InfoAboutWayComponent().getElement(), RenderPosition.AFTERBEGIN);
