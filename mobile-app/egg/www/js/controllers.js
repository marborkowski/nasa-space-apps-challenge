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

.controller('SplashscreenCtrl', function($scope, $stateParams, $state, $timeout, $ionicHistory, storage) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $timeout(function () {
        var survey = storage.get('survey');
        if (!survey) {
          $state.go('tab.form');
        } else {
          $state.go('tab.main');
        }
    }, 4000);
})

.controller('FormCtrl', function($scope, $stateParams, $state, $timeout, storage, $ionicHistory) {
    $scope.options = {
      loop: false,
      /*effect: 'fade',*/
      speed: 500,
      paginationClickable: true,
      noSwipingClass: 'swiper-no-swiping'
    };

    $scope.data = {};
    $scope.$watch('data.slider', function(nv, ov) {
        $scope.slider = $scope.data.slider;
    });

    $scope.actions = {
        finish: function () {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            storage.set('survey', $scope.questions);
            $state.go('tab.main');
        }
    };

    $scope.questions = {
        0: {
          selected: null
        },
        1: {
          selected: 20
        },
        2: {
          selected: 70
        }
    };
})

.controller('MainCtrl', function($scope) {

    $scope.options = {
      loop: false,
      speed: 500,
      paginationClickable: true,
      noSwipingClass: 'swiper-no-swiping'
    };

    $scope.currentDate = new Date().toJSON().slice(0,10).toString().replace(/-/igm,'.');
    $scope.data = {};
    $scope.$watch('data.slider', function(nv, ov) {
        $scope.slider = $scope.data.slider;
    });

    $scope.slides = {
        'main': 0,
        'charts': 1,
        'charts-contamination': 2,
        'charts-contamination-details': 3,
        'charts-contamination-details-modify': 4
    };

    $scope.actions = {
        goTo: function (slide) {
            $scope.slider.slideTo($scope.slides[slide]);
        }
    };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
