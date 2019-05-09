// import $ from 'jquery';
class ContactForm {
    
    constructor(nav) {
        this.navigation = nav;
    }

    initContactForm() {
        var _self = this;

        $('#contact-submit').on( "click", function(e) {
            e.preventDefault();
            $( "#contact-form" ).submit();
        });

        $("#contact-form").submit(function(e) {
            e.preventDefault();
            let isBtnDisabled = $('#contact-submit').hasClass('btn-site--disabled');
            if (isBtnDisabled) {
                return;
            }

            $('#contact-submit').addClass('btn-site--disabled');
            $('#contact-submit .btn-caption').hide();
            $('#contact-submit .spinner').show();
    
            var inputElements = $("#contact-form").find('input, textarea, select');
            var formValues = {};
    
            inputElements.each(function() {
                if (this.name) {
                    if (this.type == "checkbox" || this.type == "radio") {
                        if (this.checked) {
                            formValues[this.name] = this.value;
                        }
                    }else {
                        formValues[this.name] = this.value;
                    }
                }
            });
            
            // console.log("formValues : " + JSON.stringify(formValues));
            
            $.ajax({
                url: "./assets/php/contactform.php",
                method: "POST",
                data: formValues,
                success: function(result) {
                    // console.log("AJAX post result result : " + JSON.stringify(result));
                    $('div[data-error-id]').text("");
                    $('div[data-error-id="contact-result"]').text("");
    
                    if (Object.keys(result.errors).length > 0) {
                        for (var inputName in result.errors) {
                            // console.log("error in " + inputName + ": " + result.errors[inputName]);
                            $('div[data-error-id="' + inputName + '"]').text(result.errors[inputName]).hide().slideDown();
                        }
                        grecaptcha.reset();
                    }else {
                        // console.log("Success");
                        $('div[data-error-id="contact-result"]').text("Thank you. Your message has been sent.");
                        $('div[data-error-id="contact-result"]').removeClass('site-form--danger').addClass('site-form--success');
                        
                        $('div[data-error-id="contact-result"]').slideDown().delay(4000).slideUp().promise().done(function() { 
                            // console.log('resetting...');
                            $('#contact-form input').val("");
                            $('#contact-form textarea').val("");
                            grecaptcha.reset();
                            $('#contact-form label').removeClass('site-form__label--activated');
                        });
                    }
                    
                    _self.navigation.updateGrid();

                    setTimeout(()=>{
                        $('#contact-submit').removeClass('btn-site--disabled');
                        $('#contact-submit .btn-caption').show();
                        $('#contact-submit .spinner').hide();
                    },1000);   
                },
                error: function(jqXHR, textStatus) {
                    console.log(jqXHR);
                    console.log( "Request failed: " + textStatus );
                    grecaptcha.reset();
                    $('div[data-error-id="contact-result"]').removeClass('alert-success');
                    $('div[data-error-id="contact-result"]').addClass('alert-danger');
                    $('div[data-error-id="contact-result"]').text("Sorry... Your message could not have been delivered.");
                    $('div[data-error-id="contact-result"]').slideDown().delay(4000).slideUp();

                    _self.navigation.updateGrid();

                    setTimeout(()=>{
                        $('#contact-submit').removeClass('btn-site--disabled');
                        $('#contact-submit .btn-caption').show();
                        $('#contact-submit .spinner').hide();
                    },1000);                    
                }
                
            });  // the end of ajax call to post formValues
        }); // the end of form submit function

    }
    
};

export default ContactForm;