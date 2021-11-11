(function() {
    define(['jquery'], function($) {
        $(document).ready(function(){
            //Setup close button for modal
            $(".modal-container__close-button").click(function(e){
            	e.preventDefault();
                $(".modal-container").hide(1,function(){
                    $(modalFocusElement).focus();
                    $(".modal-background").hide(1,function() {
                    });
                });
            });
        });
    });
})();
