'use strict';

angular.module('solrpressApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('keyword', {
                parent: 'entity',
                url: '/keyword',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'solrpressApp.keyword.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/keyword/keywords.html',
                        controller: 'KeywordController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('keyword');
                        return $translate.refresh();
                    }]
                }
            })
            .state('keywordDetail', {
                parent: 'entity',
                url: '/keyword/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'solrpressApp.keyword.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/keyword/keyword-detail.html',
                        controller: 'KeywordDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('keyword');
                        return $translate.refresh();
                    }]
                }
            });
    });
