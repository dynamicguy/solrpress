// Generated by CoffeeScript 1.9.0
'use strict';
angular.module('solrpressApp').config(function($stateProvider) {
  $stateProvider.state('docs', {
    parent: 'admin',
    url: '/docs',
    data: {
      roles: ['ROLE_ADMIN']
    },
    views: {
      'content@': {
        templateUrl: 'scripts/app/admin/docs/docs.html'
      }
    }
  });
});