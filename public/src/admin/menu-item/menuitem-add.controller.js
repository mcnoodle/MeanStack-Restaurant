(function () {
"use strict";

angular.module('admin')
.controller('MenuItemAddController', MenuItemAddController);

MenuItemAddController.$inject = ['MenuService', 'ApiPath', 'Upload','$http'];
function MenuItemAddController(MenuService, ApiPath, Upload,$http) {
  var $ctrl = this;
   $ctrl.save = function () { 
    $ctrl.ImageUpload($ctrl.menuItem,$ctrl.file);

  };
 
  $ctrl.ImageUpload = function(dataJson,image) {
    
    if(image){
      return Upload.upload ({
        url: '/addMenuItem',
        file:image,
        data:{
          name:dataJson.name
        }
      }).then(function (resp) { 
        console.log(resp.data.fileName);
        if(resp.data.fileName){ //validate success
          dataJson.image=resp.data.fileName
            return $http.post('/menuCategory/addmenuitem', dataJson)
        }
      })
    }
    $ctrl.onSave = function (menuItem) {
    $state.go('admin.auth.category',
              {categoryId: menuItem.category_short_name},
              {reload: true}); // tells resolves to refresh
  };

  $ctrl.onCancel = function () {
    $state.go('admin.auth.category',
              {categoryId: menuItem.category_short_name});
  };

  $ctrl.onError = function (response) {
    $log.error(response); // for debugging
  }; 
    
  };
}


})();
