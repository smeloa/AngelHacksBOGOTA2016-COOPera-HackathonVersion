Template.myEvents.onCreated(function myEventsOnCreated() {
	this.segment1 = new ReactiveVar();
	this.segment2 = new ReactiveVar();
	const user = Meteor.user();
	if(user){
		if(user.myEvents().count() > 0){
			this.segment1 = new ReactiveVar(true);
		}
		else{
			this.segment2 = new ReactiveVar(false);
		}
	}
});

Template.myEvents.onRendered(function myEventsOnRendered() {

});

Template.myEvents.events({
	'click #segment1'(event, instance) {
		Template.instance().segment1.set(true);
		Template.instance().segment2.set(false);
		$("#segment1").addClass("active-link");
		$("#segment2").removeClass("active-link");
	},
	'click #segment2'(event, instance) {
		Template.instance().segment1.set(false);
		Template.instance().segment2.set(true);
		$("#segment1").removeClass("active-link");
		$("#segment2").addClass("active-link");
	}
});

Template.myEvents.helpers({
	my_events(){
		const user = Meteor.user();
		if(user){
			return user.myEvents();
		}
	},
	my_popular_events(){
		const user = Meteor.user();
		if(user){
			return user.popularEvents();
		}
	},
	my_popular_events_count(){
		const user = Meteor.user();
		if(user){
			return user.popularEvents().count();
		}
	},
	my_events_count(){
		const user = Meteor.user();
		if(user){
			return user.myEvents().count();
		}
	},
	next_event(){
		return Events.findOne();
	},
	recommendedEvents(){
		const user = Meteor.user();
		if(user){
			return user.recommendedEvents();
		}
	},
	recommendedEventsCount(){
		const user = Meteor.user();
		if(user){
			return user.recommendedEvents().count();
		}
	},
	myExecutedEvents(){
		const user = Meteor.user();
		if(user){
			return user.myExecutedEvents();
		}
	},
	myExecutedEventsCount(){
		const user = Meteor.user();
		if(user){
			return user.myExecutedEvents().count();
		}
	},
	hasEvents(){
		const user = Meteor.user();
		if(user){
			if(user.myEvents().count() > 0){
				return false;
			}
			else{
				return true;
			}
		}
	},
	segment1(){
		return Template.instance().segment1.get();
	},
	segment2(){
		return Template.instance().segment2.get();
	}
});
