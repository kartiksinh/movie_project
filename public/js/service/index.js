'use strict';

var app = require('angular').module('movieApp');

app.service('ImprintService', require('./imprint'));
app.service('HomeService', require('./homeService'));
app.service('adminService', require('./adminService'));
