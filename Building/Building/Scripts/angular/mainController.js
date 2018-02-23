buildApp.controller("mainController", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.sendRequestPrice = function (form, request) {
        $scope.sendRequestCommon(form, request, '/Home/SendRequestPrice', "#requestPrice");
    }

    $scope.sendRequest = function (form, request) {
        $scope.sendRequestCommon(form, request, '/Home/SendRequest', "#request");
    }

    $scope.sendRequestCommon = function (form, request, url, formId) {
        if (form.$valid) {
            $http({
                url: url,
                method: "POST",
                data: { 'request': request}
            }).
                then(function (response) {
                    $scope.status = response.status;
                    $scope.data = response.data;
                }, function (response) {
                    $scope.data = response.data || 'Ошибка отправки заявки';
                    $scope.status = response.status;
                });
            $timeout(function () {
                request.email = undefined;
                request.name = undefined;
                request.phone = undefined;
                request.message = undefined;
                form.$submitted = false;
                $scope.data = undefined;
                $scope.status = undefined;
                $(formId).modal('toggle');
                $scope.$apply();
            }, 1000);
        }
    }
}]);