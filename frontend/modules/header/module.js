var Radio = require('backbone.radio');
var Marionette = require('marionette');
var Backbone = require('backbone');
var Index = require('./index/controller');


module.exports = Marionette.Module.extend({
  initialize: function () {
    this.region = this.options.region;
    this.collection = new Backbone.Collection();
    this.channel = Radio.channel('header');
    this.start();
  },

  onStart: function () {

    this.show();

    return this.channel.comply({
      add: this.onAdd,
      activate: this.onActivate
    }, this);
  },

  show: function() {
    return new Index({
      region: this.region,
      collection: this.collection
    });
  },

  onAdd: function (model) {
    this.collection.add(model);
  },

  onActivate: function (model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      model.set('active', true);
    }
  }
});