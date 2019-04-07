import $ from 'jquery';
class ReservationForm {
    
    initReservationForm() {

        $('#reservation-submit').on( "click", function(e) {
            e.preventDefault();
            $( "#reservation-form" ).submit();
        });

        $("#reservation-form").submit(function(e) {
            e.preventDefault();
            
            $('#reservation-submit .btn-caption').hide();
            $('#reservation-submit .spinner').show();
    
            var inputElements = $("#reservation-form").find('input, textarea, select');
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
                url: "./assets/php/reservationform.php",
                method: "POST",
                data: formValues,
                success: function(result) {
                    console.log("AJAX post result result : " + JSON.stringify(result));
                    $('#reservation-form div[data-error-id]').text("");
                    $('div[data-error-id="reservation-result"]').text("");
    
                    if (Object.keys(result.errors).length > 0) {
                        for (var inputName in result.errors) {
                            console.log("error in " + inputName + ": " + result.errors[inputName]);
                            $('div[data-error-id="' + inputName + '"]').text(result.errors[inputName]).hide().slideDown();
                        }
                        // grecaptcha.reset();
                    }else {
                        // console.log("Success");
                        $('div[data-error-id="reservation-result"]').text("Thank you. Your message has been sent.");
                        $('div[data-error-id="reservation-result"]').removeClass('site-form--danger').addClass('site-form--success');
                        
                        $('div[data-error-id="reservation-result"]').slideDown().delay(4000).slideUp().promise().done(function() { 
                            console.log('resetting form...');
                            $('#reservation-form input').val("");
                            $('#reservation-form textarea').val("");
                            grecaptcha.reset();
                            $('#reservation-form label').removeClass('site-form__label--activated');
                        });
                    }
                    $('#reservation-submit .btn-caption').show();
                    $('#reservation-submit .spinner').hide();
                },
                error: function(jqXHR, textStatus) {
                    console.log(jqXHR);
                    console.log( "Request failed: " + textStatus );
                    // grecaptcha.reset();
                    $('div[data-error-id="reservation-result"]').removeClass('alert-success');
                    $('div[data-error-id="reservation-result"]').addClass('alert-danger');
                    $('div[data-error-id="reservation-result"]').text("Sorry... Your message could not have been delivered.");
                    $('div[data-error-id="reservation-result"]').slideDown().delay(4000).slideUp();
                    $('#reservation-submit .btn-caption').show();
                    $('#reservation-submit .spinner').hide();
                    
                }
                
            });  // the end of ajax call to post formValues
        }); // the end of form submit function

    }
    
};

export default ReservationForm;