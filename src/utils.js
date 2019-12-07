const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// ф-я для получения даты
const castTimeFormat = (value) => {
  return value > 9 ? value : `0` + value;
};

export {getRandomArrayItem, getRandomIntegerNumber, castTimeFormat};
