var Backbone = require('backbone');
Backbone.$ = global.$ = require('jquery');

var Application = require('./application/application');

var app = new Application();

global.Tasks = app;