# Generated by CoffeeScript 1.9.0
'use strict'
angular.module('solrpressApp').factory 'LogsService', ($resource) ->
  $resource 'api/logs', {},
    findAll:
      method: 'GET'
      isArray: true
    changeLevel: method: 'PUT'
