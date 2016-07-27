var FormWizard = function () {


  return {
    //main function to initiate the module
    init: function () {
      if (!jQuery().bootstrapWizard) {
        return;
      }

      $("#questionType").select2({
        placeholder: "Select",
        allowClear: true,
        width: 'auto',
        escapeMarkup: function (m) {
          return m;
        }
      });

      var startActivity = function() {
        $.ajax({
          url:'.',
          method:'POST',
          headers : {
            "X-CSRFToken" : getCookie('csrftoken')
          },
          data: {'activity':true,'name':$('[name="sName"]').val(),'category':$('[name="sCategory"]').val()},
          success: function(response) {
            console.log(response);
            activityId = response;
          },
          error: function() {
            alert("Some Error occured");
            window.location.reload();
          }
        });
      }

      var addOption = function(val) {
        var html = '<div class="form-group"> <label class="control-label col-md-3">Option '+ val +'<span class="required"> * </span> </label> <div class="col-md-4"> <input type="text" class="form-control activityOptions" id="questionText" name="questionText" /> <span class="help-block"> Please enter the option. </span> </div> </div>';
        $('#tempDiv').append(html);
      }

      var addScore = function(val) {
         var html = ''+
         '<div class="form-group">'+
           '<label class="control-label col-md-3">'+
          'Score for Option '+val+
          '<span class="required"> * </span>'+
           '</label>'+
           '<div class="col-md-4">'+
            '<div class="input-group">'+
              '<span class="input-group-addon" style="text-align:right;width:100px;">Anxiety</span>'+
              '<input type="number" class="form-control activityScores" id="questionText" name="questionText" value="0" />'+
            '</div>'+
            '<div class="input-group">'+
              '<span class="input-group-addon" style="text-align:right;width:100px;">Depression</span>'+
              '<input type="number" class="form-control activityScores" id="questionText" name="questionText" value="0" />'+
            '</div>'+
            '<div class="input-group">'+
              '<span class="input-group-addon" style="text-align:right;width:100px;">Stress</span>'+
              '<input type="number" class="form-control activityScores" id="questionText" name="questionText" value="0" />'+
            '</div>'+
            '<div class="input-group">'+
              '<span class="input-group-addon" style="text-align:right;width:100px;">Activity</span>'+
              '<input type="number" class="form-control activityScores" id="questionText" name="questionText" value="0" />'+
            '</div>'+
             '<span class="help-block"> Please enter the scores. </span>'+
           '</div>'+
         '</div>';
        $('#tempDiv').append(html);
       }
      var resetQuestion = function() {
        $("#questionType").val('').trigger('change').closest('.form-group').removeClass('has-error');
        $('#questionText').val('').closest('.form-group').removeClass('has-error');
        $('.addOptions').hide();
        $('#tempDiv').html("");
      };

      var sendQuestion = function(type) {
        console.log(questions)
        $.ajax({
          url:'.',
          method:'POST',
          headers : {
            "X-CSRFToken" : getCookie('csrftoken')
          },
          data: {
            activity_id: activityId,
            questions: JSON.stringify(questions),
          },
          success: function(response) {
            // window.location.href= "..";
          },
          error: function() {
            alert("Some Error occured!\n Try submitting again");
          }
        })
      }
      var activityId = "";
      var form = $('#submit_form');
      var error = $('.alert-danger', form);
      var success = $('.alert-success', form);

      form.validate({
        doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
          //initialize
          sCategory: {
            required: true
          },
          sName: {
            required: true
          },
          //puestion
          questionType: {
            required: true
          },
          questionText: {
            required: true
          }
        },

        errorPlacement: function (error, element) { // render error placement for each input type
          if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
            error.insertAfter("#form_gender_error");
          } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
            error.insertAfter("#form_payment_error");
          } else {
            error.insertAfter(element); // for other inputs, just perform default behavior
          }
        },

        invalidHandler: function (event, validator) { //display error alert on form submit
          success.hide();
          error.show();
          App.scrollTo(error, -200);
        },

        highlight: function (element) { // hightlight error inputs
          $(element)
            .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
          $(element)
            .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
          if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
            label
              .closest('.form-group').removeClass('has-error').addClass('has-success');
            label.remove(); // remove error label here
          } else { // display success icon for other inputs
            label
              .addClass('valid') // mark the current input as valid and display OK icon
            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
          }
        },

        submitHandler: function (form) {
          success.show();
          error.hide();
          //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
        }

      });

      var handleTitle = function(tab, navigation, index) {
        var total = navigation.find('li').length;
        var current = index + 1;
        // set wizard title
        $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
        // set done steps
        jQuery('li', $('#form_wizard_1')).removeClass("done");
        var li_list = navigation.find('li');
        for (var i = 0; i < index; i++) {
          jQuery(li_list[i]).addClass("done");
        }

        if (current >= total) {
          $('#form_wizard_1').find('.button-next').hide();
          $('#form_wizard_1').find('.button-add-question').show();
          $('#form_wizard_1').find('.button-submit').show();
        } else {
          $('#form_wizard_1').find('.button-next').show();
          $('#form_wizard_1').find('.button-submit').hide();
        }
        App.scrollTo($('.page-title'));
      }

      // default form wizard
      $('#form_wizard_1').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function (tab, navigation, index, clickedIndex) {
          return false;
          console.log(tab,"onTabClick");

          success.hide();
          error.hide();
          if (form.valid() == false) {
            return false;
          }

          handleTitle(tab, navigation, clickedIndex);
        },
        onNext: function (tab, navigation, index) {
          success.hide();
          error.hide();
          console.log(tab,"onNext");
          if (form.valid() == false) {
            return false;
          }
          startActivity();
          handleTitle(tab, navigation, index);
        },
        onTabShow: function (tab, navigation, index) {
          console.log(tab,"onTabShow");

          var total = navigation.find('li').length;
          var current = index + 1;
          var $percent = (current / total) * 100;
          $('#form_wizard_1').find('.progress-bar').css({
            width: $percent + '%'
          });
        }
      });
      $('#form_wizard_1 .button-submit').click(function () {
        addQuestions();
        sendQuestion('submit');
      }).hide();

      // hide add question button and submit button
      $('#form_wizard_1').find('.button-add-question').hide();
      $('#form_wizard_1').find('.button-add-question').hide();
      $('.addOptions').hide();

      $('.addOptions').on("click",function(){
        var title;
        var html;
        switch ($('#questionType').val()) {
          case 'image':
            title = 'Image';
            html = '<div class="form-group"> <label class="control-label col-md-3">' + title + '<span class="required"> * </span> </label> <div class="col-md-4"> <input type="file" class="activityOptions" id="file" name="file" /> <span class="help-block"> Please upload the image. </span> </div> </div>';
            break;

          case 'video':
            title = 'Video';
            html = '<div class="form-group"> <label class="control-label col-md-3">' + title + '<span class="required"> * </span> </label> <div class="col-md-4"> <input type="url" class="form-control activityOptions" id="url" name="url" placeholder="https://www.youtube.com/watch?v=s8VOM8ET1WU" /> <span class="help-block"> Please type in the video link. </span> </div> </div>';
            break;

          default:
        }
        $('#tempDiv').append(html);
        $('.addOptions').hide();
      });

      function addQuestions() {
        var query_type = $('#questionType').val();
        switch (query_type) {
          case 'image':
            var imageFile = $('#file').get(0).files[0];
            console.log(imageFile)
            var imageData = new FormData();
            imageData.append('image', imageFile);
            questions.push({
              query_type: query_type,
              text: $('#questionText').val(),
              image: imageData,
            });
            break;

          case 'video':
            var videoUrl = $('#url').val();
            questions.push({
              query_type: query_type,
              text: $('#questionText').val(),
              videoUrl: videoUrl,
            });
            break;

          case 'text':
            questions.push({
              query_type: query_type,
              text: $('#questionText').val(),
            });
            break;

          default:
        }
        console.log(questions)
      }

      var questions = [];
      $('.button-add-question').on("click",function(){
        addQuestions();
        resetQuestion();
      });

      //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
      $('#questionType', form).change(function () {
        form.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
        $('.addOptions').hide();
        $('#tempDiv').html('');
        if ($(this).val() === 'image') {
          $('#addImage').click();
        } else if ($(this).val() === 'video') {
          $('#addVideo').click();
        }
      });
    }

  };

}();

jQuery(document).ready(function() {
  FormWizard.init();
});

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
