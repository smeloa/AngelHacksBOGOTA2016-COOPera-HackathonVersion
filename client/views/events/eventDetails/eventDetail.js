Template.eventDetail.onCreated(function eventDetailOnCreated() {
	this.eventId = FlowRouter.getParam("id");
});

Template.eventDetail.onRendered(function eventDetailOnRendered() {
	$('html, body').scrollTop(0);


	this.autorun(() => {

			let event = Events.findOne(this.eventId);
			if(event){
				document.title = event.name + ' | Eventos';
				if(event.isVolunteer() && event.hasEnded() && !event.hasReview()){
					$('#reviewModal').modal('show');
				}
			}
			setTimeout(function() {
				$('.ui.rating2').rating();
				const eventSwiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					autoplay: 5000,
					observer: true
				});
			}, 1000);
	});
});

Template.eventDetail.events({
	'click #toggleLoved'(event, instance) {
		Meteor.call("events.toggleLoved", instance.eventId, function(error, result){
			if(error){
				console.log("error", error);
			}else{
				if(result){
					Bert.alert('Amamos este evento', 'success');
				}else{
					Bert.alert('Ya no amamos este evento', 'info');
				}
			}
		});
	},
	'click #becomeVolunteer'(event, instance) {
		Meteor.call("volunteers.create", instance.eventId, function(error, result){
			if(error){
				console.log("error", error);
			}
			else{
				$('#shareEventModal').modal('show');
			}
		});
	},
	'click #retireVolunteer'(event, instance) {
		Meteor.call("volunteers.delete", instance.eventId, function(error, result){
			if(error){
				console.log("error", error);
			}
		});
	},
	'click #donateButton'(event, instance) {
		event.preventDefault();
		$('#donateModal').modal('show');
	},
	'click #imageUploadButton'(event, instance) {
		event.preventDefault();
		$('#imageUploadModal').modal('show');
	},
	'submit #commentForm'(event, instance) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		const data = {
			text: event.currentTarget.text.value,
			eventId: instance.eventId
		}

		Meteor.call('event.comments.create', data, function(error, result){
			$(event.currentTarget).removeClass('loading');

			if(error){
				console.log(error);
				Bert.alert(error.reason, 'danger');
			}else{
				event.target.reset()
			}
		});
	}
});

Template.eventDetail.helpers({
	event() {
		let event = Events.findOne(Template.instance().eventId);
		if(typeof event !== "undefined"){
			$('#donationProgress').progress({
				percent: event.donationProgressCapped()
			});
		}
		return event;
	},
	pictures(){
		return EventPictures.find();
	},
	comments() {
		return EventComments.find({eventId: Template.instance().eventId},{sort:{createdAt:-1}});
	},
	canDonate(){
		if(Helpers.userIsVolunteer() || Helpers.isSponsor()){
			return true;
		}
		return false;
	}
});
