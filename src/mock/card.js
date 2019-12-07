import {DescriptionText, TypePointWay, Cites} from "../const";
import {getRandomIntegerNumber} from "../utils";

const getRandomText = () => {
  const result = [];
  const sentences = DescriptionText.slice(0);

  while (result.length < 3) {
    result.push(
        sentences.splice(getRandomIntegerNumber(0, sentences.length))
    );
  }

  return result.join(` `);
};

const getRandomType = () => TypePointWay[getRandomIntegerNumber(0, TypePointWay.length)];

// получение городов
const getRandomCites = () => Cites[getRandomIntegerNumber(0, Cites.length)];

// фото
const getPictureLoad = (item) => {
  const picture = `http://picsum.photos/300/150?r=${Math.random()}`;
  const photoArr = [];
  const picArr = picture[getRandomIntegerNumber(0, 9)];
  for (let i = 0; i < picArr.length; i++) {
    photoArr.push(item);
  }
  return photoArr;
};

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
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};

