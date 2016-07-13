const eventPictureStore = new FS.Store.GridFS("event-pictures", {
	maxTries: 5,
	chunkSize: 1024*1024
});

EventPictures = new FS.Collection("event-pictures", {
	stores: [eventPictureStore]
});



/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
EventPictures.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
	download() {
		return true
	}
});
