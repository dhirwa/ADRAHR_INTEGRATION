var myapp = angular.module('AdraApp', ['ngRoute','ngFileUpload']);

myapp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/index.html'
    })
    .when('/home', {
        templateUrl: 'views/home.html'
    })
    .when('/signin', {
        templateUrl: 'views/signin.html'
    })
    .when('/signup', {
        templateUrl: 'views/signup.html'
    })
    .when('/projects', {
        templateUrl: 'views/project.html'
    })
    .when('/projectterm', {
        templateUrl: 'views/projectterm.html'
    })
    .when('/payroll', {
        templateUrl: 'views/payroll.html'
    })

    .when('/profile', {
        templateUrl: 'views/profile.html'
    })
    .when('/profileterm', {
        templateUrl: 'views/profileterm.html'
    })
    .when('/letter', {
        templateUrl: 'views/letter.html'
    })
    .when('/pay',{
      templateUrl: 'views/fpayslip.html'
    })
    .when('/salary', {
        templateUrl: 'views/salarycertificate.html'
    })
    .when('/terminated', {
        templateUrl: 'views/terminated.html'
    })
    .when('/termination', {
        templateUrl: 'views/termination-certificate.html'
    })
    .when('/leaves', {
        templateUrl: 'views/view-leave.html'
    })
    .when('/finalpay', {
        templateUrl: 'views/finalpay.html'
    })
    .when('/balance', {
        templateUrl: 'views/balanceleave.html'
    })
    .otherwise({
        redirectTo: '/'
    })

}]);


myapp.controller('signupCtrl', ['$scope','$http','$location', function($scope,$http,$location){
    $scope.message=false;
    $scope.signnup = function(names,email,password){
        var config={
          headers:{
            'Content-Type':'application/json'
          }
        }
        var data_user='{"names":"'+names+'","email":"'+email+'","password":"'+password+'"}';

        $http.post('http://0.0.0.0:8000/adra/signup/',data_user, config)
              .success(function(data, status, header, config){
                 console.log(data);
                         if (data.auth == 1){
                             $location.path('/signin');
                         }
                         else{
                           $("#failure").show();
                         }
                     });
                   }
              }]);


myapp.controller('signinCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
              $scope.message = false;
              $scope.sign_in = function(username, password){
              var config = {
              	headers:{
              		'Content-Type':'application/json'
              			    }
                          }

              var data = '{"username":"'+username+'","password":"'+password+'"}';

              $http.post('http://0.0.0.0:8000/adra/login/', data, config)
               .success(function(data, status, header, config){
                   console.log(data);
                   if(data.auth == 1){
                        $location.path('/');
                        $rootScope.username = data.user.username;
                        console.log($rootScope.username);
                        }else{
                          $("#failure").show();
                        }
                    });
                  }

              }]);


myapp.directive('fileModel', ['$parse', function ($parse) {
                  return {
                      restrict: 'A',
                      link: function(scope, element, attrs) {
                          var model = $parse(attrs.fileModel);
                          var modelSetter = model.assign;

                          element.bind('change', function(){
                              scope.$apply(function(){
                                  modelSetter(scope, element[0].files[0]);
                              });
                          });
                      }
                  };
              }]);


myapp.service('fileUpload', ['$http', function ($http) {
                  this.uploadFileToUrl = function(file, uploadUrl){
                      var fd = new FormData();
                      fd.append('file', file);
                      $http.post(uploadUrl, fd, {
                          transformRequest: angular.identity,
                          headers: {'Content-Type': undefined}
                      })
                      .success(function(){
                      })
                      .error(function(){
                      });
                  }
              }]);



myapp.directive('fileModel', ['$parse', function($parse) {
                            return {
                              restrict: 'A',
                              link: function(scope, element, attrs) {
                                var model = $parse(attrs.fileModel);
                                var modelSetter = model.assign;

                                element.bind('change', function() {
                                  scope.$apply(function() {
                                    modelSetter(scope, element[0].files[0]);
                                  });
                                });
                              }
                            };
                          }]);


myapp.controller('employeesCtrl', ['$scope', '$http','$location','$rootScope','Upload','$timeout', function($scope,$http,$location,$rootScope,Upload,$timeout){
                                  var user = $rootScope.username;
                                  $scope.userin = user;

                                  function allemployees(){
                                    var config = {
                                    headers:{
                                    'Content-Type':'application/json'
                                    }
                                    }
                                    var url = 'http://0.0.0.0:8000/adra/allemployees';
                                      $http.get(url)
                                      .success(function(data){
                                      console.log(data);
                                      $scope.allnames = data.Employees;
                                      });
                                    };

                                    allemployees();

                                  $("#next").click(function(){
                                    $(".registration-show1").hide();
                                   $(".registration-show2").show();
                                   var config = {
              			                    headers:{
              				                        'Content-Type':'application/json'
              			                           }
                                             }
                                  var url = 'http://0.0.0.0:8000/adra/getprojects';
                                  $http.get(url)
                                      .success(function(data, status, header, config){
                                          $scope.items = data;
                                          console.log(data);
                                          var options = "<option hidden></options>";
                                          $.each(data, function(key, value){
                                          options += "<option value='"+value.id+"'>"+value.name+"</option>"
                                          });
                                          $("#empproj").html(options);
                                    });
                                    $("#empproj").change(function(){
                                      var proj = $("#empproj").val();
                                      console.log(proj);
                                      getLocations(proj);
                                    });
                                 });

                                 function getLocations(proj){
                                   var url = 'http://0.0.0.0:8000/adra/projects/location/'+proj;
                                   $http.get(url)
                                   .success(function(data, status, header, config){
                                    var options = "<option hidden></options>";
                                    $.each(data, function(key, value){
                                    options += "<option>"+value.location+"</option>";
                                    });

                                    $("#locations").html(options);
                                });

                              };

                                $(".adddep").click(function(e){
                                e.preventDefault();
                                var nextUser2 = '<div class="row user2"><div class="col-sm-3 nopadding"><div class=form-group><input class=form-control id=depname placeholder=Name></div></div><div class="col-sm-3 nopadding"><div class=form-group><input class=form-control id=deprelation placeholder=relation></div></div><div class="col-sm-3 nopadding"><div class=form-group><input class=form-control id=depdob placeholder=birthdate></div></div><div class="col-sm-3 nopadding"><div class=form-group><div class=input-group><div class=input-group-btn><button class="btn btn-default btn-plus removedep"id=adddep type=button><i class="fa fa-minus"></i></button></div></div></div></div><div class=clear></div></div>';
                                $("#contacts").append(nextUser2);
                                removedDep();
                                 });

                                function removedDep(){
                                $(".removedep").click(function(e){
                                e.preventDefault();
                                $(this).parents().eq(4).remove();
                                  });
                                }
                                $(".add").click(function(e){
                                e.preventDefault();
                                var nextUser = '<div class="row user"><div class="col-sm-3 nopadding"><div class=form-group><input class=form-control id=name placeholder=Name></div></div><div class="col-sm-3 nopadding"><div class=form-group><input class=form-control id=relation placeholder=relation></div></div><div class="col-sm-3 nopadding"><div class=form-group><input class=form-control id=phone placeholder=phone></div></div><div class="col-sm-3 nopadding"><div class=form-group><div class=input-group><div class=input-group-btn><button class="btn btn-default btn-plus remove"id=add type=button><i class="fa fa-minus"></i></button></div></div></div></div><div class=clear></div></div>';
                                $("#dependencies").append(nextUser);
                                removedUser();
                                 });

                                function removedUser(){
                                  $(".remove").click(function(e){
                                  e.preventDefault();
                                  $(this).parents().eq(4).remove();
                                    });
                                  }


                                 $("#back").click(function(){
                                   $(".registration-show2").hide();
                                  $(".registration-show1").show();
                                });

                                $scope.uploadFile = function(){
                                  var file = $scope.myFile;
                                    console.log('file is ' );
                                    console.dir(file);
                                    var uploadUrl = "/fileUpload";
                                    fileUpload.uploadFileToUrl(file, uploadUrl);
                                  };


                                  $("#addEmp").click(function(){
                                  // alert('Hello');
                                  var first = $("#first-name").val();
                                  var last = $("#last-name").val();
                                  var id_number = $("#id_number").val();
                                  var phone = $("#phone").val();
                                  var phone2 = $("#phone2").val();
                                  var email = $("#email").val();
                                  var email2 = $("#email2").val();
                                  var birth = $("#birthdate").val();
                                  var gender = $("#gender").val();
                                  var education = $("#education").val();
                                  var address = $("#address").val();
                                  var proj = $("#empproj").val();
                                  var position = $("#empposition").val();
                                  var start = $("#startd").val();
                                  var salary = $("#salary").val();
                                  var loc = $("#locations").val();
                                  var emernames = $("#emernames").val();
                                  var emerrelation =$("#emerrelation").val();
                                  var emernumber = $("#emernumber").val();
                                  var depnames = $("#depnames").val();
                                  var deprealtion =$("#deprelation").val();
                                  var depdob = $("#depdob").val();
                                  var hobby = $("#hobby").val();

                                  // ================= dependants ===================================

                                    var data = [];
                                    var attribute = ['name', 'relation', 'dob']
                                    $(".user2").each(function(key, val){
                                    var object =  new Object();
                                    $($(this).children()).each(function(key, val){
                                    console.log($(this).find('input').val(), key);
                                    var index = attribute[key];
                                    if ($(this).find('input').val()){
                                        object[index] = $(this).find('input').val();
                                      }
                                    })
                                    data.push(object);
                                    });
                                    console.log(JSON.stringify(data));
                                    var dependants = JSON.stringify(data);


                                    //============================= contacts ===================================



                                      var data2 = [];
                                      var attribute2 = ['name', 'relation', 'phone']
                                      $(".user").each(function(key, val){
                                      var object2 =  new Object();
                                      $($(this).children()).each(function(key, val){
                                      console.log($(this).find('input').val(), key);
                                      var index2 = attribute2[key];
                                      if ($(this).find('input').val()){
                                          object2[index2] = $(this).find('input').val();
                                        }
                                      })
                                      data2.push(object2);
                                      });
                                      console.log(JSON.stringify(data2,null, 2));
                                      var contacts = JSON.stringify(data2);

                                      file = $scope.myFile;
                                      file_1 = $scope.myFile_1;
                                      file_2 = $scope.myFile_2;
                                      file_3 = $scope.myFile_3;
                                      console.log(file,file_1,file_2,file_3)
                                      addEmployee(first,last,id_number,phone,phone2,email,email2,birth,gender,education,address,proj,position,start,salary,loc,dependants,contacts,file,file_1,file_2,file_3,hobby);

                              });

                                function addEmployee(first,last,id_number,phone,phone2,email,email2,birth,gender,education,address,proj,position,start,salary,loc,dependants,contacts,file,file_1,file_2,file_3,hobby){
                                    var config={
                                      headers:{
                                        'Content-Type':'application/json'
                                      }
                                    }
                                    var data_user='{"first_name":"'+first+'","last_name":"'+last+'","id_number":"'+id_number+'","telephone":"'+phone+'","telephone2":"'+phone2+'","email":"'+email+'","email2":"'+email2+'","dob":"'+birth+'","gender":"'+gender+'","hobby":"'+hobby+'","education":"'+education+'","address":"'+address+'","project_id":"'+proj+'","position":"'+position+'","salary":"'+salary+'","start":"'+start+'","staff_location":"'+loc+'","contacts":'+contacts+',"dependants":'+dependants+'}';
                                    console.log(data_user);
                                    $http.post('http://0.0.0.0:8000/adra/addemployee/',data_user, config)
                                        .success(function(data, status, header, config){
                                           console.log(data);
                                           var empid = data;
                                           console.dir(file, file_1, file_2, file_3);
                                                   if (!file.$error) {
                                                     Upload.upload({
                                                         url: "http://127.0.0.1:8000/api/upload/test_adra/"+empid,
                                                         data: {
                                                           file:file,
                                                           file_1:file_1,
                                                           file_2:file_2,
                                                           file_3: file_3
                                                         }
                                                      })
                                                       .then(function(response) {
                                                         console.log(response);
                                                         $timeout(function() {});
                                                       }, function(response) {
                                                         console.log('Error status: ' + response.status);
                                                        }, function(evt) {
                                                                      var progressPercentage = parseInt(100.0 *
                                            evt.loaded / evt.total);
                                            $scope.progress = progressPercentage + '% ';
                                            });
                                            }
                                              $('#myModal1').modal('hide');
                                              allemployees();
                                        });
                                };

              	        $('#search').keyup(function()
                      	{
                          // alert("hello");
                      		searchTable($(this).val());
                      	});


                      function searchTable(inputVal)
                      {
                      	var table = $('#tblData');
                      	table.find('tr').each(function(index, row)
                      	{
                      		var allCells = $(row).find('td');
                      		if(allCells.length > 0)
                      		{
                      			var found = false;
                      			allCells.each(function(index, td)
                      			{
                      				var regExp = new RegExp(inputVal, 'i');
                      				if(regExp.test($(td).text()))
                      				{
                      					found = true;
                      					return false;
                      				}
                      			});
                      			if(found == true)$(row).show();else $(row).hide();
                      		}
                      	});
                      }


                      $(document).ready(function() {

                        $('#tblData tr').click(function() {
                          var href = $(this).find("a").attr("href");
                          if(href) {
                          window.location = href;
                          }
                          });

                        });


                         $scope.onprofile = function(empid){
                                  $rootScope.empid = empid
                            //alert("Hello"+empid);
                            $location.path('/profile');
                         }

                         $(function(){
                           $(".showpassword").each(function(index,input) {
                           var $input = $(input);
                           $('<label class="showpasswordlabel"/>').append(
                           $("<input type='checkbox' class='showpasswordcheckbox' />").click(function() {
                           var change = $(this).is(":checked") ? "text" : "password";
                           var rep = $("<input type='" + change + "' />")
                     .attr("id", $input.attr("id"))
                     .attr("name", $input.attr("name"))
                     .attr('class', $input.attr('class'))
                     .val($input.val())
                     .insertBefore($input);
                 $input.remove();
                 $input = rep;
              })
              ).append($("<span/>").text(" Show password")).insertAfter($input);

              });
              });
              }]);

myapp.controller('leaveCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
              var user = $rootScope.username;
              $scope.userin = user;
              var eid = $rootScope.empid;

              $scope.slide = function (dir) {
                  $('#carouselId').carousel(dir);
              };

              function getleaves(){
                var url = 'http://0.0.0.0:8000/adra/leaves/'+eid;
                $http.get(url)
                .success(function(data){
                console.log(data);

                $scope.names = data.Leaves[0].names;
                $scope.position = data.Leaves[0].position;
                $scope.project = data.Leaves[0].projectname;
                $scope.dob = data.Leaves[0].dob;
                $scope.nid= data.Leaves[0].id_number;
                $scope.telephone=data.Leaves[0].telephone;
                $scope.telephone2=data.Leaves[0].telephone2;
                $scope.email2=data.Leaves[0].email2;
                $scope.hobby=data.Leaves[0].hobby;
                $scope.education = data.Leaves[0].education;
                $scope.address = data.Leaves[0].address;
                $scope.contacts = data.Leaves[0].contacts;
                $scope.dependants = data.Leaves[0].dependants;
                $scope.leaves = data.Leaves[0].leaves;

                 });
              };
              getleaves();
               $("#leave_type").change(function(){
               var leav = $("#leave_type").val();
               console.log(leav)

               if(leav == 1){
                 var url = 'http://0.0.0.0:8000/adra/leaves/remaining/'+eid;
                 $http.get(url)
                 .success(function(data){
                 console.log(data);

                   if(data == null){
                     $scope.remains = 21;
                     $("#hidden_div").show();
                     $("#hidden_div2").hide();
                     $("#hidden_div3").hide();
                   }
                  else{
                     $scope.remains = data.remain[0].remaining;

                   if(data.remain[0].remaining > 0){
                     $("#hidden_div").show();
                     $("#hidden_div2").hide();
                     $("#hidden_div3").hide();
                   }
                   else{
                     $("#hidden_div3").show();
                     $("#hidden_div2").hide();
                     $("#hidden_div").hide();
                   }
                 };
               })
               }
               else if(leav == 6){
                 $("#hidden_div2").show();
                 $("#hidden_div").hide();
                 $("#hidden_div3").hide();
               }
               else{
                 $("#hidden_div2").hide();
                 $("#hidden_div").hide();
                 $("#hidden_div3").hide();
               }
           });

              $scope.message = false;
              $("#addleave").click(function(){
            var type = $("#leave_type").val();
            var reason = $("#reason").val();
            var startdate = $("#start_date").val();
            var enddate = $("#end_date").val();
            var leave_address = $("#addr_leave").val();

            add_Leave(type,reason,startdate,enddate,leave_address);
          });

          function add_Leave(type,reason,startdate,enddate,leave_address){

            var config = {
            	headers:{
            		'Content-Type':'application/json'
            			    }
                        }

            var data = '{"emp_id":"'+eid+'","vacation_id":"'+type+'","reason":"'+reason+'","start_date":"'+startdate+'","end_date":"'+enddate+'","address":"'+leave_address+'"}';
            console.log(data);
            $http.post('http://0.0.0.0:8000/adra/leave/', data, config)
             .success(function(data, status, header, config){
                 console.log(data);
                 $('#message').show();
                 $('#myModal3').modal('hide')
                  getleaves();
                  });
                };
           }]);


myapp.controller('projectCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){

                var user = $rootScope.username;
                $scope.userin = user;

                function allprojects(){
                    var url = 'http://0.0.0.0:8000/adra/getallprojects';
                    $http.get(url)
                    .success(function(data){
                    console.log(data);
                    $scope.allprojs = data.Projects;
                    });
                };

                allprojects();

                // function getdonors(){
                //     var url2 = 'http://0.0.0.0:8000/adra/getdonors';
                //     $http.get(url2)
                //         .success(function(datas, status, header, config){
                //             $scope.items = datas;
                //             console.log(datas);
                //             var options = "<option hidden></options>";
                //             $.each(datas, function(key, value){
                //             options += "<option value='"+value.id+"'>"+value.name+"</option>"
                //             });
                //             $("#donors").html(options);
                //       });
                //   };
                //
                //   getdonors();

                  $(".addloc").click(function(e){
                      e.preventDefault();
                      var nextUser3 = '<div class="row loc"><div class="nopadding col-sm-8"><div class=form-group><input class=form-control id=plocation placeholder=location></div></div><div class="nopadding col-sm-4"><div class=form-group><div class=input-group><div class=input-group-btn><button class="addloc btn btn-default btn-plus removeloc" id="addloca" type="button"><i class="fa fa-minus"></i></button></div></div></div></div></div>';
                      $("#locations").append(nextUser3);
                      removedLoc();
                       });

                      function removedLoc(){
                      $(".removeloc").click(function(e){
                      e.preventDefault();
                      $(this).parents().eq(4).remove();
                        });
                      }

                  $("#addproject").click(function(){
                      var title = $("#ptitle").val();
                      var donor = $("#donors").val();
                      var start = $("#start").val();
                      var end = $("#end").val();

                      var data = [];
                      var attribute = ['location']
                      $(".loc").each(function(key, val){
                      var object =  new Object();
                      $($(this).children()).each(function(key, val){
                      console.log($(this).find('input').val(), key);
                      var index = attribute[key];
                      if ($(this).find('input').val()){
                          object[index] = $(this).find('input').val();
                        }
                      })
                      data.push(object);
                      });
                      console.log(JSON.stringify(data,null, 2));
                      var locations = JSON.stringify(data);


                      addProject(title,donor,start,end,locations);
                    });

                    function addProject(title,donor,start,end,locations){
                        var config={
                          headers:{
                            'Content-Type':'application/json'
                          }
                        }
                        var data_project='{"name":"'+title+'","donor":"'+donor+'","start_date":"'+start+'","end_date":"'+end+'","locations":'+locations+'}';
                        console.log(data_project);
                        $http.post('http://0.0.0.0:8000/adra/addproject/',data_project, config)
                            .success(function(data, status, header, config){
                               console.log(data);
                                allprojects();


                      });
                    };

                    $('#search').keyup(function()
                    {
                      // alert("hello");
                      searchTable($(this).val());
                    });
//===============================================================

                  function searchTable(inputVal)
                  {
                    var table = $('#tblData');
                    table.find('tr').each(function(index, row)
                    {
                      var allCells = $(row).find('td');
                      if(allCells.length > 0)
                      {
                        var found = false;
                        allCells.each(function(index, td)
                        {
                          var regExp = new RegExp(inputVal, 'i');
                          if(regExp.test($(td).text()))
                          {
                            found = true;
                            return false;
                          }
                        });
                        if(found == true)$(row).show();else $(row).hide();
                      }
                    });
                  }

                  $("#plusdonor").click(function(){
                    $("#donordiv").show();
                  });

                  $("#savedonor").click(function(){
                    var name = $("#donorname").val();
                    addDonor(name);
                  });

                  function addDonor(name){
                      var config={
                        headers:{
                          'Content-Type':'application/json'
                        }
                      }
                      var data_donor='{"name":"'+name+'"}';
                      console.log(data_donor);
                      $http.post('http://0.0.0.0:8000/adra/project/donor/',data_donor, config)
                          .success(function(data, status, header, config){
                             console.log(data);
                             $('#donordiv').hide();
                            getdonors();

                             });
                  };

                  $scope.onend = function(pid){
                      console.log(pid);
                      $rootScope.pid = pid;
                  };

                  $("#btnYes").click(function(){
                    var pid = $rootScope.pid;
                    var config={
                      headers:{
                        'Content-Type':'application/json'
                      }
                    }
                    // console.log(data_user);
                    $http.post('http://0.0.0.0:8000/adra/project/end/'+pid)
                          .success(function(data, status, header, config){
                             console.log(data);
                             $location.path('/projectterm');

                                 });
                  });
}]);

myapp.controller('payrollCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var user = $rootScope.username;
                  $scope.userin = user;
                  var url = 'http://0.0.0.0:8000/adra/payrolls';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  $scope.allpays = data.Payroll;
                  });

                  $('#search').keyup(function()
                  {
                    // alert("hello");
                    searchTable($(this).val());
                  });


                function searchTable(inputVal)
                {
                  var table = $('#tblData');
                  table.find('tr').each(function(index, row)
                  {
                    var allCells = $(row).find('td');
                    if(allCells.length > 0)
                    {
                      var found = false;
                      allCells.each(function(index, td)
                      {
                        var regExp = new RegExp(inputVal, 'i');
                        if(regExp.test($(td).text()))
                        {
                          found = true;
                          return false;
                        }
                      });
                      if(found == true)$(row).show();else $(row).hide();
                    }
                  });
                }

}]);

myapp.controller('profileCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var user = $rootScope.username;
                  $scope.userin = user;

                  function getprofile(eid){
                    var url = 'http://0.0.0.0:8000/adra/employee/profile/'+eid;
                    $http.get(url)
                    .success(function(data){
                    console.log(data);
                    // $scope.allpays = data.Payroll;
                    $scope.names = data.Employee[0].names;
                    $scope.position = data.Employee[0].position;
                    $scope.project = data.Employee[0].projectname;
                    $scope.dob = data.Employee[0].dob;
                    $scope.id_number= data.Employee[0].id_number;
                    $scope.telephone=data.Employee[0].telephone;
                    $scope.telephone2 = data.Employee[0].telephone2;
                    $scope.email = data.Employee[0].email;
                    $scope.email2 = data.Employee[0].email2;
                    $scope.hobby = data.Employee[0].hobby;
                    $scope.education = data.Employee[0].education;
                    $scope.address = data.Employee[0].address;
                    $scope.contacts = data.Employee[0].contacts;
                    $scope.dependants = data.Employee[0].dependants;
                    $scope.history = data.Employee[0].historic;
                    $scope.first = data.Employee[0].first;
                    $scope.last = data.Employee[0].last;
                    $scope.salary = data.Employee[0].salary;
                    $scope.location = data.Employee[0].location;
                    $scope.cv = data.Employee[0].cv;
                    $scope.nid = data.Employee[0].nid;
                    $scope.contract = data.Employee[0].contract;
                    });
                  }

                  getprofile(eid)


                        $("#edit-profile").click(function(e){
                           event.preventDefault();
                           $(".profile-main-content,#edit-profile,.edit-btn").hide();
                           $(".edit-profile-form,#icon-arrow-left").show();
                           var config = {
                                headers:{
                                      'Content-Type':'application/json'
                                       }
                                     }
                          var url = 'http://0.0.0.0:8000/adra/getprojects';
                          $http.get(url)
                              .success(function(data, status, header, config){
                                  $scope.items = data;
                                  console.log(data);
                                  var options = "<option hidden></options>";
                                  $.each(data, function(key, value){
                                  options += "<option value='"+value.id+"'>"+value.name+"</option>"
                                  });
                                  $("#empproj").html(options);

                    });
                  })

                    $("#icon-arrow-left").click(function(e){
                           event.preventDefault();
                           $(".edit-profile-form,#icon-arrow-left").hide();
                           $(".profile-main-content,#edit-profile,.edit-btn").show();

                    });


                  $("#projid").click(function(){
                    $("#projid").hide();
                    $("#empproj").show();
                  });



                  $("#empproj").change(function(){
                    var proj = $("#empproj").val();
                    console.log(proj);
                    getLocations(proj);
                    $("#locat").hide();
                    $("#locations").show();
                  });


               function getLocations(proj){
                 var url = 'http://0.0.0.0:8000/adra/projects/location/'+proj;
                 $http.get(url)
                 .success(function(data, status, header, config){
                  var options = "<option hidden></options>";
                  $.each(data, function(key, value){
                  options += "<option value='"+value.location+"'>"+value.location+"</option>";
                  });

                  $("#locations").html(options);
              });
              };
                  $("#saveedit").click(function(){
                    var first = $("#first2").val();
                    var last = $("#last2").val();
                    var phone = $("#tel1").val();
                    var phone2 = $("#tel2").val();
                    var education = $("#educ2").val();
                    var address = $("#address2").val();
                    var proj = $("#empproj").val();
                    var position = $("#pos2").val();
                    var start = $("#startd").val();
                    var salary = $("#sal2").val();
                    var loc = $("#locations").val();

                    editEmp(first,last,phone,phone2,education,address,proj,position,start,salary,loc);
                  });

                  function editEmp(first,last,phone,phone2,education,address,proj,position,start,salary,loc){
                      var config={
                        headers:{
                          'Content-Type':'application/json'
                        }
                      }
                      var data_user='{"first_name":"'+first+'","last_name":"'+last+'","telephone":"'+phone+'","telephone2":"'+phone2+'","address":"'+address+'","education":"'+education+'","project_id":"'+proj+'","position":"'+position+'","salary":"'+salary+'","staff_location":"'+loc+'","active_time":"'+start+'"}';
                      // console.log(data_user);
                      $http.post('http://0.0.0.0:8000/adra/employee/edit/'+eid+'/',data_user, config)
                            .success(function(data, status, header, config){
                               console.log(data);
                               getprofile(eid);
                                   });
                    }

                    $("#termEmp").click(function(){
                      // alert('Hello');
                      $("#terminating").show()
                    });

                    $("#cancelterminate").click(function(){
                      $("#terminating").hide();
                    });

                    $("#yesterminate").click(function(){
                      var termdate = $('#termdate').val();
                      var termreason = $('#termreason').val();
                      var comment = $('#comment').val();
                      terminate(termdate,termreason,comment);
                      });

                      function terminate(termdate,termreason,comment){
                        var config={
                          headers:{
                            'Content-Type':'application/json'
                          }
                        }

                        var data_term='{"emp_id":"'+eid+'","end_date":"'+termdate+'","reason":"'+termreason+'","comment":"'+comment+'"}';
                        console.log(data_term);
                        $http.post('http://0.0.0.0:8000/adra/employee/terminate/',data_term, config)
                            .success(function(data, status, header, config){
                               console.log(data);
                               $location.path('/terminated');
                               });
                        };
}]);


myapp.controller('payslip', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var user = $rootScope.username;
                  $scope.userin = user;
                  var url = 'http://0.0.0.0:8000/adra/payroll/'+eid;
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  $scope.names = data.Payslip[0].Names;
                  $scope.position = data.Payslip[0].position;
                  $scope.project = data.Payslip[0].projectname;
                  $scope.dob = data.Payslip[0].dob;
                  $scope.nid= data.Payslip[0].id_number;
                  $scope.telephone=data.Payslip[0].telephone;
                  $scope.telephone2=data.Payslip[0].telephone2;
                  $scope.email=data.Payslip[0].email;
                  $scope.email2=data.Payslip[0].email2;
                  $scope.hobby=data.Payslip[0].hobby;
                  $scope.education = data.Payslip[0].education;
                  $scope.address = data.Payslip[0].address;
                  $scope.contacts = data.Payslip[0].contacts;
                  $scope.dependants = data.Payslip[0].dependants;
                  $scope.empnames = data.Payslip[0].Names;
                  $scope.empposition = data.Payslip[0].position;
                  $scope.empproject = data.Payslip[0].Project;
                  $scope.empsalary = data.Payslip[0].Basic_salary;
                  $scope.empcsr= data.Payslip[0].csr;
                  $scope.empgp=data.Payslip[0].Gross_pay;
                  $scope.emptpr = data.Payslip[0].tpr;
                  $scope.empadvance = data.Payslip[0].Advance;
                  $scope.empdeduct = data.Payslip[0].Total_Deductables;
                  $scope.empnet = data.Payslip[0].Net_Salary;
                  $scope.empmonth = data.Payslip[0].month;
                  $scope.salgen = data.Payslip[0].gen;
                  $scope.salder = data.Payslip[0].der;
                  });

}]);

myapp.controller('finalslipCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var user = $rootScope.username;
                  $scope.userin = user;
                  var url = 'http://0.0.0.0:8000/adra/employee/finalpay/'+eid;
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  if (data.Auth === 0){
                    $location.path('/profile');
                  }
                  $scope.names = data.FinalPay[0].Names;
                  $scope.position = data.FinalPay[0].position;
                  $scope.project = data.FinalPay[0].projectname;
                  $scope.dob = data.FinalPay[0].dob;
                  $scope.nid= data.FinalPay[0].id_number;
                  $scope.telephone=data.FinalPay[0].telephone;
                  $scope.telephone2=data.FinalPay[0].telephone2;
                  $scope.email=data.FinalPay[0].email;
                  $scope.email2=data.FinalPay[0].email2;
                  $scope.hobby=data.FinalPay[0].hobby;
                  $scope.education = data.FinalPay[0].education;
                  $scope.address = data.FinalPay[0].address;
                  $scope.contacts = data.FinalPay[0].contacts;
                  $scope.dependants = data.FinalPay[0].dependants;
                  $scope.finalNames = data.FinalPay[0].Names;
                  $scope.finalstart = data.FinalPay[0].Start_Year;
                  $scope.finalend = data.FinalPay[0].End_Year;
                  $scope.final_firstyear = data.FinalPay[0].Taxable_1st_year
                  $scope.final_lastyear = data.FinalPay[0].Taxable_last_year
                  $scope.finalYears = data.FinalPay[0].years;
                  $scope.finaltotalt= data.FinalPay[0].total_taxable;
                  $scope.finaltotald=data.FinalPay[0].Deductables;
                  $scope.finalnet = data.FinalPay[0].Net;
                  $scope.salgen = data.FinalPay[0].gen;
                  $scope.salder = data.FinalPay[0].der;
                  // // $scope.empadvance = data.Payslip[0].Advance;
                  // // $scope.empdeduct = data.Payslip[0].Total_Deductables;
                  // // $scope.empnet = data.Payslip[0].Net_Salary;
                  // // $scope.empmonth = data.Payslip[0].month;
                   });

}]);

myapp.controller('letterCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var user = $rootScope.username;
                  $scope.userin = user;
                  var url = 'http://0.0.0.0:8000/adra/employee/employment/'+eid;
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                  $scope.names = data.Employment[0].names;
                  $scope.position = data.Employment[0].position;
                  $scope.project = data.Employment[0].projectname;
                  $scope.dob = data.Employment[0].dob;
                  $scope.nid= data.Employment[0].id_number;
                  $scope.telephone=data.Employment[0].telephone;
                  $scope.telephone2=data.Employment[0].telephone2;
                  $scope.email=data.Employment[0].email;
                  $scope.email2=data.Employment[0].email2;
                  $scope.hobby=data.Employment[0].hobby;
                  $scope.education = data.Employment[0].education;
                  $scope.address = data.Employment[0].address;
                  $scope.contacts = data.Employment[0].contacts;
                  $scope.dependants = data.Employment[0].dependants;
                  $scope.datenow = data.Employment[0].datenow;
                  $scope.letternames = data.Employment[0].names;
                  $scope.letterstart = data.Employment[0].since;
                  $scope.letterPosition = data.Employment[0].position;
                  $scope.salgen = data.Employment[0].gen;
                  $scope.salder = data.Employment[0].der;
                   });

}]);


myapp.controller('salaryCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var user = $rootScope.username;
                  $scope.userin = user;
                  var url = 'http://0.0.0.0:8000/adra/employee/salary/'+eid;
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                  $scope.names = data.Salary[0].names;
                  $scope.position = data.Salary[0].position;
                  $scope.project = data.Salary[0].projectname;
                  $scope.dob = data.Salary[0].dob;
                  $scope.nid= data.Salary[0].id_number;
                  $scope.telephone=data.Salary[0].telephone;
                  $scope.telephone2=data.Salary[0].telephone2;
                  $scope.email=data.Salary[0].email;
                  $scope.email2=data.Salary[0].email2;
                  $scope.hobby=data.Salary[0].hobby;
                  $scope.education = data.Salary[0].education;
                  $scope.address = data.Salary[0].address;
                  $scope.contacts = data.Salary[0].contacts;
                  $scope.dependants = data.Salary[0].dependants;
                  $scope.datenow = data.Salary[0].datenow;
                  $scope.salnames = data.Salary[0].names;
                  $scope.salsince = data.Salary[0].since;
                  $scope.salnumbers = data.Salary[0].innumbers;
                  $scope.salwords = data.Salary[0].inwords;
                  $scope.salposition = data.Salary[0].position;
                  $scope.salgen = data.Salary[0].gen;
                  $scope.salder = data.Salary[0].der;
                  $scope.salner = data.Salary[0].ner;
                   });

}]);

myapp.controller('termcertfiCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var user = $rootScope.username;
                  $scope.userin = user;
                  var url = 'http://0.0.0.0:8000/adra/employee/leaving/'+eid;
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  $scope.names = data.Leaving[0].Names;
                  $scope.position = data.Leaving[0].position;
                  $scope.project = data.Leaving[0].projectname;
                  $scope.dob = data.Leaving[0].dob;
                  $scope.nid= data.Leaving[0].id_number;
                  $scope.telephone=data.Leaving[0].telephone;
                  $scope.telephone2=data.Leaving[0].telephone2;
                  $scope.email=data.Leaving[0].email;
                  $scope.email2=data.Leaving[0].email2;
                  $scope.hobby=data.Leaving[0].hobby;
                  $scope.education = data.Leaving[0].education;
                  $scope.address = data.Leaving[0].address;
                  $scope.contacts = data.Leaving[0].contacts;
                  $scope.dependants = data.Leaving[0].dependants;
                  $scope.datenow = data.Leaving[0].now;
                  $scope.termnames = data.Leaving[0].Names;
                  $scope.termhist = data.Leaving[0].history;
                  $scope.salgen = data.Leaving[0].gen;
                  $scope.salder = data.Leaving[0].der;
                   });
}]);

myapp.controller('terminatedCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var user = $rootScope.username;
                  $scope.userin = user;
                  function allterminated(){
                    var config = {
                    headers:{
                    'Content-Type':'application/json'
                    }
                    }
                    var url = 'http://0.0.0.0:8000/adra/allterminated';
                      $http.get(url)
                      .success(function(data){
                      console.log(data);
                      $scope.alltermi = data.Employees;
                      });
                    };

                    allterminated();

                    $scope.onprofile = function(empid){
                            $rootScope.empid = empid
                            $location.path('/profileterm');
                    };

}]);

myapp.controller('homeCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var user = $rootScope.username;
                  $scope.userin = user;
                  function numbers(){
                    var config = {
                    headers:{
                    'Content-Type':'application/json'

}                    }
                    var url = 'http://0.0.0.0:8000/adra/firstpage';
                      $http.get(url)
                      .success(function(data){
                      console.log(data);
                      $scope.empnumber = data.Numbers[0].Employees;
                      $scope.projnumber = data.Numbers[1].Project;
                      });
                    };

                    numbers();
}]);

myapp.controller('profiletermCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
        var eid = $rootScope.empid;
        var user = $rootScope.username;
        $scope.userin = user;

        function getprofile(eid){
          var url = 'http://0.0.0.0:8000/adra/employee/profile/'+eid;
          $http.get(url)
          .success(function(data){
          console.log(data);
          // $scope.allpays = data.Payroll;
          $scope.names = data.Employee[0].names;
          $scope.position = data.Employee[0].position;
          $scope.project = data.Employee[0].projectname;
          $scope.dob = data.Employee[0].dob;
          $scope.nid= data.Employee[0].id_number;
          $scope.telephone=data.Employee[0].telephone;
          $scope.telephone2 = data.Employee[0].telephone2;
          $scope.email = data.Employee[0].email;
          $scope.email2 = data.Employee[0].email2;
          $scope.hobby = data.Employee[0].hobby;
          $scope.education = data.Employee[0].education;
          $scope.address = data.Employee[0].address;
          $scope.contacts = data.Employee[0].contacts;
          $scope.dependants = data.Employee[0].dependants;
          $scope.history = data.Employee[0].historic;
          $scope.first = data.Employee[0].first;
          $scope.last = data.Employee[0].last;
          $scope.salary = data.Employee[0].salary;
          $scope.location = data.Employee[0].location;
          $scope.cv = data.Employee[0].cv;
          $scope.nid = data.Employee[0].nid;
          $scope.contract = data.Employee[0].contract;
          });
        }

        getprofile(eid);
      }]);


myapp.controller('projecttermCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){

                var user = $rootScope.username;
                $scope.userin = user;

                function allprojects(){
                var url = 'http://0.0.0.0:8000/adra/getalltermprojects';
                $http.get(url)
                  .success(function(data){
                   console.log(data);
                   $scope.allprojs = data.Projects;
                      });
                  };

            allprojects();
          }]);
