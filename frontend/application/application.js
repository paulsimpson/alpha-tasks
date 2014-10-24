var Marionette = require('marionette'),
  View = require('./view');

module.exports = Marionette.Application.extend({
  // Polyfill for:
  // https://github.com/marionettejs/backbone.marionette/pull/1723
  constructor: function () {
    Marionette.Application.apply(this, arguments);
    this.initialize.apply(this, arguments);
  },

  initialize: function () {
    this.layout = new View();
  },

  start: function(options) {
    this.layout.render();

    this.module('header', {
      moduleClass: require('../modules/header/module'),
      region: this.layout.header
    });
  }
});