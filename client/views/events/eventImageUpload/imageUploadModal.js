Template.imageUploadModal.onCreated(function imageUploadModalOnCreated() {
	this.id = FlowRouter.getParam("id");
});

Template.imageUploadModal.onRendered(function imageUploadModalOnRendered() {
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

Template.imageUploadModal.events({
	'change .myFileInput': function(event, template) {
		event.preventDefault();
		let file = $('.myFileInput').get(0).files[0];
		let reader = new FileReader();
		reader.onload = function (e) {
			$('#image-preview').attr('src', e.target.result);
		}
		reader.readAsDataURL(file);
	},
	'submit #imageUploadForm': function(event, template) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		let file = $('.myFileInput').get(0).files[0];
		let newFile = new FS.File(file);

		newFile.metadata = {
			eventId: Template.instance().id,
			author: Meteor.userId()
		};

		let fileObj = EventPictures.insert(newFile, (err, fileObj) => {
			$(event.currentTarget).removeClass('loading');

			if(err){
				console.log(err);
			}
			else{
				event.target.reset();
				$("#imageUploadModal").modal('hide');
			}
		});
	}
});

Template.imageUploadModal.helpers({

});
