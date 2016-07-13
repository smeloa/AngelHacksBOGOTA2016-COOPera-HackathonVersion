Template.organizationDetail.onCreated(function organizationDetailOnCreated() {
	this.organizationId = FlowRouter.getParam("id");
});

Template.organizationDetail.onRendered(function organizationDetailOnRendered() {

});

Template.organizationDetail.events({
	// 'click .class'(event, instance) {
	// }
});

Template.organizationDetail.helpers({
	organization() {
		return Organizations.findOne(Template.instance().organizationId);
	}
});
