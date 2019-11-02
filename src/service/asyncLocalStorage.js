const asyncLocalStorage = {
  setItem: function(key, value) {
    return Promise.resolve().then(function() {
      // eslint-disable-next-line no-undef
      localStorage.setItem(key, value);
    });
  },
  getItem: function(key) {
    return Promise.resolve().then(function() {
      // eslint-disable-next-line no-undef
      return localStorage.getItem(key);
    });
  },
};

export default asyncLocalStorage;
