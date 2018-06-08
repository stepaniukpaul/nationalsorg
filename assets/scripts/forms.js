'use strict';

$(document).ready(function () {

    function validateForm( ) {
        var form = document.querySelectorAll('form');

        var generateError = function (text) {
            var error = document.createElement('div');
            error.className = 'error';
            error.innerHTML = text;
            return error;
        };

        var removeValidate = function( self ) {
            var errors = self.querySelectorAll('.error');

            for ( var i = 0; i < errors.length; i++ ){
                errors[i].remove();
            }
        };

        var showValidateError = function ( html, text ) {
            html.classList.add('invalid');
            var error = generateError( text );
            html.parentElement.appendChild(error);
        };

        for ( var i = 0; i < form.length; i++ ) {
            form[i].addEventListener('submit', function (e) {
                e.preventDefault();
                var requiredForm = [].slice.call( this.querySelectorAll('.required') );

                // Delete validate

                removeValidate( this );

                // Test on empty field

                for ( var i = 0; i < requiredForm.length; i++ ){

                    requiredForm[i].classList.remove('invalid');

                    if ( !requiredForm[i].value ) {
                        showValidateError( requiredForm[i], 'Required field' );
                    }
                }

                if ( this.querySelector('.password') && this.querySelector('.passwordConfirmation') ) {
                    var password = this.querySelector('.password');
                    var passwordConfirmation = this.querySelector('.passwordConfirmation');

                    // Test on password

                    if ( password.value != passwordConfirmation.value ){
                        showValidateError( passwordConfirmation, 'Passwords does not match' );
                    }

                }

                if ( this.querySelector('.email') )  {
                    var email = this.querySelector('.email');

                    // Test email input

                    if ( email.value.indexOf('@') < 1 || email.value.indexOf('.') < 1 ){
                        showValidateError( email, 'test@test.com' );
                    }
                }

            })
        }
    }

    window.addEventListener('load', function () {
        validateForm()
    })

});