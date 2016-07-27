var Register = function () {

	var handleRegister = function () {
	     jQuery('.register-form').show();

         $('.register-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {

	                email: {
	                    required: true,
	                    email: true
	                },
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Please accept TNC first."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	}
    
    return {
        //main function to initiate the module
        init: function () {
            handleRegister();    
            // init background slide images
		    $.backstretch([
		        "../static/assets/pages/media/bg/2.jpg",
		        // "../assets/pages/media/bg/2.jpg",
		        // "../assets/pages/media/bg/3.jpg",
		        // "../assets/pages/media/bg/4.jpg",
		        ], {
		          fade: 1000,
		          duration: 5000
		    	}
        	);
        }
    };

}();

jQuery(document).ready(function() {
    Register.init();
});