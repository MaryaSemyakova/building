var buildApp = angular.module("buildApp", []).directive("serviceBlock", function () {
   
    return {
        scope: {
            blockhead: '@',
            blockdescription: '@',
            imageurl: '@',
        },
        restrict: "E",
        templateUrl: "/Scripts/angular/templates/serviceBlockTemplate.html",
        
    }
});