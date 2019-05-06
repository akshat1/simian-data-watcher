const numberOfValuesToKeep = 1000;
const bus = require('./pubsub');

bus.subscribe(bus.MasterKey, console.log.bind(console));

/**
 * @const {Object}
 */
const db = {
  /** @property {Object.<string, number>} */
  sum: {},
  /** @property {Object.<string, number>} */
  avg: {},
  /** @property {Object.<string, number[]>} */
  values: {},
  /** @property {Object.<string, number>} */
  count: {},
};

/**
 * 
 * @param {string} name -
 * @param {Object.<string, number>} data 
 */
function addValue(name, data) {
  Object.keys(data).forEach(propName => {
    const key = `${name}.${propName}`;
    const count = db.count[key] = (db.count[key] || 0) + 1
    const values = db.values[key] = (db.values[key] || []);
    const newValue = data[propName];
    values.push(newValue);
    const sum = db.sum[key] = (db.sum[key] || 0) + newValue;
    const avg = db.avg[key] = sum / count;
    bus.broadcast(key, {
      key,
      avg,
      count,
      newValues: [data[propName]],
      sum,
    });
  });
}

module.exports = {
  init: () => 0,
  addValue,
};