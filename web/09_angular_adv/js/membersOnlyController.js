/* global demoApp */

demoApp.controller('membersOnlyController', function ($scope, $http) {
    console.log("membersOnlyController");
    var url = "webAPIs/isLoggedOnAPI.jsp";
    $scope.welcomeMsg = "";
    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("User is logged in");
                console.log(response);
                console.log("");
                $scope.person = response.data;
                $scope.errorMsg = "";
                if ($scope.person != null) {
                    $scope.welcomeMsg = "Welcome Member, " + $scope.person.CUSTOMER_NICKNAME + ".";
                } else {
                    $scope.welcomeMsg = "Please log in to view this page. "
                }
            },
            function (response) { // this function will run if http.get error
                console.log("http error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;
            } // end of error fn
    ); // closes off "then" function call
});