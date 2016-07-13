Template.shareModal.onCreated(function shareModalOnCreated() {

});

Template.shareModal.onRendered(function shareModalOnRendered() {
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



Template.shareModal.events({
	'click .facebook'(event, instance) {
		event.preventDefault();

		// TODO: share on facebook
	},
	'click .twitter'(event, instance) {
		event.preventDefault();

		let url = 'https://twitter.com/intent/tweet?';
		url 	+= 'text=Voy a asistir al evento%0D';
		url 	+= '&url=' + window.location.href;
		url 	+= '&hashtags=coopera,cooperar,ayuda, colombia';
		url 	+= '&via=' + 'coopera.co';

		window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=440,width=600');
	},
	'submit #shareEventModal'(event, instance) {
		event.preventDefault();
		$("#shareEventModal").modal('hide');
	}
});

Template.shareModal.helpers({
	// helper() {
	// 	return 'miaw';
	// }
});
