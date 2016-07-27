var Dashboard = function() {

    coachHandler: function(){

    }

    return {

        init: function() {

            coachHandler();
        }
    };

}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        Dashboard.init(); // init metronic core componets
    });
}