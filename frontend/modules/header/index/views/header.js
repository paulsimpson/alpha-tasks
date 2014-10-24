var Marionette = require('marionette'),
  template = require('../templates/header.html'),
  navItemView = require('./nav-item');

module.exports = Marionette.CompositeView.extend({
  tagName: 'header',
  template: template,
  className: 'row-fluid',
  childView: navItemView,
  childViewContainer: "nav ul"
});