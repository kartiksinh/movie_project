'use strict';

var app = require('angular').module('movieApp');

app.service('ImprintService', require('./imprint'));
app.service('TodoService', require('./todos'));
app.service('adminService', require('./adminService'));
