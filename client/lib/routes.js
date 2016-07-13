FlowRouter.route('/', {
	name: 'home',
	title: 'Inicio',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "myEvents"});
		} else {
			BlazeLayout.render("Layout", {content: "home"});
		}
	}
});

FlowRouter.route('/search', {
	name: 'search',
	title: 'Buscar eventos',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "search"});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/events/create', {
	name: 'eventCreate',
	title: 'Crear evento',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "eventCreate"});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/events/:id/edit', {
	name: 'eventEdit',
	title: 'Editar evento',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "eventEdit", id:params.id});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/events/:id', {
	name: 'eventDetail',
	title: 'Event name cant go here - goes in onCreated view event',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "eventDetail", id:params.id});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/my-events', {
	name: 'myEvents',
	title: 'Mis eventos',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "myEvents"});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/organizations/:id', {
	name: 'organizationDetail',
	title: 'Organizacion',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Layout", {content: "organizationDetail", id:params.id});
		}else{
			FlowRouter.go("home")
		}
	}
});


/**
 * Admin section
 *
 */
const adminSection = FlowRouter.group({
    prefix: "/admin"
});

/**
 * Login routes
 *
 */
FlowRouter.route( '/verify-email/:token', {
	name: 'verify-email',
	action(params) {
		Accounts.verifyEmail(params.token, (error) => {
			if(error){
				console.log(error.reason);
				Bert.alert('Se produjo un error al verificar tu cuenta.', 'danger');
			}else{
				FlowRouter.go('/');
				Bert.alert('Gracias por verificar tu cuenta.', 'success');
			}
		});
	}
});

FlowRouter.route( '/register', {
	name: 'register',
	title: 'Registrate',
	triggersEnter: [onlyGuest],
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Layout", {content: "register"});
	}
});

FlowRouter.route( '/reset-password', {
	name: 'reset-password-email',
	title: 'Olvide mi contraseña',
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Layout", {content: "passwordResetEmail"});
	}
});

FlowRouter.route( '/reset-password/:token', {
	name: 'reset-password',
	title: 'Cambiar contraseña',
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Layout", {content: "passwordReset"});
	}
});

/**
 * Set action for not found routes
 * Render a 404 page not found view
 */
FlowRouter.notFound = {
	action() {
		BlazeLayout.render("Layout", {content: "notFound"});
	}
};



/**
 * Add global onEnter triggers
 *
 */
FlowRouter.triggers.enter([setTitle]);

function setTitle(context, redirect) {
	document.title = FlowRouter.current().route.options.title + ' | Your new app global title';
}




function onlyGuest(context, redirect) {
	if(Meteor.loggingIn() || Meteor.userId()){
		redirect('home');
	}
}

function onlyDesktop(context, redirect) {
	const ua        = navigator.userAgent.toLowerCase();
	const isMobile  = ua.indexOf("mobile") > -1;

	if(isMobile){
		redirect('downloadAPP');
	}
}
