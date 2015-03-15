
angular.module('app.view2', [])
    .config(['$stateProvider',  function($stateProvider) {

        $stateProvider.state('app.view2', {
            url:'/view2',
            templateUrl: 'view2/view2.tpl.html',
            controller: 'View2Ctrl as ctrl'
        });
    }])
    .controller('View2Ctrl', [function() {

    }]);