Template.eventCard.onCreated(function eventCardOnCreated() {

});

Template.eventCard.onRendered(function eventCardOnRendered() {
});

Template.eventCard.events({
	'click .card'(event, instance) {
		FlowRouter.go("eventDetail", { id: this._id })
	}
});

Template.eventCard.helpers({
	date() {
		return moment(this.scheduledDate).format("DD/MM/YYYY")
	},
	progress(){
		$('#donationProgress' + this._id).progress({
			percent: this.donationProgressCapped()
		});
	}
});
