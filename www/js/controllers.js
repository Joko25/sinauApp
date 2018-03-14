angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $window, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.logout = function() {
    $window.localStorage.setItem("log", "false");
    $state.go("login");
    $window.location.reload(true);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DashCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate) {
  $scope.navSlide = function(index) {
    console.log("dash");
    $ionicSlideBoxDelegate.slide(index, 500);
  };

  $scope.tasks = [{id:1,'poster':'src/pic1.jpg', 'vidUrl': 'src/trailer_480p.mov'}, 
  {id:2,'poster':'src/pic2.jpg', 'vidUrl': 'src/coffee.MOV'}, 
  {id:3,'poster':'src/pic3.jpg', 'vidUrl': 'src/vid2.3gp'}];
    
  $scope.removeTask = function(taskId){
    alert("Task Id is "+taskId);
  };

  $scope.playVideo = function(taskId){
    console.log(taskId);
    var myVideo = document.getElementById(taskId); 
    if (myVideo.paused) {
      myVideo.play();
    }
    else{
      myVideo.pause();
    } 
  };

})

.controller('RegCtrl', function($scope, $ionicHistory, $window, $ionicPopup, $state) {
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

  $scope.data = {};

  $scope.regist = function(){
    var email = $scope.data.email;
    var user = $scope.data.name;
    var pass = $scope.data.password;
    if (email == '' || user =='' || pass == '') {
      var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: "Harap terisi semua"
      });
    }else{
      $window.localStorage.setItem("email", email);
      $window.localStorage.setItem("username", user);
      $window.localStorage.setItem("password", pass);

      var alertPopup = $ionicPopup.alert({
          title: 'Register Success!',
          template: "login dengan username : "+user
      });

      $state.go("login");
    }
  }
})

.controller('LoginCtrl', function($scope, $state, $http, $ionicPopup, $ionicLoading, $window, $ionicLoading) {
  $scope.data = {};
  $scope.face = 'img/ionic.png';

  var log = $window.localStorage.getItem("log");

  if(log == "true"){
    $state.go("app.dash");
  }
 
  $scope.login = function() {

    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>'
      //duration: 1000
    }).then(function(){
       //console.log("The loading indicator is now displayed");
    });

    var userLog = $window.localStorage.getItem("username");
    var passLog = $window.localStorage.getItem("password");
    console.log("LOGIN user: " + userLog + " - PW: " + passLog);
    if ($scope.data.username == userLog && $scope.data.password == passLog && $scope.data.username !=='' && $scope.data.password !=='') {
      $ionicLoading.hide();
      $state.go("app.dash");
      $window.localStorage.setItem("log", "true");
    }else{
      var alertPopup = $ionicPopup.alert({
          title: 'Login error!',
          template: "Username or password is wrong"
      });
      $ionicLoading.hide();
    }
    // $state.go("reg");
  }

  $scope.regist = function(){
    console.log("registrasi");
    $state.go("reg");
  };

  $scope.forget = function(){
    console.log("forget");
  };
});
