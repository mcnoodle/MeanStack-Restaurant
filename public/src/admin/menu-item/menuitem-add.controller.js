(function () {
"use strict";

angular.module('admin')
.controller('MenuItemAddController', MenuItemAddController);

MenuItemAddController.$inject = ['MenuService', 'ApiPath', 'Upload','$http'];
function MenuItemAddController(MenuService, ApiPath, Upload,$http) 
{
  var $ctrl = this;
   $ctrl.save = function () { 
    $ctrl.ImageUpload($ctrl.menuItem,$ctrl.file);
    console.log("Save");
    $ctrl.onSave($ctrl.menuItem);
  };
 
  $ctrl.ImageUpload = function(dataJson,image) {
    
    if(image){
      return Upload.upload ({
        url: '/upload',
        file:image,
        data:{
          short_name:dataJson.name
        }
      }).then(function (resp) { 
        console.log(resp.data.fileName);
        if(resp.data.fileName){ //validate success
          dataJson.url=resp.data.fileName
            return $http.post('/menuCategory/addmenuitem', dataJson)
        }
      })
    }
    $ctrl.onSave = function (menuItem) {
    console.log("onSave");
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
