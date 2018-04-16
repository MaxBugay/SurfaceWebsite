/* global demoApp */

demoApp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: 'html_partials/product_list.html',
                controller: 'productListController'
            }).when('/list', {
                templateUrl: 'html_partials/product_list.html',
                controller: 'productListController'
            }).when('/insert', {
                templateUrl: 'html_partials/product_insert.html',
                controller: 'productInsertController'
            }).when('/list/:productID', {
                templateUrl: 'html_partials/product_detail.html',
                controller: 'productDetailController'
            }).when('/logon', {
                templateUrl: 'html_partials/logon.html',
                controller: 'logonController'
            }).when('/logoff', {
                templateUrl: 'html_partials/logoff.html',
                controller: 'logoffController'
            }).when('/members', {
                templateUrl: 'html_partials/members_only.html',
                controller: 'membersOnlyController'
            }).otherwise({
                redirectTo: '/'
            });
});

