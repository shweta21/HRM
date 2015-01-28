'use stict';

angular.module('manageApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$http', '$location', 'myFactory',
    function($rootScope, $scope, $http, $location, myFactory) {
      $scope.options = [{
        label: 'Shweta',
        value: 1
      }, {
        label: 'Megha',
        value: 2
      }, {
        label: 'Manisha',
        value: 3
      }, {
        label: 'Daman',
        value: 4
      }, {
        label: 'Komal',
        value: 5
      }];

      //to remove scope when goto back link
      $scope.employee = "";
      $rootScope.employee = "";
      //INITIATE BUTTON CODE
      $scope.add = function(e) {
        $scope.employee = e;

        if ($scope.employee == "") {
          $scope.message = "First make a valid selection";
          //hide response message
          setTimeout(function() {
            $scope.message = '';
            $scope.$apply();
          }, 3000);
        } else if ($scope.employee != "") {
          if ($scope.employee) {
            var employee = {
              name: $scope.employee.label,
              id: $scope.employee.value
            };
            if (employee === '') {
              return;
            };
            $http.post('/api/employee', employee).success(function(response) {
              $scope.employee = response;
              $rootScope.employee = response;
              $location.path('tabs');
            });
          }
        }
      };

      $scope.view = function(data) {
        $rootScope.employee = '';
        $rootScope.activeTab = '';
        $http.get('/api/employee/' + data._id, employee).success(function(res) {
          $rootScope.employee = res;
          $location.path('tabs');
        });
      };

      $scope.active = function(data, activeTab) {
        $rootScope.employee = '';
        $rootScope.activeTab = '';
        $http.get('/api/employee/' + data._id, employee).success(function(res) {
          $rootScope.employee = res;
          $rootScope.activeTab = activeTab;
          $location.path('tabs');
        });
      }

      $http.get('/api/employee/getalldata').success(function(response) {
        $scope.employeeAll = response;
      });

      $scope.relieve = function(e) {
        $scope.employee = e;
        if ($scope.employee == "") {
          $scope.message = "First make a valid selection";
          //hide response message
          setTimeout(function() {
            $scope.message = '';
            $scope.$apply();
          }, 3000);
        } else if ($scope.employee != "") {
          if ($scope.employee) {
            var employee = {
              name: $scope.employee.label,
              id: $scope.employee.value
            };
            $rootScope.employee = employee;
            $location.path('relieve');
          }
        }
      };
    }
  ]);