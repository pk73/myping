require.config({
  paths: {
        jquery: '../bower_components/jquery',
        detectMobile: 'detect-mobile',
        cookies: '../bower_components/js.cookie',
        validationRules: 'validation-rules',
//        nav: 'nav',
        login: 'login',
        modal: 'modal'
  }
});

define([
//    "jquery", "cookies", "validationRules", "nav", "login", "modal"
    "jquery", "cookies", "validationRules", "login", "modal"
],
function ($) {
        $(document).ready(function() {});
});
