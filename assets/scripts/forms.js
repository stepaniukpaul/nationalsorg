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

        /*
        *На сообщение об ошибке вешается .invalid
        * Если checkbox || radio .invalid вешаеться на родителя .group-required
         */
        var showValidateError = function ( html, text ) {
            html.classList.add('invalid');
            var error = generateError( text );
            html.parentElement.appendChild(error);
        };

        /*
        *Поиск форм происходит по классу .required, только их валидатор будет просматривать
         */

        for ( var i = 0; i < form.length; i++ ) {
            form[i].addEventListener('submit', function (e) {
                e.preventDefault();
                var submit = true;

                var requiredForm = [].slice.call( this.querySelectorAll('.required') );

                // Delete validate

                removeValidate( this );

                // Test on empty field

                for ( var i = 0; i < requiredForm.length; i++ ){

                    requiredForm[i].classList.remove('invalid');

                    if ( !requiredForm[i].value ) {
                        showValidateError( requiredForm[i], 'Required field' );
                        submit = false;
                    }
                }

                /*
                *Если есть форма паспорта и повторения паспорта
                * На форме паспорта должен быть .password
                * На форме повторения паспорта .passwordConfirmation
                 */

                if ( this.querySelector('.password') && this.querySelector('.passwordConfirmation') ) {
                    var password = this.querySelector('.password');
                    var passwordConfirmation = this.querySelector('.passwordConfirmation');

                    // Test on password

                    if ( password.value != passwordConfirmation.value ){
                        showValidateError( passwordConfirmation, 'Passwords does not match' );
                        submit = false;
                    }

                }

                /*
                * Если есть форма почты
                * На форме почты должен быть .email
                 */

                if ( this.querySelector('.email') )  {
                    var email = this.querySelector('.email');

                    // Test email input

                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if ( !re.test(String(email.value).toLowerCase()) ){
                        showValidateError( email, 'test@test.com' );
                        submit = false;
                    }
                }

                /*
                * Если есть форма checkbox
                * На родители формы должен быть .checkbox-group.group-required
                 */

                if ( this.querySelector( 'input[type=checkbox]' ) ){

                    // Test checkbox group

                    var checkboxGroupArr = [].slice.call( this.querySelectorAll( '.checkbox-group.group-required' ) );

                    for ( var i = 0; i < checkboxGroupArr.length; i++ ) {
                        var key = false;
                        var checkboxArr = [].slice.call( checkboxGroupArr[i].querySelectorAll('input[type=checkbox]') );

                        checkboxArr.forEach( function (elem) {
                            if ( elem.checked ){
                                key = true;
                            }
                        } );

                        if ( !key ){
                            showValidateError( checkboxGroupArr[i], 'Required field' );
                            submit = false;
                        }

                    }
                }

                /*
                * Если есть форма radio
                * На родители формы должен быть .radio-group.group-required
                 */

                if ( this.querySelector( 'input[type=radio]' ) ){

                    // Test radio group

                    var radioGroupArr = [].slice.call( this.querySelectorAll( '.radio-group.group-required' ) );

                    for ( var i = 0; i < radioGroupArr.length; i++ ) {
                        var key = false;
                        var radioArr = [].slice.call( radioGroupArr[i].querySelectorAll('input[type=radio]') );

                        radioArr.forEach( function (elem) {
                            if ( elem.checked ){
                                key = true;
                            }
                        } );

                        if ( !key ){
                            showValidateError( radioGroupArr[i], 'Required field' );
                            submit = false;
                        }

                    }
                }

                if ( submit ) this.submit();
            })
        }
    }

    window.addEventListener('load', function () {
        validateForm()
    })

});