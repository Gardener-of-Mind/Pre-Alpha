function getSurvey(sid) {
	$.ajax({
		method: 'POST',
		cache: false,
        headers : { 'X-CSRFToken' : getCookie('csrftoken') },
		data: { 'survey_type': sid },
		success: function(response) {
			console.log('success');
		},
		error: function() {
			console.log('error');
		},
	});
}

$(document).ready(function() {
	// Initialise
	$('.body-box').animate({
		'padding-top': '40px',
		'opacity': '1'
	}, 500);

	// click handler for type
	$('.survey-type-btn').click(function() {
		getSurvey($(this).data('sid'));
	});
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
