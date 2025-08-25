// utils/localStorageWithExpiry.js

/**
 * Stores a value in localStorage with an expiration time.
 * @param {string} key - Storage key.
 * @param {*} value - Value to store.
 * @param {number} ttl - Time to live in milliseconds.
 */
function setItemWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Retrieves a value from localStorage, checking for expiry.
 * @param {string} key - Storage key.
 * @returns {*} - Stored value or null if expired/missing.
 */
function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (e) {
    return null;
  }
}

/**
 * Removes a value from localStorage.
 * @param {string} key - Storage key.
 */
function removeItem(key) {
  localStorage.removeItem(key);
}
