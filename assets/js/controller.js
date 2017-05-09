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



myapp.controller('employeesCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){

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
                                          var options = "";
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
                                    var options = "";
                                    $.each(data, function(key, value){
                                    options += "<option value='"+value.id+"'>"+value.location+"</option>";
                                    });

                                    $("#locations").html(options);
                                });

                              };



                                 $("#back").click(function(){
                                   $(".registration-show2").hide();
                                  $(".registration-show1").show();
                                });

                                $("#addEmp").click(function(){
                                  var first = $("#first-name").val();
                                  var last = $("#last-name").val();
                                  var id_number = $("#id_number").val();
                                  var phone = $("#phone").val();
                                  var email = $("#email").val();
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

                                  addEmployee(first,last,id_number,phone,email,birth,gender,education,address,proj,position,start,salary,loc,emernames,emerrelation,emernumber,depnames,deprealtion,depdob);
                                });

                                function addEmployee(first,last,id_number,phone,email,birth,gender,education,address,proj,position,start,salary,loc,emernames,emerrelation,emernumber,depnames,deprelation,depdob){
                                    var config={
                                      headers:{
                                        'Content-Type':'application/json'
                                      }
                                    }
                                    var data_user='{"first_name":"'+first+'","last_name":"'+last+'","id_number":"'+id_number+'","telephone":"'+phone+'","email":"'+email+'","dob":"'+birth+'","gender":"'+gender+'","education":"'+education+'","address":"'+address+'","project_id":"'+proj+'","position":"'+position+'","salary":"'+salary+'","start":"'+start+'","staff_location":"'+loc+'","emernames":"'+emernames+'","emerrelation":"'+emerrelation+'","emernumber":"'+emernumber+'","depnames":"'+depnames+'","deprelation":"'+deprelation+'","depdob":"'+depdob+'"}';
                                    console.log(data_user);
                                    $http.post('http://0.0.0.0:8000/adra/addemployee/',data_user, config)
                                        .success(function(data, status, header, config){
                                           console.log(data);
                                           $('#empmessage').show();

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


              }]);

myapp.controller('leaveCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
              var eid = $rootScope.empid;
              var url = 'http://0.0.0.0:8000/adra/leaves/'+eid;
              $http.get(url)
              .success(function(data){
              console.log(data);

                $scope.leaves = data.Leaves;


               });

               $("#leave_type").change(function(){
               var leav = $("#leave_type").val();
               console.log(leav)

               if(leav == 1){
                 var url = 'http://0.0.0.0:8000/adra/leaves/remaining/'+eid;
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

            var data = '{"emp_id":"'+eid+'","vacation_id":"'+type+'","reason":"'+reason+'","start_date":"'+startdate+'","end_date":"'+enddate+'"}';

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


myapp.controller('projectCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
                  var url = 'http://0.0.0.0:8000/adra/projects';
                  $http.get(url)
                  .success(function(data){
                  console.log(data);
                  $scope.allprojs = data.Projects;
                  });
                  var url2 = 'http://0.0.0.0:8000/adra/getdonors';
                  $http.get(url2)
                      .success(function(datas, status, header, config){
                          $scope.items = datas;
                          console.log(datas);
                          var options = "";
                          $.each(datas, function(key, value){
                          options += "<option>"+value.name+"</option>"
                          });
                          $("#donors").html(options);
                    });

                    $("#addproject").click(function(){
                      var title = $("#ptitle").val();
                      var donor = $("#donors").val();
                      var start = $("#start").val();
                      var duration = $("#duration").val();
                      var salaries = $("#salaries").val();
                      var location = $("#plocation").val();

                      addProject(title,donor,start,duration,salaries,location);
                    });

                    function addProject(title,donor,start,duration,salaries,location){
                        var config={
                          headers:{
                            'Content-Type':'application/json'
                          }
                        }
                        var data_project='{"name":"'+title+'","donor_id":"'+donor+'","start_date":"'+start+'","duration":"'+duration+'","budget":"'+salaries+'","location":"'+location+'"}';
                        console.log(data_project);
                        $http.post('http://0.0.0.0:8000/adra/addproject/',data_project, config)
                            .success(function(data, status, header, config){
                               console.log(data);
                               $('#porojmessage').show();

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

}]);

myapp.controller('payrollCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
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
                  $scope.education = data.Employee[0].education;
                  $scope.address = data.Employee[0].address;
                  $scope.contacts = data.Employee[0].contacts;
                  $scope.dependants = data.Employee[0].dependants;
                  $scope.history = data.Employee[0].historic;
                  $scope.first = data.Employee[0].first;
                  $scope.last = data.Employee[0].last;
                  $scope.salary = data.Employee[0].salary;
                  $scope.location = data.Employee[0].location;
                  });

                  $(document).ready(function(){
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
                                  var options = "";
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
                  });

                  $("#projid").click(function(){
                    $("#projid").hide();
                    $("#empproj").show();
                  });

                  $("#empproj").change(function(){
                    var proj = $("#empproj").val();
                    console.log(proj);
                    getLocations(proj);
                  });


               function getLocations(proj){
                 var url = 'http://0.0.0.0:8000/adra/projects/location/'+proj;
                 $http.get(url)
                 .success(function(data, status, header, config){
                  var options = "";
                  $.each(data, function(key, value){
                  options += "<option value='"+value.id+"'>"+value.location+"</option>";
                  });

                  $("#locations").html(options);
              });

                  $("#saveedit").click(function(){
                    var first = $("#first2").val();
                    var last = $("#last2").val();
                    var phone = $("#tel1").val();
                    var education = $("#educ2").val();
                    var address = $("#address2").val();
                    var proj = $("#empproj").val();
                    var position = $("#empposition").val();
                    var start = $("#startd").val();
                    var salary = $("#sal2").val();
                    var loc = $("#locations").val();

                    editEmp(first,last,phone,education,address);
                  });

                  function editEmp(first,last,phone,education,address){
                      var config={
                        headers:{
                          'Content-Type':'application/json'
                        }
                      }
                      var data_user='{"first_name":"'+first+'","last_name":"'+last+'","telephone":"'+phone+'","address":"'+address+'","education":"'+education+'"}';
                      console.log(data_user);
                      $http.post('http://0.0.0.0:8000/adra/employee/edit/'+eid+'/',data_user, config)
                            .success(function(data, status, header, config){
                               console.log(data);
                               $location.path('/')
                                   });
                    }


};

}]);

myapp.controller('payslip', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
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

                  });

}]);

myapp.controller('finalslipCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
                  var url = 'http://0.0.0.0:8000/adra/employee/finalpay/'+eid;
                  $http.get(url)
                  .success(function(data){
                  console.log(data);

                  $scope.names = data.FinalPay[0].Names;
                  $scope.position = data.FinalPay[0].position;
                  $scope.project = data.FinalPay[0].projectname;
                  $scope.dob = data.FinalPay[0].dob;
                  $scope.nid= data.FinalPay[0].id_number;
                  $scope.telephone=data.FinalPay[0].telephone;
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
                  // // $scope.empadvance = data.Payslip[0].Advance;
                  // // $scope.empdeduct = data.Payslip[0].Total_Deductables;
                  // // $scope.empnet = data.Payslip[0].Net_Salary;
                  // // $scope.empmonth = data.Payslip[0].month;
                   });

}]);

myapp.controller('letterCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
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
                  $scope.education = data.Employment[0].education;
                  $scope.address = data.Employment[0].address;
                  $scope.contacts = data.Employment[0].contacts;
                  $scope.dependants = data.Employment[0].dependants;
                  $scope.datenow = data.Employment[0].datenow;
                  $scope.letternames = data.Employment[0].names;
                  $scope.letterstart = data.Employment[0].since;
                  $scope.letterPosition = data.Employment[0].position;

                   });

}]);


myapp.controller('salaryCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
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
                   });

}]);

myapp.controller('termcertfiCtrl', ['$scope', '$http','$location','$rootScope', function($scope,$http,$location,$rootScope){
                  var eid = $rootScope.empid;
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
                  $scope.education = data.Leaving[0].education;
                  $scope.address = data.Leaving[0].address;
                  $scope.contacts = data.Leaving[0].contacts;
                  $scope.dependants = data.Leaving[0].dependants;
                  $scope.datenow = data.Leaving[0].now;
                  $scope.termnames = data.Leaving[0].Names;
                  $scope.termhist = data.Leaving[0].history;
                   });
}]);
