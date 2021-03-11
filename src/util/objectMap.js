const objectMap = (object, func) => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = func(object[key]);
    return result;
  }, {});
};

export default objectMap;
