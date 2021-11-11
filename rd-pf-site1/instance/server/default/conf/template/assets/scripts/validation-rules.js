
define([
    "jquery",
],
function ($) {

    /**
     * Checks if the input only contains letters a-z 
     * @param inputValue string Input value to test
     * @return string? If an error was found the function returns a string; null otherwise.
     */
    function alpha(inputValue) {
        var regex = /[^a-zA-Z]+/;
        var result = regex.exec(inputValue);
        if(result !== null) {
            return errorMessages.alpha;
        }
        else {
            return null;
        }
    }

    /**
     * Function checks if the input does not exceed the maximum length
     * @param rule string The maxLength to be executed on the input string eg. maxLength[60]
     * @param inputValue string The input to be validated
     * @return string? If an error was found the function returns a string; null otherwise. 
     */
    function maxLength(rule, inputValue) {
        var length = parseInt(rule.split("[")[1].split("]")[0]);
        if(inputValue.length > length) {
            return errorMessages.maxLength.replace("#charCount#", length);
        }
        return null;
    }

    /**
     * Function checks if the input has minimum length
     * @param rule string The maxLength to be executed on the input string eg. maxLength[60]
     * @param inputValue string The input to be validated
     * @return string? If an error was found the function returns a string; null otherwise. 
     */
    function minLength(rule, inputValue) {
        var length = parseInt(rule.split("[")[1].split("]")[0]);
        // console.log("Validation inputValue", inputValue);
        if(inputValue.length < length) {
            var response = errorMessages.minLengthSingular.replace("#charCount#", length);
            response = length > 1 ? errorMessages.minLengthPlural.replace("#charCount#", length) : response;
            return response;
        }
        return null;
    }

    /**
     * Function checks if the user has entered a valid email
     * @param inputValue string Input to be validated
     * @return string? If an error was found the function returns a string; null otherwise. 
     */
    function email (inputValue) {
        var regex = /(.)+?@(.)+/i;
        var result = regex.exec(inputValue);
        //console.log("Validation result email", result);
        if(result === null) {
            return errorMessages.email;
        }
        else {
            return null;
        }
    }

    /**
     * Function checks if the user has entered a valid phone number 
     * @param inputValue string Input to be validated
     * @return string? If an error was found the function returns a string; null otherwise. 
     */
    function phoneNumber (inputValue) {
        inputValue = inputValue.replace(/[()\-\s]/, '');
        // console.log("input value", inputValue);
        var regex = /1?[^0-9]$/;
        var result = regex.exec(inputValue);
        if(result !== null || inputValue.length > 11) {
            return errorMessages.phoneNumber;
        }
        else {
            return null;
        }
    }

    /**
     * Function checks if the user has entered a value that is alpha numeric. Has no special characters 
     * @param inputValue string Input to be validated
     * @return string? If an error was found the function returns a string; null otherwise. 
     */
    function alphaNumeric (inputValue) {
        var regex = /[^a-zA-Z0-9]+/i;
        var result = regex.exec(inputValue);
        if(result !== null) {
            return errorMessages.alphaNumeric;
        }
        else {
            return null;
        }
    }

    /**
     * Function checks if the user has entered a value that is alpha numeric. Has no special characters 
     * @param inputValue string Input to be validated
     * @return string? If an error was found the function returns a string; null otherwise. 
     */
    function requiredField (inputValue) {
        if(inputValue !== true) {
            return errorMessages.requiredField;
        }
        else {
            return null;
        }
    }

    return {
        /**
         * Function is the "router" for which navigation rule to execute
         * @param rule string The validation rule to execute eg: maxLength[40]
         * @param inputValue string The value inputted by the user
         * @return string? Null on valid input, error message string otherwise.
         */
        processValidationRule : function(rule, inputValue) {
            // console.log("Validation rule", rule);
            if(rule == "alpha") {
                return alpha(inputValue);
            }
            else if(rule.indexOf("maxLength") === 0) {
                return maxLength(rule, inputValue);
            }
            else if(rule.indexOf("minLength") === 0) {
                return minLength(rule, inputValue);
            }
            else if(rule == "email") {
                return email(inputValue);
            }
            else if(rule == "phoneNumber") {
                return phoneNumber(inputValue);
            }
            else if(rule == "alphaNumeric") {
                return alphaNumeric(inputValue);
                }
            else if(rule == "requiredField") {
                return requiredField(inputValue);
            }
            return null;
        }
    };
});