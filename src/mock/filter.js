import {filtersNames} from "../const";

const generateFilters = () => {
  return filtersNames.map((it) => {
    return {
      name: it,
    };
  });
};

export {generateFilters};
