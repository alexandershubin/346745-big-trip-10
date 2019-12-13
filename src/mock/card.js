import {DescriptionText, TypePointWay, Cites, Transfers, Activities, MoreOptions} from "../const";
import {getRandomIntegerNumber} from "../utils/common";

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
const getRandomCites = () => Cites[getRandomIntegerNumber(0, Cites.length)];

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
  const randomSecondDate = new Date(randomFirstDate.setHours(randomFirstDate.getHours() + 2));
  const end = randomSecondDate;
  return {
    type: getRandomType(),
    cites: getRandomCites(),
    photo: getPictureLoad(),
    description: getRandomText(),
    start,
    end,
    trans: getNumberTransfer(),
    active: getNumberActive(),
    offer: sum,
    option: getRandomOption(),
    isArchive: Math.random() > 0.5,
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};
