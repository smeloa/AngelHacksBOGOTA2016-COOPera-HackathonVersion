EventReviews = new Mongo.Collection('event-reviews');


/*
* Collection schema
*
*/
const EventReviewsSchema = new SimpleSchema({
	text: {
		type: String,
		label: "Comentario",
		max: 500,
		optional:true
	},
	eventId: {
		type: String,
		label: "Id del Evento"
	},
	rating:{
		type: Number,
		label: "Star Rating del evento"
	},
	userId: {
		type: String,
		label: 'Usuario',
		autoValue() {
			if(this.isInsert){
				return this.userId;
			}
		}
	},
	createdAt: {
		type: Date,
		autoValue() {
			if(this.isInsert){
				return new Date();
			}else{
				this.unset();
			}
		}
	}
});

EventReviews.attachSchema(EventReviewsSchema);

/*
* Collection fields
* Public fields
*
*/
EventReviews.publicFields = {
	name: true,
}


/*
* Collection helpers
*
*/
EventReviews.helpers({
	// user() {
	// 	return Meteor.users.findOne(this.userId);
	// },
});


/*
* Collection permissions
* Deny all actions on client-side
*
*/
EventReviews.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
