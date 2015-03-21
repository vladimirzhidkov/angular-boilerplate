require('angular');
require('ui-router');
require('./view1/view1.js');
require('./view2/view2.js');

angular.module('app', ['ui.router', 'app.view1', 'app.view2'] )
    .config(['$urlRouterProvider', '$stateProvider',  function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/app/view1');
        $stateProvider.state('app', {
            url:'/app',
            abstract: true,
            template: '<div ui-view></div>'
        });
    }]);
