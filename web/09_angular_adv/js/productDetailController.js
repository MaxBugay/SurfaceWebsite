/* global demoApp */

demoApp.controller('productDetailController', function ($scope, $http, $routeParams) {
    console.log("productDetailController");
    console.log($routeParams);
    $scope.PRODUCT_ID = $routeParams.PRODUCT_ID;
    var url = "webAPIs/getOtherListAPI.jsp?id=" + $routeParams.PRODUCT_ID;

    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Person Detail ajax success");
                console.log(response);
                console.log("");
                $scope.product = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Person Detail ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

});