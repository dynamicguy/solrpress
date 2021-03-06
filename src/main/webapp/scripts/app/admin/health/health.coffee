'use strict'
angular.module('solrpressApp').config ($stateProvider) ->
  $stateProvider.state 'health',
    parent: 'admin'
    url: '/health'
    data:
      roles: [ 'ROLE_ADMIN' ]
      pageTitle: 'health.title'
    views: 'content@':
      templateUrl: 'scripts/app/admin/health/health.html'
      controller: 'HealthController'
    resolve: translatePartialLoader: [
      '$translate'
      '$translatePartialLoader'
      ($translate, $translatePartialLoader) ->
        $translatePartialLoader.addPart 'health'
        $translate.refresh()
    ]
  return
