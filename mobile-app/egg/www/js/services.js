angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  return null;
})
.factory('storage', function() {
  // Might use a resource here that returns a JSON array

  return {
      set: function (key, value) {
          value = JSON.stringify(value);
          return localStorage.setItem(key, value);
      },
      get: function (key) {
          key = key || '';
          var value = localStorage.getItem(key);
          value = value ? JSON.parse(value) : '';

          return value ? value : null;
      }
  };
});
