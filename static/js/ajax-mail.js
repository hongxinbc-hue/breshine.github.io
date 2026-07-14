$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-messege');
	var submitButton = $(form).find('button[type="submit"]');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		if (!form[0].checkValidity()) {
			form[0].reportValidity();
			return;
		}

		submitButton.prop('disabled', true).text('Sending...');

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData,
			dataType: 'json',
			headers: {
				'Accept': 'application/json'
			}
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text('Thank you! Your message has been sent successfully.');

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			var message = 'Sorry, your message could not be sent. Please try again.';
			if (data.responseJSON && data.responseJSON.errors && data.responseJSON.errors.length) {
				message = data.responseJSON.errors.map(function(error) { return error.message; }).join(' ');
			}
			$(formMessages).text(message);
		})
		.always(function() {
			submitButton.prop('disabled', false).text('Send Message');
		});
	});

});
