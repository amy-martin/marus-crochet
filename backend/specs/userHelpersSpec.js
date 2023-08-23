const {assert} = require('chai');
const request = require('supertest');
var server = request.agent('http://localHost:3000');
const {jsdom} = require('jsdom');