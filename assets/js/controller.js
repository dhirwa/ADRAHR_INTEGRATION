var myapp = angular.module('AdraApp', ['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/index.html'
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
    .when('/payroll', {
        templateUrl: 'views/payroll.html'
    })

    .when('/profile', {
        templateUrl: 'views/profile.html'
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
                           $scope.message=true;
                         }
                     });
                   }
              }]);


myapp.controller('signinCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
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
                        }else{
                        $scope.message = true;
                        }
                    });
                  }

              }]);





myapp.controller('leaveCtrl', ['$scope', '$http','$location', function($scope,$http,$location){

              var url = 'http://0.0.0.0:8000/adra/leaves/1';
              $http.get(url)
              .success(function(data){
              console.log(data);

                $scope.leaves = data.Leaves;


               });

               $("#leave_type").change(function(){
               var leav = $("#leave_type").val();
               console.log(leav)

               if(leav == 1){
                 var url = 'http://0.0.0.0:8000/adra/leaves/remaining/1';
                 $http.get(url)
                 .success(function(data){
                 console.log(data);
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
                  });

               }
               else if(leav == 2){
                 $("#hidden_div2").show();
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

            add_Leave(type,reason,startdate,enddate);
          });

          function add_Leave(type,reason,startdate,enddate){

            var config = {
            	headers:{
            		'Content-Type':'application/json'
            			    }
                        }
              var empid=1;
            var data = '{"emp_id":"'+empid+'","vacation_id":"'+type+'","reason":"'+reason+'","start_date":"'+startdate+'","end_date":"'+enddate+'"}';

            $http.post('http://0.0.0.0:8000/adra/leave/', data, config)
             .success(function(data, status, header, config){
                 console.log(data);
                 $('#message').show();
                 $('#myModal3').modal('hide')

                 $location.path("/");
                  });
                };
              }
            ]);


myapp.controller('employeesCtrl', ['$scope', '$http','$location', function($scope,$http,$location){

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

                    $("#next").click(function(){
                      $(".registration-show1").hide();
                     $(".registration-show2").show();
                     var url = 'http://0.0.0.0:8000/adra/projects';
                    $http.get(url)
                        .success(function(data, status, header, config){
                            $scope.projects = data;
                      console.log(data);
                      var options = "";
                      $.each(data, function(key, value){
                      options += "<option>"+value.Projectname+"</option>"
                      });
                      $("#empproj").html(options);
      });

                   });

                   $("#back").click(function(){
                     $(".registration-show2").hide();
                    $(".registration-show1").show();
                  });

      // $scope.onprofile = function(itememployeeid){
      // var eid=item.employeeid;
      // var url = 'http://0.0.0.0:8000/adra/employee/profile/'+eid;
      // $http.get(url)
      //     .success(function(data){
      //         console.log(data);
      //         $location.path('/profile');
      //         $scope.names = data.Employee[0].names;
      //         $scope.position = data.Employee[0].position;
      //         $scope.project = data.Employee[0].projectname;
      //         $scope.dob = data.Employee[0].dob;
      //         $scope.nid = data.Employee[0].id_number;
      //         $scope.telephone = data.Employee[0].telephone;
      //         $scope.education = data.Employee[0].education;
      //         $scope.address = data.Employee[0].address;
      //         $scope.contacts = data.Employee[0].contacts;
      //         $scope.dependants = data.Employee[0].dependants;
      //         $scope.history = data.Employee[0].historic;
      //     });
      //
      // };


}]);


myapp.controller('projectCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/projects';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  $scope.allprojs = data.Projects;
                  });

                  $scope.projs=function(){
                    var url = 'http://0.0.0.0:8000/adra/projects';
                    $http.get(url)
                    .success(function(data){
                    console.log(data);
                    $scope.allprojs = data.Projects;
                    });

                  }

}]);

myapp.controller('payrollCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/payrolls';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  $scope.allpays = data.Payroll;
                  });
}]);

myapp.controller('profileCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/employee/profile/1';
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
                  $scope.education = data.Employee[0].education;
                  $scope.address = data.Employee[0].address;
                  $scope.contacts = data.Employee[0].contacts;
                  $scope.dependants = data.Employee[0].dependants;
                  $scope.history = data.Employee[0].historic;

                  });

}]);

myapp.controller('payslip', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/payroll/1';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

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

                  });

}]);

myapp.controller('finalslipCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/employee/finalpay/1';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                  $scope.finalNames = data.FinalPay[0].Names;
                  $scope.finalstart = data.FinalPay[0].Start_Year;
                  $scope.finalend = data.FinalPay[0].End_Year;
                  $scope.final_firstyear = data.FinalPay[0].Taxable_1st_year
                  $scope.final_lastyear = data.FinalPay[0].Taxable_last_year
                  $scope.finalYears = data.FinalPay[0].years;
                  $scope.finaltotalt= data.FinalPay[0].total_taxable;
                  $scope.finaltotald=data.FinalPay[0].Deductables;
                  $scope.finalnet = data.FinalPay[0].Net;
                  // // $scope.empadvance = data.Payslip[0].Advance;
                  // // $scope.empdeduct = data.Payslip[0].Total_Deductables;
                  // // $scope.empnet = data.Payslip[0].Net_Salary;
                  // // $scope.empmonth = data.Payslip[0].month;
                   });

}]);

myapp.controller('letterCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/employee/employment/1';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                   $scope.datenow = data.Employment[0].datenow;
                   $scope.letternames = data.Employment[0].names;
                   $scope.letterstart = data.Employment[0].since;
                   $scope.letterPosition = data.Employment[0].position;

                   });

}]);


myapp.controller('salaryCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/employee/salary/5';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                  $scope.datenow = data.Salary[0].datenow;
                  $scope.salnames = data.Salary[0].names;
                  $scope.salsince = data.Salary[0].since;
                  $scope.salnumbers = data.Salary[0].innumbers;
                  $scope.salwords = data.Salary[0].inwords;
                  $scope.salposition = data.Salary[0].position;
                  $scope.salgen = data.Salary[0].gen;
                  $scope.salder = data.Salary[0].der;
                   });

}]);

myapp.controller('termcertfiCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/employee/leaving/1';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                     $scope.datenow = data.Leaving[0].now;
                     $scope.termnames = data.Leaving[0].Names;
                     $scope.termhist = data.Leaving[0].history;
                   });
}]);
