import {render, RenderPosition, replace} from "../utils/render";
import CardComponent from "../components/card";
import NewEventFormsComponent from "../components/form-edit";
import PointComponent from "../components/points";
import {CARD__COUNT} from "../main";

const siteFilterElement = document.querySelector(`.trip-events`);

const renderCard = (card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToCard = () => {
    replace(cardComponent, newEventFormsComponent);
  };

  const replaceCardToEdit = () => {
    replace(newEventFormsComponent, cardComponent);
  };

  const cardComponent = new CardComponent(card);
  const newEventFormsComponent = new NewEventFormsComponent(card);

  cardComponent.forEach((it) => {
    it.setEditButtonClickHandler(() => {
      replaceCardToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  newEventFormsComponent.setSubmitHandler(replaceEditToCard);

  render(siteFilterElement, cardComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._PointComponent = new PointComponent();
  }
  render(card) {
    const container = this._container.getElement();

    const generatePoint = () => {
      render(container, this._PointComponent(), RenderPosition.BEFOREEND);
    };
    if (CARD__COUNT === 0) {
      generatePoint();
    }
    // карточки
    new Array(CARD__COUNT)
    .fill(``)
    .forEach(
        () => renderCard(card)
    );
  }
}
