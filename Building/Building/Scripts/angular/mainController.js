buildApp.controller("mainController", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.services = {
        Work: {
            blockHead: 'ремонт офисов',
            blockDescription: 'Обслуживание торговых центров, оформление фасадов',
            imageUrl: '/Content/images/work.png'
        },
        Home: {
            blockHead: 'ремонт квартир',
            blockDescription: 'Обслуживание торговых центров, оформление фасадовКосметический и капитальные ремонт квартир , от дизайн проекта до сборки мебели',
            imageUrl: '/Content/images/home.png'
        },
        Build: {
            blockHead: 'строительство',
            blockDescription: 'Строительство домов из кирпича, пеноблока под ключ. Проведение внутренних и наружных оттделочных работ',
            imageUrl: '/Content/images/build.png'
        },
        Tubing: {
            blockHead: 'отопление, канализация, водопровод',
            blockDescription: 'Грамотный расчет, своевременная поставка материала и оборудования, качественный и профессиональный монтаж',
            imageUrl: '/Content/images/Трубы.png'
        },
        Electricity: {
            blockHead: 'электромонтажные работы',
            blockDescription: 'Обслуживание торговых центров, оформление фасадов. Разработка проекта электроснабжения, монтаж и замена электропроводки, монтаж и сборка электрощитов, монтаж приборов, выдача техотчетов',
            imageUrl: '/Content/images/electricity.png'
        },
        Window: {
            blockHead: 'остекление',
            blockDescription: 'Пластиковые окна, балконное остекление любой сложности',
            imageUrl: '/Content/images/window.png'
        },
        Cleaning: {
            blockHead: 'уборка',
            blockDescription: 'Уборка помещений, квартир, офисов, генеральная уборка, в том числе после ремонта, мойка окон',
            imageUrl: '/Content/images/cleaning.png'
        },
    }
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
                data: { 'request': request }
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