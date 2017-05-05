$(document).ready(function(){
  $("#edit-profile").click(function(e){
         event.preventDefault();
         $(".profile-main-content,#edit-profile,.edit-btn").hide();
         $(".edit-profile-form,#icon-arrow-left").show();


  });

  $("#icon-arrow-left").click(function(e){
         event.preventDefault();
         $(".edit-profile-form,#icon-arrow-left").hide();
         $(".profile-main-content,#edit-profile,.edit-btn").show();

  });
});

/*Hide and SHOW on Select form*/
document.getElementById('test').addEventListener('change', function () {
    var style = this.value == 2 ? 'block' : 'none';
     var style2 = this.value == 1 ? 'block' : 'none';
    document.getElementById('hidden_div2').style.display = style;
      document.getElementById('hidden_div').style.display = style2;
});

$(document).on('click', '#close-preview', function(){
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
           $('.image-preview').popover('show');
        },
         function () {
           $('.image-preview').popover('hide');
        }
    );
});


/*UPLOAD FILE JS*/
$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function (){
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

$(document).on('click', '#close-preview', function(){
    $('.image-preview2').popover('hide');
    // Hover befor close the preview
    $('.image-preview2').hover(
        function () {
           $('.image-preview2').popover('show');
        },
         function () {
           $('.image-preview2').popover('hide');
        }
    );
});

/*Upload File 2*/
$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview2').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear2').click(function(){
        $('.image-preview2').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear2').hide();
        $('.image-preview-input2 input:file').val("");
        $(".image-preview-input-title2").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input2 input:file").change(function (){
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title2").text("Change");
            $(".image-preview-clear2").show();
            $(".image-preview-filename2").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview2").attr("data-content",$(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

$(document).on('click', '#close-preview', function(){
    $('.image-preview3').popover('hide');
    // Hover befor close the preview
    $('.image-preview3').hover(
        function () {
           $('.image-preview3').popover('show');
        },
         function () {
           $('.image-preview3').popover('hide');
        }
    );
});


/*Upload file 3*/
$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview3').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear3').click(function(){
        $('.image-preview3').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear3').hide();
        $('.image-preview-input3 input:file').val("");
        $(".image-preview-input-title3").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input3 input:file").change(function (){
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title3").text("Change");
            $(".image-preview-clear3").show();
            $(".image-preview-filename3").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview3").attr("data-content",$(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

/*ADD FORM JS-1*/
var room = 1;
function education_fields() {
  room++;
  var objTo = document.getElementById('education_fields')
  var divtest = document.createElement("div");
divtest.setAttribute("class", "form-group removeclass"+room);
var rdiv = 'removeclass'+room;
  divtest.innerHTML = '<div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value="" placeholder="Name"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value=""placeholder="Relation"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value="" placeholder="phone-nber"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button style="border-radius: 50% !important;background-color:#4D8885;color:#fff" class="btn btn-default" type="button" onclick="remove_education_fields('+ room +');"> <i class="fa fa-minus"></i> </button></div></div></div></div><div class="clear"></div></div>';
  objTo.appendChild(divtest)
}
 function remove_education_fields(rid) {
   $('.removeclass'+rid).remove();
 }

/*ADD FORM JS-2*/
 var room = 1;
function education_fields2() {
   room++;
   var objTo = document.getElementById('education_fields2')
   var divtest = document.createElement("div");
divtest.setAttribute("class", "form-group removeclass"+room);
var rdiv = 'removeclass'+room;
   divtest.innerHTML = '<div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Nationalite" name="Degree[]" value="" placeholder="Name"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree"name="Degree[]" value="" placeholder="Relation"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value="" placeholder="phone-nber"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button style="border-radius: 50% !important;background-color:#4D8885;color:#fff" class="btn btn-default" type="button" onclick="remove_education_fields2('+ room +');"> <i class="fa fa-minus"></i> </button></div></div></div></div><div class="clear"></div></div>';
   objTo.appendChild(divtest)
}
  function remove_education_fields2(rid) {
   $('.removeclass'+rid).remove();
  }

 /*ADD FORM JS-3*/
  var room = 1;
 function education_fields3() {
    room++;
    var objTo = document.getElementById('education_fields3')
    var divtest = document.createElement("div");
 divtest.setAttribute("class", "form-group removeclass"+room);
 var rdiv = 'removeclass'+room;
    divtest.innerHTML = '<div class="col-sm-8 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value="" placeholder="Names"></div></div><div class="col-sm-4 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button style="border-radius: 50% !important;background-color:#4D8885;color:#fff" class="btn btn-default" type="button" onclick="remove_education_fields3('+ room +');"> <i class="fa fa-minus" ></i> </button></div></div></div></div><div class="clear"></div></div>';
    objTo.appendChild(divtest)
 }
   function remove_education_fields3(rid) {
    $('.removeclass'+rid).remove();
   }

   var room = 1;
  function education_fields4() {
     room++;
     var objTo = document.getElementById('education_fields4')
     var divtest = document.createElement("div");
  divtest.setAttribute("class", "form-group removeclass"+room);
  var rdiv = 'removeclass'+room;
     divtest.innerHTML = '<div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Nationalite" name="Degree[]" value="" placeholder="Name"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree"name="Degree[]" value="" placeholder="Relation"></div></div><div class="col-sm-4 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value="" placeholder="date-birth"></div></div><div class="col-sm-2 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button style="border-radius: 50% !important;background-color:#4D8885;color:#fff" class="btn btn-default" type="button" onclick="remove_education_fields4('+ room +');"> <i class="fa fa-minus"></i> </button></div></div></div></div><div class="clear"></div></div>';
     objTo.appendChild(divtest)
  }
    function remove_education_fields4(rid) {
     $('.removeclass'+rid).remove();
    }

    var room = 1;
   function education_fields5() {
      room++;
      var objTo = document.getElementById('education_fields5')
      var divtest = document.createElement("div");
   divtest.setAttribute("class", "form-group removeclass"+room);
   var rdiv = 'removeclass'+room;
      divtest.innerHTML = '<div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Nationalite" name="Degree[]" value="" placeholder="Name"></div></div><div class="col-sm-3 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree"name="Degree[]" value="" placeholder="Relation"></div></div><div class="col-sm-4 nopadding"><div class="form-group"><input type="text" class="form-control" id="Degree" name="Degree[]" value="" placeholder="date-birth"></div></div><div class="col-sm-2 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button style="border-radius: 50% !important;background-color:#4D8885;color:#fff" class="btn btn-default" type="button" onclick="remove_education_fields5('+ room +');"> <i class="fa fa-minus"></i> </button></div></div></div></div><div class="clear"></div></div>';
      objTo.appendChild(divtest)
   }
     function remove_education_fields5(rid) {
      $('.removeclass'+rid).remove();
     }



/*HIDE AND SHOW*/
$(document).ready(function(){

  // $("#employee").click(function(e){
  //    event.preventDefault();
  //   $("#terminated-contractors").hide();
  //    $(".employee-list").show();
  // });
    $("#employee").click(function(e){
       event.preventDefault();
      $("#project-listing,#payroll-list,#terminated-contractors,#profile").hide();
       $(".employee-list,.drop-employer").show();
    });

   $("#project").click(function(e){
      event.preventDefault();
     $(".employee-list,#terminated-contractors,#payroll-list,#profile").hide();
      $("#project-listing,.drop-employer").show();
   });

   $("#terminated").click(function(e){
      event.preventDefault();
     $(".employee-list,#project-listing,#payroll-list,#profile").hide();
      $("#terminated-contractors,.drop-employer").show();
   });

   $("#payroll").click(function(e){
      event.preventDefault();
     $("#project-listing,.employee-list,#terminated-contractors,#profile").hide();
      $("#payroll-list,.drop-employer").show();
   });

});
$(document).ready(function(){
  $("#next").click(function(e){
     event.preventDefault();
      $(".registration-show1").hide();
     $(".registration-show2").show();

  });

  $("#back").click(function(e){
     event.preventDefault();
      $(".registration-show2").hide();
     $(".registration-show1").show();
  });

  $("#employee-one").click(function(e){
     event.preventDefault();
       $(".employee-list,.drop-employer").hide();
      $("#profile").show();

  });

  $("#view-leave").click(function(e){
     event.preventDefault();
       $(".table-profile,#view-leave").hide();
       $("#view-leaves,#view-profile").show();


  });

  $("#view-profile").click(function(e){
     event.preventDefault();
       $("#view-leaves,#view-profile").hide();
       $(".table-profile,#view-leave").show();

  });

  $("#pay-slip-open").click(function(e){
     event.preventDefault();
        $("#table-profile").hide();
        $("#pay-slip").show();
  });

});

jQuery(document).ready(function($) {
    $(".name-one").click(function() {
        window.location = $(this).data("href");
    });
});

// function fixedScrolled(e) {
//        var evt = window.event || e;
//        var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta; //delta returns +120 when wheel is scrolled up, -120 when scrolled down
//        $(".well").scrollTop($(".well").scrollTop() - delta);
//    }
// fixedScrolled(e);
//    var mousewheelevt = (/Gecko\//i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
//    if (fixedElement.attachEvent) fixedElement.attachEvent("on" + mousewheelevt, fixedScrolled);
//    else if (fixedElement.addEventListener) fixedElement.addEventListener(mousewheelevt, fixedScrolled, false);
