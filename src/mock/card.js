import {cities, offers, sentences, types} from "../const";

const CARDS_COUNT = 10;
const OFFERS_COUNT = 3;

const shuffleArray = (arr) => {
  for (let i = 0; i > arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getRandomOffers = () => shuffleArray(offers).slice(2);

const getPictureLoad = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

export const getRandomPicture = () =>
  Array(5)
  .fill(``)
  .map(getPictureLoad);

export const getRandomText = () =>
  shuffleArray(sentences)
  .slice(0, getRandomIntegerNumber(1, 4))
  .join(` `);

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = () => {
  return (
    Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomIntegerNumber(0, 60) * 60 * 1000
  );
};

const generateCard = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    type: getRandomArrayItem(types),
    city: getRandomArrayItem(cities),
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    offers: shuffleArray(offers).slice(0, OFFERS_COUNT),
    photos: Array(5)
    .fill(``)
    .map(getPictureLoad),
    description: getRandomText(sentences),
    price: getRandomIntegerNumber(10, 100),
    isFavorite: false
  };
};

const generateCards = (count) => {
  return Array(count)
  .fill(``)
  .map(generateCard)
  .sort(
      (currentCard, nextCard) => currentCard.startDate - nextCard.startDate
  );
};

export const EmptyCard = {
  id: String(Date.now() + Math.random()),
  type: getRandomArrayItem(types),
  city: getRandomArrayItem(cities),
  startDate: Date.now(),
  endDate: Date.now(),
  offers: [],
  photos: [],
  description: ``,
  price: 0,
  isFavorite: false,
  isNew: true
};

export const cards = generateCards(CARDS_COUNT);
