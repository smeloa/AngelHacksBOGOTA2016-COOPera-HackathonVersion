Template.NavBar.events({
	'click .login'(event){
		event.preventDefault();
		$('#loginModal').modal('show');
	},
	'click .logout'(event){
		Meteor.logout(function(err, result){
			if(err){
				console.log(err);
			}
			else{
				FlowRouter.go('home');

			}
		});
		setTimeout(function(){
			Bert.alert('Esperamos volver a verte muy pronto', 'success');
		}, 750);
	}
});

Template.NavBar.helpers({
	isSelectedItem(name) {
		if(FlowRouter.getRouteName() == name){
			return 'active';
		}
		return null;
	}
});
