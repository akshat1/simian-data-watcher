/**
 * @const {Object.<string, function>}
 */
const subscribers = {};

const MasterKey = '*';

/**
 * @param {string} key -
 * @param {function} fn -
 */
const subscribe = (key, fn) => (subscribers[key] = subscribers[key]||[]).push(fn);

/**
 * @param {string} key -
 * @param {Object} payload - 
 */
const broadcast = (key, payload) => {
  (subscribers[key] || []).forEach(fn => fn(payload));
  if (key !== MasterKey) broadcast(MasterKey, payload);
}

/**
 * @param {string} key -
 * @param {function} fn -
 */
const unsubcribe = (key, fn) => subscribers[key] = (subscribers[key]||[]).filter(f => f !== fn);

/**
 * @param {string} key -
 */
const unsubscribeAll = key => subscribe[key] = [];

module.exports = {
  broadcast,
  MasterKey,
  subscribe,
  unsubcribe,
  unsubscribeAll,
}
