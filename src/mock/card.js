import {DescriptionText, TypePointWay, Cities, Transfers, Activities, MoreOptions} from "../const";
import {getRandomIntegerNumber} from "../utils";

const CARDS_COUNT = 3;

const getRandomText = () => {
  const result = [];
  const sentences = DescriptionText.slice(0);

  while (result.length < 3) {
    result.push(
        sentences[getRandomIntegerNumber(0, sentences.length)]
    );
  }
  return result.join(` `);
};

const getRandomType = () => TypePointWay[getRandomIntegerNumber(0, TypePointWay.length)];

const getNumberActive = () => {
  return Activities.join(`\n`);
};

const getNumberTransfer = () => {
  return Transfers.join(`\n`);
};

// получение городов
const getRandomCites = () => Cities[getRandomIntegerNumber(0, Cities.length)];

// фото
const getPictureLoad = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

// offer
export let renderTwoOption = MoreOptions.slice(0, 2);
const sum = renderTwoOption.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.price;
}, 0);

const getRandomOption = () => MoreOptions[getRandomIntegerNumber(0, MoreOptions.length)];

// дата;
const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

let randomFirstDate = getRandomDate(new Date(), new Date(2020, 11, 31));

const generateCard = () => {
  const start = randomFirstDate;
  const end = new Date(randomFirstDate.setHours(randomFirstDate.getHours() + 2));
  return {
    type: getRandomType(),
    city: getRandomCites(),
    photo: getPictureLoad(),
    description: getRandomText(),
    start,
    end,
    trans: getNumberTransfer(),
    active: getNumberActive(),
    offer: sum,
    option: getRandomOption(),
  };
};

const generateCards = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateCard);
};

const cards = generateCards(CARDS_COUNT);
export {cards};
