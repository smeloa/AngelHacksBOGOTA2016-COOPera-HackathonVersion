Template.eventCreate.onCreated(function eventCreateOnCreated() {

});

Template.eventCreate.onRendered(function eventCreateOnRendered() {
	$('#category, #city').dropdown();
});

Template.eventCreate.events({
	'submit #eventCreateForm'(event) {
     event.preventDefault();
     const target = event.target;

     const new_event = {
  		  name: target.name.value,
  			description: target.detailedDescription.value,
  			shortDescription: target.shortDescription.value,
  			category: target.category.value,
  			targetBudget: target.targetBudget.value,
  			city: target.city.value,
  			address: target.address.value,
  			scheduledDate: target.scheduledDate.value,
  			targetVolunteers: target.targetVolunteers.value,
  			contactPhone: target.contactPhone.value
      }

		Meteor.call("events.create", new_event, (error, result) => {
			if(error){
				console.log("error", error);
			}
			else{
				target.reset();
				setTimeout(function() {
						Bert.alert('El evento ha sido creado!', 'success');
				}, 750);
				FlowRouter.go("home");
			}
		});
   }
});

Template.eventCreate.helpers({
	categories() {
		return EventCategories.find();
	},
	cities() {
		return Cities.find();
	}
});
