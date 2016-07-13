Template.reviewModal.onCreated(function reviewModalOnCreated() {
	this.eventId = FlowRouter.getParam("id");
});

Template.reviewModal.onRendered(function reviewModalOnRendered() {
	$('.ui.rating').rating();

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

Template.reviewModal.events({
	'submit #reviewModal'(event, instance) {
		event.preventDefault();

		const rating = $('.ui.rating').rating('get rating');

		const review = {
			eventId: Template.instance().eventId,
			text: event.target.review.value,
			rating: rating
		}

		Meteor.call("event_reviews.create", review, (error, result) => {
			if(error){
				console.log("error", error);
			}
			if(result){
				$("#reviewModal").modal('hide');
			}
		});
	}
});

Template.reviewModal.helpers({
	// helper() {
	// 	return 'miaw';
	// }
});
