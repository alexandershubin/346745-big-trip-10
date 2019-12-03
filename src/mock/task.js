const TypePointWay = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`,
];

const TypePIconWay = {
  'bus': `./img/icons/bus.png`,
  'check-in': `./img/icons/check-in.png`,
  'drive': `./img/icons/drive.png`,
  'flight': `./img/icons/flight.png`,
  'restaurant': `./img/icons/restaurant.png`,
  'ship': `./img/icons/ship.png`,
  'sightseeing': `./img/icons/sightseeing.png`,
  'taxi': `./img/icons/taxi.png`,
  'train': `./img/icons/train.png`,
  'transport': `./img/icons/transport.png`,
  'trip': `./img/icons/trip.png`,
};

const Cites = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
];

const DescriptionText = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const getRandomText = () => {
  return DescriptionText.slice(0, getRandomIntegerNumber(0, 2));
};

const getPictureLoad = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const MoreOptions = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 10,
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: 150
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: 2
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: 9
  },
];

const TimeStart = [
  10.00,
  11.00,
  12.00,
  13.00,
];

const TimeFinished = [
  15.00,
  16.00,
  17.00,
  18.00,
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
