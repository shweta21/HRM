'use strict';

angular.module('manageApp')
	.controller('TabsCtrl', ['$rootScope', '$scope', '$http', '$location', 'myFactory',
		function($rootScope, $scope, $http, $location, myFactory, $window) {
			if (typeof $rootScope.employee == "undefined") {
				return $location.path('/');
			}

			$scope.tabs = [{
				title: 'HR',
				template: 'app/tabs/hr.html',
				active: $rootScope.activeTab == 'HR' ? true : false
			}, {
				title: 'Documentation',
				template: 'app/tabs/documentation.html',
				active: $rootScope.activeTab == 'Documentation' ? true : false
			}, {
				title: 'R&BD',
				template: 'app/tabs/rnbd.html',
				active: $rootScope.activeTab == 'Rnbd' ? true : false
			}, {
				title: 'Network',
				template: 'app/tabs/network.html',
				active: $rootScope.activeTab == 'Network' ? true : false
			}];
			//get HR factory call
			$scope.hr = new myFactory($rootScope.employee._id);
			//get Documentation call
			$http.get('/api/documentation/' + $rootScope.employee._id).success(function(response) {
				$scope.documentation = response;
			});
			//get Network call
			$http.get('/api/network/' + $rootScope.employee._id).success(function(response) {
				$scope.network = response;
			});
			//get Rnbd call
			$http.get('/api/rnbd/' + $rootScope.employee._id).success(function(response) {
				$scope.rnbd = response;
			});

			var index = $rootScope.employee._id;
			$scope.saveh = function() {
				if ($scope.hr.responsiblePerson == "" || typeof $scope.hr.responsiblePerson == "undefined") {
					$scope.Error = "First make a valid selection";
					//hide response message
					setTimeout(function() {
						$scope.Error = '';
						$scope.$apply();
					}, 3000);
					return false;
				}
				var hr = {
					employeeId: $rootScope.employee._id,
					responsiblePerson: this.hr.responsiblePerson,
					addBook: this.hr.addBook,
					empInfoSheet: this.hr.empInfoSheet,
					biometricSystem: this.hr.biometricSystem,
					MSSTeamUpdated: this.hr.MSSTeamUpdated
				};
				$http.put('/api/hr/' + index, hr).success(function(response) {
					$scope.Success = "HR Info Updated Successfully!";
					//hide response message
					setTimeout(function() {
						$scope.Success = '';
						$scope.$apply();
					}, 3000);
				});
			};

			$scope.saved = function() {
				if ($scope.documentation.responsiblePerson == "" || typeof $scope.documentation.responsiblePerson == "undefined") {
					$scope.Error = "First make a valid selection";
					//hide response message
					setTimeout(function() {
						$scope.Error = '';
						$scope.$apply();
					}, 3000);
					return false;
				}
				var documentation = {
					employeeId: $rootScope.employee._id,
					responsiblePerson: this.documentation.responsiblePerson,
					offerLetter: this.documentation.offerLetter,
					idProof: this.documentation.idProof,
					addressProof: this.documentation.addressProof,
					DOBCer: this.documentation.DOBCer,
					trainingCer: this.documentation.trainingCer,
					salarySlip: this.documentation.salarySlip,
					photograph: this.documentation.photograph,
					qualifiCer: this.documentation.qualifiCer,
					expLetter: this.documentation.expLetter,
					medical: this.documentation.medical,
					bankAccNo: this.documentation.bankAccNo,
					joiningReport: this.documentation.joiningReport,
					codeOfConduct: this.documentation.codeOfConduct,
					empAgreement: this.documentation.empAgreement,
					acknowledgeApp: this.documentation.acknowledgeApp
				};
				$http.put('/api/documentation/' + index, documentation).success(function(response) {
					$scope.Success = "Documentation Info Updated Successfully!";
					//hide response message
					setTimeout(function() {
						$scope.Success = '';
						$scope.$apply();
					}, 3000);
				});
			};

			$scope.saver = function() {
				if ($scope.rnbd.responsiblePerson == "" || typeof $scope.rnbd.responsiblePerson == "undefined") {
					$scope.Error = "First make a valid selection";
					//hide response message
					setTimeout(function() {
						$scope.Error = '';
						$scope.$apply();
					}, 3000);
					return false;
				}
				var rnbd = {
					employeeId: $rootScope.employee._id,
					responsiblePerson: this.rnbd.responsiblePerson,
					biddleAccount: this.rnbd.biddleAccount,
					coverLetter: this.rnbd.coverLetter,
					googleDriveAccess: this.rnbd.googleDriveAccess
				};
				$http.put('/api/rnbd/' + index, rnbd).success(function(response) {
					$scope.Success = "R&BD Info Updated Successfully!";
					//hide response message
					setTimeout(function() {
						$scope.Success = '';
						$scope.$apply();
					}, 3000);
				});
			};

			$scope.saven = function() {
				if ($scope.network.responsiblePerson == "" || typeof $scope.network.responsiblePerson == "undefined") {
					$scope.Error = "First make a valid selection";
					//hide response message
					setTimeout(function() {
						$scope.Error = '';
						$scope.$apply();
					}, 3000);
					return false;
				}
				var network = {
					employeeId: $rootScope.employee._id,
					responsiblePerson: this.network.responsiblePerson,
					firewallIp: this.network.firewallIp,
					gmailId: this.network.gmailId,
					skypeId: this.network.skypeId,
					redmine: this.network.redmine,
					bitBucket: this.network.bitBucket,
					git: this.network.git,
					dropbox: this.network.dropbox,
					localDBUser: this.network.localDBUser,
					localFTP: this.network.localFTP
				};
				$http.put('/api/network/' + index, network).success(function(response) {
					$scope.Success = "Network Info Updated Successfully!";
					//hide response message
					setTimeout(function() {
						$scope.Success = '';
						$scope.$apply();
					}, 3000);
				});
			};

			$scope.close = function() {
				$scope.message = '';
			};

			$scope.back = function() {
				$location.path('/');
			};
		}
	]);