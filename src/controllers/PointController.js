import Card from '../components/card';
import FormEdit from "../components/form-edit";
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {Mode} from "../const";
import {EmptyCard} from "../mock/card";

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._cardComponent = null;
    this._cardEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card, mode) {
    const oldCardComponent = this._cardComponent;
    const oldFormEditComponent = this._cardEditComponent;
    this._mode = mode;
    this._cardComponent = new Card(card);
    this._cardEditComponent = new FormEdit(card);
    this._cardComponent.setClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._cardEditComponent.getData();
      this._onDataChange(card, data, this);
    });

    this._cardEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(card, null, this));

    this._cardEditComponent.setFavoritesButtonClickHandler(() => {
      const newCard = Object.assign({}, card, {isFavorite: !card.isFavorite});
      this._onDataChange(card, newCard, this);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldFormEditComponent && oldCardComponent) {
          replace(this._cardComponent, oldCardComponent);
          replace(this._cardEditComponent, oldFormEditComponent);
          this._replaceEditToCard();
        } else {
          render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldFormEditComponent && oldCardComponent) {
          remove(oldCardComponent);
          remove(oldFormEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(
            this._container,
            this._cardEditComponent,
            RenderPosition.AFTERBEGIN
        );
        break;
    }
  }

  _replaceEditToCard() {
    replace(this._cardComponent, this._cardEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replace(this._cardEditComponent, this._cardComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(EmptyCard, null, this);
      }
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
  }

  destroy() {
    remove(this._cardEditComponent);
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
