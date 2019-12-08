import {menu} from "../const";

const generateMenu = () => {
  return menu.map((item) => {
    return {
      name: item,
    };
  });
};

export {generateMenu};
