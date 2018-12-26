import $ from 'jquery';

class ContactForm {
    
    initContactForm() {

        $('#contact-submit').on( "click", function(e) {
            e.preventDefault();
            console.log("click event: #contact-submit button")
            $( "#contact-form" ).submit();
        });

        $("#contact-form").submit(function(e) {
            e.preventDefault();
    
            console.log("Form submitted listener called");
    
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
            
            console.log("formValues : " + JSON.stringify(formValues));
            
            $.ajax({
                url: "assets/php/handlecontactform.php",
                method: "POST",
                data: formValues,
                success: function(result) {
    
                    console.log("AJAX post result result : " + JSON.stringify(result));
    
                    //$('div[data-error-id]').text("");
                    //$("#send-result").text("");
    
                    if (Object.keys(result.errors).length > 0) {
                        for (var inputName in result.errors) {
                            console.log("error in " + inputName + ": " + result.errors[inputName]);
    
                            $('div[data-error-id="' + inputName + '"]').text(result.errors[inputName]).hide().slideDown();
                        }
                    }else {
                        console.log("Success");
                        $('div[data-error-id="result"]').text("Thank you. Your message has been sent.");
                        $('div[data-error-id="result"]').removeClass('alert-danger').addClass('alert-success');
                        
                        $('div[data-error-id="result"]').slideDown().delay(4000).slideUp().promise().done(function() { 
                            $('#contact-form input').val("");
                            $('#contact-form textarea').val("");
                            grecaptcha.reset();
                        });
                    }
                },
                error: function() { 
                    $('div[data-error-id="result"]').removeClass('alert-success');
                    $('div[data-error-id="result"]').addClass('alert-danger');
                    $('div[data-error-id="result"]').text("Sorry... Your message could not have been delivered.");
                    $('div[data-error-id="result"]').slideDown().delay(4000).slideUp();
                    //alert("Formulář se nepodařilo odeslat");
                }
                
            });  // the end of ajax call to post formValues
        }); // the end of form submit function

    }
    
};

export default ContactForm;