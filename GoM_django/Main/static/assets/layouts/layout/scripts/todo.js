/**
Todo Module
**/
var AppTodo = function () {

    // private functions & variables

    var _initComponents = function() {

        $('.edit-diary').on("click",function(){
            $parent = $(this).closest('.portlet.light.bordered');
            console.log("yo",$parent,$(parent).find('.diary-title'));
            $('#todo-task-modal .diary-modal-title').val($parent.find('.diary-title').html());
            $('#todo-task-modal .diary-modal-date').val($parent.find('.diary-date').html());
            $('#todo-task-modal .diary-modal-message').val($parent.find('.diary-message').html());
            $('#todo-task-modal .diary-modal-save').data('did',$(this).data('did'));

        });

        $('#todo-task-modal .diary-modal-save').on("click",function(){
            var dairyObj = {};
            dairyObj["title"] = $('#todo-task-modal .diary-modal-title').val();
            dairyObj["text"] = $('#todo-task-modal .diary-modal-message').val();
            dairyObj["oid"] = $('#todo-task-modal .diary-modal-save').data('did');
            if(dairyObj["title"] != "" && dairyObj["text"] != "") {
                $.ajax({
                    url:'/diary/',
                    method:'POST',
                    headers : {
                        "X-CSRFToken" : getCookie('csrftoken')
                    },
                    data: dairyObj,
                    success:function(response){
                        $('#todo-task-modal').modal('hide');
                        $('.diaries').prepend(''+
                            '<div class="portlet light bordered">'+
                                '<div class="portlet-title">'+
                                    '<div class="caption font-green-sharp">'+
                                        '<i class="icon-speech font-green-sharp"></i>'+
                                        '<span class="caption-subject bold uppercase diary-title">'+
                                            response.title+
                                        ' </span>'+
                                        '<span class="caption-helper diary-date">'+
                                            response.modified_date+
                                        '</span>'+
                                    '</div>'+
                                    '<div class="actions">'+
                                        '<button class="btn btn-circle btn-default btn-sm edit-diary" data-toggle="modal" href="#todo-task-modal" data-did="123">'+
                                            '<i class="fa fa-pencil"></i> Edit </button>'+
                                        '<a href="javascript:;" class="btn btn-circle btn-default btn-sm delete">'+
                                            '<i class="fa fa-trash"></i> Delete </a>'+
                                        '<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;"> </a>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="portlet-body">'+
                                    '<div class="scroller diary-message" style="height:200px" data-rail-visible="1" data-rail-color="yellow" data-handle-color="#a1b2bd">'+
                                        response.text_data+
                                    '</div>'+
                                '</div>'+
                            '</div>');

                        console.log(response);
                    },
                    error: function(){
                        alert("Try Again!");
                    }
                });
            }
            else
                alert("Empty title or message");

        });

        $('.add-diary').on("click",function(){
            $('#todo-task-modal .diary-modal-title').val("");
            $('#todo-task-modal .diary-modal-date').val(new Date().toLocaleDateString());
            $('#todo-task-modal .diary-modal-message').val("");
            $('#todo-task-modal .diary-modal-save').data('did',"");
        })
    }

    var _handleProjectListMenu = function() {
        if (App.getViewPort().width <= 992) {
            $('.todo-project-list-content').addClass("collapse");
        } else {
            $('.todo-project-list-content').removeClass("collapse").css("height", "auto");
        }
    }

    // public functions
    return {

        //main function
        init: function () {
            _initComponents();
            _handleProjectListMenu();

            App.addResizeHandler(function(){
                _handleProjectListMenu();
            });
        }

    };

}();

jQuery(document).ready(function() {
    AppTodo.init();
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
