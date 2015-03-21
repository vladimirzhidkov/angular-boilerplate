
angular.module('app.view1', [])
    .config(['$stateProvider',  function( $stateProvider) {

        $stateProvider.state('app.view1', {
            url:'/view1',
            templateUrl: 'view1/view1.tpl.html',
            controller: 'View1Ctrl as ctrl'
        });
    }])
    .controller('View1Ctrl', [function() {
        //this.msg = 'hello';
    }]);