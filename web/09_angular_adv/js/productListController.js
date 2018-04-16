/* global demoApp */

demoApp.controller('productListController', function ($scope, $http) {

    // main code for this controller
    console.log("productListController");

    // the code to list all persons.
    $scope.listMsg = "";
    $http.get("webAPIs/getOtherListAPI.jsp").then(
            function (response) { // this function will run if http.get success
                console.log("GetProducts ajax success");
                console.log(response);
                console.log("");
                $scope.products = response.data.recordList;
                $scope.listMsg = response.data.dbError;
                if ($scope.listMsg.length > 0) {
                    $scope.listMsg = "List Error: " + $scope.listMsg;
                } else {
                    // add a new field that stores age as a number, to be able to sort numerically
                    for (var i=0; i< $scope.products.length; i++) {
                        $scope.products[i].RATING = parseInt($scope.products[i].RATING); 
                        $scope.products[i].PRODUCT_ID = parseInt($scope.products[i].PRODUCT_ID);
                    }
                    $scope.sortField = 'PRODUCT_ID';
                }
            },
            function (response) { // this function will run if http.get error
                console.log("Get Products ajax error");
                console.log(response);
                console.log("");
                $scope.listMsg = "List Error: " + response.status + " " + response.statusText;
            } // end of error fn
    ); // closes off "then" function call

}); // end of def'n of the controller function  // end o
