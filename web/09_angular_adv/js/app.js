/* global angular */

// If you will use Angular routing, you have to specify 'ngRoute' in the array
// (dependency injection).
var demoApp = angular.module('demoApp', ['ngRoute']);

// I am creating a "service" (which is just really my class full of methods). In this service,
// I will put anything that needs to be used by more than one controller - to avoid copy/paste.
demoApp.factory("MService", function () {

    var emptyProduct = function () {
        return {
            PRODUCT_ID: "",
            PRODUCT_NAME: "",
            IMAGE_URL: "",
            PRODUCT_URL: "",
            PRICE: "",
            RATING: ""
        };
    };

    // expose methods (make them accessible)
    return {
        emptyProduct: emptyProduct
    };

});