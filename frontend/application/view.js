var Marionette = require('marionette'),
  template = require('./template.html');

module.exports = Marionette.LayoutView.extend({
  el: '#application',
  template: template,

  regions: {
    header: '#header-region',
    flashes: '#flashes-region',
    content: '#content-region',
    dialog: '#dialog-region'
  }
});