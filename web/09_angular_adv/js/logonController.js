/* global demoApp */

demoApp.controller('logonController', function ($scope, $http) {
    console.log("logonController");
    $scope.person = "";
    $scope.loginResult = "Enter your email and password";
    $scope.loggedIn = false;
    $scope.login = function () {
        console.log("logging in with following credentials: " +
                $scope.person.CUSTOMER_EMAIL + ' ' + $scope.person.CUSTOMER_PASSWORD);
        loggedOn = true;
        var url = "webAPIs/logonAPI.jsp?&email=" + $scope.person.CUSTOMER_EMAIL + "&pw=" +
                $scope.person.CUSTOMER_PASSWORD;
        $http.get(url).then(
                function (response) {
                    console.log("successful login");
                    console.log(response);
                    if (response.data.errorMsg === "") {
                        $scope.loginResult = "Login successful. Welcome " +
                                response.data.CUSTOMER_NICKNAME;
                        $scope.loggedIn = true;
                    } else {
                        $scope.loginResult = "Unsuccessful login.  Incorrect email/password.";
                    }
                },
                function (response) {
                    console.log("login failed");
                }
        );
    };
});