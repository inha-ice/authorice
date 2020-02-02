const filterObject = (object, fn) => Object.fromEntries(Object.entries(object).filter(fn));

const mapObject = (object, fn) => Object.entries(object).reduce((acc, [key, value]) => {
  acc[key] = fn(value);
  return acc;
}, {});

module.exports = {
  filterObject,
  mapObject,
};
