angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SplashscreenCtrl', function($scope, $stateParams, $state, $timeout, $ionicHistory) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $timeout(function () {
        $state.go('tab.form');
    }, 4000);
})

.controller('FormCtrl', function($scope, $stateParams, $state) {
    $scope.options = {
      loop: false,
      /*effect: 'fade',*/
      speed: 500,
      paginationClickable: true
    };

    $scope.data = {};
    $scope.$watch('data.slider', function(nv, ov) {
      $scope.slider = $scope.data.slider;
    });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
