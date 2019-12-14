import {render, RenderPosition, replace} from "../utils/render";
import CardComponent from "../components/card";
import NewEventFormsComponent from "../components/form-edit";
import {generateCards} from "../mock/card";
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

  cardComponent.setEditButtonClickHandler(() => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  newEventFormsComponent.setSubmitHandler(replaceCardToEdit);

  render(siteFilterElement, cardComponent, RenderPosition.BEFOREEND);
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._pointComponent = new PointComponent();
    this._cardComponent = new CardComponent();

  }

  render(cards) {
    const container = this._container.getElement();

    render(container, this._cardComponent, RenderPosition.BEFOREEND);

    const generatePoint = () => {
      render(container, this._pointComponent, RenderPosition.BEFOREEND);
    };
    if (CARD__COUNT === 0) {
      generatePoint();
    }
    // карточки
    new Array(CARD__COUNT)
    .fill(``)
    .forEach(
        () => renderCard(cards)
    );
  }
}
