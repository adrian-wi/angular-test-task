var App = angular.module('App', []);

App.controller('TodoCtrl', function($scope, $http) {

    $scope.$watch('searchText', function(){
        $http.get('data.json')
            .then(function(res){
                $scope.wyniki = res.data;
                iloscpostow = $scope.wyniki.posts.length;
                $scope.posty = $scope.wyniki.posts;

                if(getParameterByName('id') && getParameterByName('userid')) {
                    $scope.tytul = $scope.wyniki.posts[getParameterByName('id')-1].title;
                    $scope.tekst = $scope.wyniki.posts[getParameterByName('id')-1].body;
                    $scope.useridname = $scope.wyniki.users[getParameterByName('userid')-1].name;
                }


                $scope.dobreid = [];

                if($scope.searchText) {
                    for (i = 0; i < iloscpostow; i++) {

                        if (($scope.wyniki.users[i].name).toLowerCase() == ($scope.searchText).toLowerCase()) {
                            $scope.dobreid = $scope.wyniki.users[i].id;
                        }
                    }
                }

            });

        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }



    })


});

