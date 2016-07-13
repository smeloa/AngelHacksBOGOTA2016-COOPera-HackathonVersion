Template.loginModal.onCreated(function loginOnCreated() {

});

Template.loginModal.onRendered(function loginOnRendered() {
	$(this.firstNode).modal({
		detachable: false,
		observeChanges: true,
		onApprove() {
			return false;
		},
		onHidden() {
			return true;
		}
	});
});

Template.loginModal.events({
	'submit #loginForm' (event) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		const email = event.target.email.value;
		const password = event.target.password.value;

		Meteor.loginWithPassword(email, password, function(error) {
			$(event.currentTarget).removeClass('loading');

			if (error) {
				Bert.alert('Correo o contraseña incorrectas', 'danger');
			} else {
				FlowRouter.go("myEvents")
				$('#loginModal').modal('hide');
			}
		});
	},
});

Template.loginModal.helpers({

});
