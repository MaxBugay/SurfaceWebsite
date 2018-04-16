
/* global demoApp */

demoApp.controller('productInsertController', function ($scope, $http, MService) {
    console.log("productInsertController");
    
    $scope.newproduct = MService.emptyProduct();
    $scope.myErrors = MService.emptyProduct();

    //Create a new person 
    $scope.insertSave = function () {
        console.log("creating product");
        console.log($scope.newproduct);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = MService.emptyProduct();
        $scope.myErrors.errorMsg=""; // blank out any old error message
        $scope.status=""; // blank out any old error message

        var myData = escape(JSON.stringify($scope.newproduct));
        var productName = $scope.newproduct.PRODUCT_NAME;
        console.log("new product description is " + productName);
        var url = "webAPIs/insertProductAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Product Insert/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Product "+ productName +" successfully saved.";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Product Insert/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller