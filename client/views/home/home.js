Template.home.onCreated(function homeCreated() {

});

Template.home.onRendered((v) => {

});



Template.home.events({
	'click #volunteer': function () {
		Session.set('role', 'volunteer');

	},
	'click #organization': function () {
		Session.set('role', 'organization');

	},
	'click #sponsor': function () {
		Session.set('role', 'sponsor');

	},
});

Template.home.helpers({
	events(){
		return Events.find();
	}
});
