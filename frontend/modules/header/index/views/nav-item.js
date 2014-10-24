var Marionette = require('marionette'),
  template = require('../templates/nav-item.html');

module.exports = Marionette.ItemView.extend({
  template: template,
  tagName: "li"
});