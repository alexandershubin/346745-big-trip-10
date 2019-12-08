
export const createNewEventFormsTemplate = (events) => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${events.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

             ${events.map(renderEventTransfer)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
                ${events.map(renderEventActive)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Sightseeing at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
          <datalist id="destination-list-1">
            ${events.map(renderCites)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
          —
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${events.price}</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${events.map(renderOffers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${events.map(renderPhoto)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

const renderEventTransfer = (event) => {
  return (`
    <div class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">${event.trans}</label>
    </div>
`);
};

const renderEventActive = (active) => {
  return (`
    <div class="event__type-item">
      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">${active.active}</label>
    </div>
`);
};

const renderCites = (cites) => {
  return (`
  <option value="${cites.cites}"></option>
 `);
};


const renderOffers = (offer) => {
  return (`           
     <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
        <label class="event__offer-label" for="event-offer-comfort-1">
          <span class="event__offer-title">Switch to comfort class</span>
          +
          €&nbsp;<span class="event__offer-price">100</span>
        </label>
      </div>
  `);
};

const renderPhoto = (photo) => {
  return (`<img class="event__photo" src="${photo.photo}" alt="Event photo">
  `);
};


