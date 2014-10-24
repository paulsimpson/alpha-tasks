var Marionette = require('marionette'),
  View = require('./views/header');

module.exports = Marionette.Application.extend({
  initialize: function() {
    this.region = this.options.region;
    this.collection = this.options.collection;
    this.channel = this.options.channel;

    var view = new View({
      collection: this.collection
    });

    this.region.show(view);
  }
});