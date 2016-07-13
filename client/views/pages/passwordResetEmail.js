Template.passwordResetEmail.onRendered(function passwordResetEmailOnRendered(){
	$('#resetPasswordEmailForm').form({
		on: 'submit',
		inline: true,
		fields: {
			email: {
				identifier: 'email',
				rules: [
					{
						type   : 'email',
						prompt : 'Tu correo electrónico es invalido.'
					},
					{
						type   : 'empty',
						prompt : 'Ingresa tu correo electrónico.'
					}
				]
			},
		},
	});
});



Template.passwordResetEmail.events({
	'submit #resetPasswordEmailForm'(event) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		const email = event.target.email.value;

		Accounts.forgotPassword({email}, function(error) {
			$(event.currentTarget).removeClass('loading');

			if(error){
				if(error.message === 'User not found [403]'){
					Bert.alert('Verifica tu correo electrónico.', 'danger');
				}else{
					console.log(error);
					Bert.alert('Encontramos un error al enviar el correo.', 'danger');
				}
			}else{
				FlowRouter.go('login');
				Bert.alert('Correo para restablecer contraseña enviado.', 'success');
			}
		});
	}
});
