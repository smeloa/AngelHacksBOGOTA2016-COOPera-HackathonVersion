Template.eventEdit.onCreated(function eventEditOnCreated() {
	this.id = FlowRouter.getParam("id");
});

Template.eventEdit.onRendered(function eventEditOnRendered() {
	this.autorun((v) => {
			$('#category, #city').dropdown();
	});
});

Template.eventEdit.events({
	'submit #eventEditForm'(event) {
     // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
   const target = event.target;
   const id = Template.instance().id;
   const event_data = {
       name: target.name.value,
			 description: target.detailedDescription.value,
			 shortDescription: target.shortDescription.value,
       category: target.category.value,
       targetBudget: target.targetBudget.value,
       city: target.city.value,
       address: target.address.value,
       scheduledDate: moment(target.scheduledDate.value).startOf('day').format(),
       targetVolunteers: target.targetVolunteers.value,
       contactPhone: target.contactPhone.value
   }

		Meteor.call("events.update", id, event_data, (error, result) => {
			if(error){
				console.log("error", error);
			}
			else{
				target.reset();
				setTimeout(function() {
						Bert.alert('El evento ha sido actualizado!', 'success');
				}, 750);
				FlowRouter.go("eventDetail", { id: id } );
			}
		});

	},
	'click .delete'(event) {
		event.preventDefault();
		const id = Template.instance().id;
		Meteor.call("events.delete", id, function(error, result){
			if(error){
				console.log("error", error);
			}
			else{
				setTimeout(function() {
						Bert.alert('El evento ha sido eliminado!', 'danger');
				}, 750);
				FlowRouter.go("home");
			}
		});
	}
});

Template.eventEdit.helpers({
	event(){
		return Events.findOne();
	},
	categories() {
		return EventCategories.find();
	},
	cities() {
		return Cities.find();
	},
	selectedCategory(c) {
    if(Events.findOne().category === c) {
      return "selected";
    }
  },
	selectedCity(c) {
    if(Events.findOne().city === c) {
      return "selected";
    }
  }
});
