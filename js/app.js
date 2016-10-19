angular.module('uploadApp', ['ngFileUpload'])
.controller('uploadController', function($scope,Upload){
	// for multiple files:
	var j = 0;
	$scope.uploadFileDetail = [];
	$scope.totalFile = 0;

    $scope.uploadFiles = function(files){
    	if(files && files.length){
	      for (var i = 0; i < files.length; i++) {
	        Upload.upload({
	          url: 'http://localhost:8084/upload',
	          method: 'POST',
	          data: {file: files[i], documentId: "testUpload"}
	        }).then(function (resp) {
	        $scope.uploadFileDetail[j] = resp.config.data.file.name;
	        $scope.totalFile = $scope.uploadFileDetail.length;
	        j++;

	          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	        }, function (resp) {
	          console.log('Error status: ' + resp.status);
	        }, function (evt) {
	          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	          $scope.percent = progressPercentage;
	          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });
	      };
	    }
    }
    
})