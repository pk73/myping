(function() {
    define(['jquery', 'cookies'], function($, cookies) {
//console.log("nav loaded");
        var _languageCookie = 'language';
        var ENGLISH = 'English';
        var FRENCH = 'Français';
        var ACTIVE_LANGUAGE_ENGLISH = 'en';
        var ACTIVE_LANGUAGE_FRENCH = 'fr';
        $(document).ready(function(){
            var language = getLanguage();
            activeLanguage = ACTIVE_LANGUAGE_ENGLISH;
            var languageToDisplay = FRENCH;
            if(language.includes(ACTIVE_LANGUAGE_FRENCH)) {
                activeLanguage = ACTIVE_LANGUAGE_FRENCH;
                languageToDisplay = ENGLISH;
            }
            cookies.set(_languageCookie, activeLanguage);
//            $(".language a").html(languageToDisplay);  A.S.
//console.log("lang " + language);
        });

        function getLanguage() {
            var language = cookies.get(_languageCookie) || null;
            if(language === null) {
                
                if (navigator.languages && navigator.languages.length) {
                    // latest versions of Chrome and Firefox set this correctly
                    language = navigator.languages[0];
                  } else if (navigator.userLanguage) {
                    // IE only
                    language = navigator.userLanguage;
                  } else {
                    // latest versions of Chrome, Firefox, and Safari set this correctly
                    language = navigator.language;
                  }
            }
            return language;
        }
    });
})();