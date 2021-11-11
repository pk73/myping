(function() {
//    define(['jquery', 'cookies', 'nav', 'modal'], function($, cookies, nav) {
    define(['jquery', 'cookies', 'modal'], function($, cookies, nav) {
        var $loginAlert = $('.show-alert.header-alert');
        var _userIdCookieName = "userId";
        var _languageCookie = 'pf-accept-language';
        var _userTypeCookie = "userType";
        
        // Setup on document ready function
        $(document).ready(function() {
			
			_bindLanuageSwitch();

	                setupHints();
			processDataLabel();
	
			//console.log("Language: " + document.documentElement.lang);

			//setCopyright(); use static version on the page itself
			
            if(typeof errors !== 'undefined') {
                if(!errors || errors.length === 0) {
                    $("#error-container").hide();
                }
                else {
                    $("#error-container").show();
                    var html = ''; 
                    $.each(errors, function(index, value) {
                        html += '<li class="list__item">' + value + '</li>';
                    });
                    $("#error-list").html(html);
                }
            }
            else {
                $("#error-container").hide();
            }
            $(".remeber-me__active-styling input").focus(function(){
                $(this).parent().children('.choice__text').addClass('outline');
            });
            $(".remeber-me__active-styling input").blur(function(){
                $(this).parent().children('.choice__text').removeClass('outline');
            });

            $("input:radio").on('change', function(){
                
                $("#error-container").hide();
                $(".helper--error").each(function(index, value){
                    $(value).hide();
                });
                $("input:text,input:password").each(function(index, value){
                	//console.log(value);
                	var field = $(value);
                    field.parent().removeClass('field--error');
                    field.val("");
                });
         
                var chkBox = $('#remember-me-checkbox');
                if (chkBox.prop('checked')) {
                    cookies.remove(_userIdCookieName);
                    chkBox.prop('checked', false);	
                }
                
                setupHints();
                processDataLabel();
            });
			
            // Setup form submit handler
            $('#login').on('submit', function(evt) {
                evt.preventDefault();

                var username = $('#username');
                var password = $('#password');


                var isValid = false;

                isValid = validateTeamMemberInfo();

				
                /**
                 * INPUT SERVER AJAX SEND OR SYNC CALL HERE
                 * Usable variables:
                 * 1) email-or-username
                 * 2) password
                 * 
                 */

                if(isValid) {
					document.forms[0]['pf.ok'].value = 'clicked';
					document.forms[0].submit();
                    //console.log("Submit username and password to the server");
                }
				 
            });
			
            function validateGuestInfo() {
                return validateRequiredField("username", "username", "guest")
                    && validateEmailField("username", "username", "guest")
                    && validateUserNameIsNotTelusEmail("username", "username", "guest")
                    && validateRequiredField("password", "password", "guest");
            }

            function validateTeamMemberInfo() {
                return validateRequiredField("username", "username", "team-member")
//A.S.                    && validateUserNameIsNotTelusID("username", "username", "team-member")
                    && validateRequiredField("password", "password", "team-member");
            }

            function validateRequiredField(fieldId, fieldName) {
                var fieldValue = $('#' + fieldId).val();
                var isValid = true;
                if(fieldValue === '') {
                    isValid = false;
                    $("#" + fieldName +"-field-error strong").html(labels[fieldName + '.custom-validity']);
                    $("#" + fieldName +"-field-error").show();
                    $(".field-" + fieldName).addClass('field--error');
                }
                else {
                    $("#" + fieldName + "-field-error").hide();
                    $(".field-" + fieldName).removeClass('field--error');
                }
                return isValid;
            }

            function validateEmailField(fieldId, fieldName) {
                var fieldValue = $('#' + fieldId).val();
                var emailRegex = /(.)+?@(.)+\.(.)+/;

                var isValid = true;
                if(!emailRegex.test(fieldValue)) {
                    isValid = false;
                    $("#" + fieldName +"-field-error strong").html(labels[fieldName +'.custom-validity.email']);
                    $("#" + fieldName +"-field-error").show();
                    $(".field-" + fieldName).addClass('field--error');
                }
                else {
                    $("#" + fieldName + "-field-error").hide();
                    $(".field-" + fieldName).removeClass('field--error');
                }
                return isValid;
            }

            function validateUserNameIsNotTelusID(fieldId, fieldName) {
                var fieldValue = $('#' + fieldId).val();
                var emailRegex = /(.)+?@(.)+\.(.)+/;

                var isValid = true;
                if(emailRegex.test(fieldValue)) {
                    isValid = false;
//                    $("#" + fieldName +"-field-error strong").html(labels[fieldName  +'.custom-validity.id']);
                    $("#" + fieldName +"-field-error strong").html(labels[fieldName +'.custom-validity.telus-email']);
                    $("#" + fieldName +"-field-error").show();
                    $(".field-" + fieldName).addClass('field--error');
                }
                else {
                    $("#" + fieldName + "-field-error").hide();
                    $(".field-" + fieldName).removeClass('field--error');
                }
                return isValid;
            }
            
            function validateUserNameIsNotTelusEmail(fieldId, fieldName) {
                var fieldValue = $('#' + fieldId).val();
                var emailRegex = /(.)+?@telus\.com+/;

                var isValid = true;
                if(emailRegex.test(fieldValue)) {
                    isValid = false;
                    $("#" + fieldName +"-field-error strong").html(labels[fieldName +'.custom-validity.telus-email']);
                    $("#" + fieldName +"-field-error").show();
                    $(".field-" + fieldName).addClass('field--error');
                }
                else {
                    $("#" + fieldName + "-field-error").hide();
                    $(".field-" + fieldName).removeClass('field--error');
                }
                return isValid;
            }
			
            $(document).click(function(e){
                var target = $(e.target);
                if(!$(target).hasClass('hint__trigger')) {
                    $("button[aria-controls]").parent().removeClass('hint--active');
                }
            });

            $("button[aria-controls]").click(function(e){
                $(this).parent().toggleClass('hint--active');
            });

            $(".terms-and-conditions-link").click(function(e){
                modalFocusElement = $(this);
                e.preventDefault();
                $(".modal-background").show();
				$(".modal-container .modal_container__modal-heading").show();
                $(".modal-container .modal_container__modal-heading").html(labels['terms-and-conditions.heading']);
                $(".modal-container .modal_container__modal-content").html(labels['terms-and-conditions.body']);
                $(".modal-container").show();
                return false;
            });

            $('#forgot-password').click(function(e){
                modalFocusElement = $(this);
                e.preventDefault();
                

                if (true) {
                	//window.location.href = "https://login.pingone.com/idp/directory/a/9c26a4f9-29d4-44cc-9b10-db7ce3341790/forgotpassword/request";
                	window.location.href = forgotPasswordUrl; // has to be set on the login page by now

                	return;
                }
                
                
                $(".modal-background").show();
				/**/
				$(".modal-container .modal_container__modal-heading").hide();
                //$(".modal-container .modal_container__modal-heading").html(labels['forgot-password.heading']); // no needed
                $(".modal-container .modal_container__modal-content").html(labels['forgot-password.body']);
				
                
			
                $(".modal-container").show();
                return false;
            });

            // Init remember me cookie setter event listeners
            _setRememberMeEvents();

			$("#username").focus();

			$('.language a').unbind('click', false);  // re-enable


        });

        function setupHints() {
            $("#username-hint").attr("data-label", "username.hint");
            $("#username").attr("placeholder-data-label", "username.placeholder");
            $("#password-hint").attr("data-label", "password.hint");
            $("#password").attr("placeholder-data-label", "password.placeholder");
        }
		
        function processDataLabel() {
            $("[data-label]" ).each(function(index, value){
                var labelName = $(value).attr("data-label");
                var textValue;
				try {
					textValue = labels[labelName];
					//console.log("label found: "+labelName);
				} catch (err) {
					//console.log("label not found: "+labelName);
				}
				// A.S. if the label is defined and a similar key defined in the server lang pack
				// this would override a server side text
				if (textValue != null) { 
					$(value).html(textValue);
				}
            });

            $( "[placeholder-data-label]" ).each(function(index, value){
                var labelName = $(value).attr("placeholder-data-label");
                var textValue = labels[labelName];
                $(value).attr('placeholder',textValue);
            });

        }
		
        function _setRememberMeEvents() {
            _checkForUserIdCookie();
            _setCookieEventHandler();
            _setCheckboxEventHandler();
        }

//        function _setCheckboxEventHandler() {
//            $('#remember-me-checkbox').on('ifUnchecked', function() {
//            	console.log("Removing...");
//                cookies.remove(_userIdCookieName);
//            });
//        }

        function _setCheckboxEventHandler() {
            $('#remember-me-checkbox').on("change", function() { 
                if (!this.checked) {
                    cookies.remove(_userIdCookieName);
                 }
            });        
        }
        
        
        /**
        * Sets an event handler on the form submit, it will then set a cookie
        *
        */
        function _setCookieEventHandler() {
            $('#login').on('submit', function() {
                if($('#remember-me-checkbox').is(':checked')) {
                    _setUserIdCookie();
                }
            });
        }

        /**
        * Set a cookie with the user ID
        *
        */
        function _setUserIdCookie() {
            var expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 365); //365 days
            //cookies.set(_userIdCookieName,$('#username').val(), expiryDate.getDate());
            cookies.set(_userIdCookieName,$('#username').val(), { expires: 365 });
        }

        function _setUserTypeCookie(userType) {

        }
        
        function _setLanguageCookie(lang) {
//            var expiryDate = new Date();
//            expiryDate.setDate(expiryDate.getDate() + 365); //365 days
            cookies.set(_languageCookie, lang, { expires: 365 });
        }

        /**
        * Checks if the user has a cookie
        * @param string $foo
        * @return string|ExceptionObj
        *
        */
        function _checkForUserIdCookie() {
            var userId = cookies.get(_userIdCookieName);

            if(userId) {

                	$('#username').val(userId);
                    $('#password').focus();
                    $('#remember-me-checkbox').parent().addClass('checked'); //this is how icheckbox works
                    $('#remember-me-checkbox').prop('checked', true);

            }
        }

        function _checkForUserTypeCookie() {
        }

        function _bindLanuageSwitch() {
            $('.language a').on("click", function(e){
                e.preventDefault();

				//		$(this).bind('click', false); // disable

				var language = document.documentElement.lang;
				if (language == 'en') {
					language = 'fr';
				} else {
					language = 'en';
				}
			
				//console.log("Change language to: " + language);
		  
				_setLanguageCookie(language);

				window.location.href = $('#login').attr('action');

            });
		}
        
        function setCopyright() {

        	var now = new Date();
        	var start = new Date(2017, 9, 1, 00, 00, 00, 0); // Oct 1, 2017
        	
        	//console.log("now:  " + new Date());
        	//console.log("start: " + start);
        	var interval = setInterval(function(){changeCopyright(start, interval)}, 500);
        	
        	
        	/*
        	console.log("now:  " + now);
        	console.log("start: " + start);
        	if (now.getTime() >= start.getTime()) {
        		console.log("new footer is in effect");
        		document.getElementById("copyright").innerHTML = "&copy; " + now.getFullYear() + " " + labels[language]["help.footer"];
        	}
*/
        }
        
        function changeCopyright(start, interval)  {
        	var now = new Date();
        	if (now.getTime() >= start.getTime()) {
        		//console.log("new footer is in effect at: " + now);
        		document.getElementById("copyright").innerHTML = "&copy; " + now.getFullYear() + " " + labels['footer.copyright'];
//        		document.getElementById("copyright").dispatchEvent(event);
				clearInterval(interval);
        	} else {
//				clearInterval(interval);
        	}
        }        
        

    });

})();
