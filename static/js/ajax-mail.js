$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-messege');
	var submitButton = $(form).find('button[type="submit"]');

	function loadCaptcha() {
		$.getJSON('mail.php?captcha=1')
			.done(function(data) {
				$('#captcha-question').text(data.question);
				$('#captcha-answer').val('');
			})
			.fail(function() {
				$('#captcha-question').text('Security question unavailable. Please refresh.');
			});
	}

	loadCaptcha();

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
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
			loadCaptcha();
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
			loadCaptcha();
		})
		.always(function() {
			submitButton.prop('disabled', false).text('Send Message');
		});
	});

});
