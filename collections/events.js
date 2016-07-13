Events = new Mongo.Collection('events');

/*
 * Collection schema
 *
 */
const EventSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre",
		max: 50
	},
	description: {
		type: String,
		label: "Descripción",
		max: 10000
	},
	shortDescription: {
		type: String,
		label: "Descripción",
		max: 100
	},
	category: {
		type: String,
		label: "Categoria"
	},
	targetBudget: {
		type: Number,
		label: "Presupuesto Requerido"
	},
	targetVolunteers: {
		type: Number,
		label: "Voluntarios Requeridos"
	},
	city: {
		type: String,
		label: "Ciudad"
	},
	organizationId: {
		type: String,
		label: "ID de la organizacion"
	},
	address: {
		type: String,
		label: "Dirección"
	},
	scheduledDate: {
		type: Date,
		label: "Fecha"
	},
	contactPhone: {
		type: Number,
		label: "Teléfono de Contacto"
	},
	volunteerCount: {
		type: Number,
		label: "Cantidad de voluntarios",
		autoValue() {
			if(this.isInsert){
				return 0;
			}else{
				this.unset();
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
	},
	updatedAt: {
		type: Date,
		autoValue() {
			return new Date();
		}
	}
});

Events.attachSchema(EventSchema);

/*
 * Collection fields
 * Public fields
 *
 */
Events.publicFields = {
	name: true,
	description: true,
	shortDescription: true,
	category: true,
	city: true,
	targetBudget: true,
	targetVolunteers: true,
	organizationId: true,
	address: true,
	scheduledDate: true,
	contactPhone: true,
}

/*
 * Collection fields
 * Basic fields
 *
 */
Events.basicFields = {
	name: true,
	shortDescription: true,
	category: true,
	address:true,
	city: true,
	targetBudget: true,
	organizationId: true,
	scheduledDate: true,
}


/*
 * Collection helpers
 *
 */

Events.helpers({
	isVolunteer(){
		let volunteer = Volunteers.findOne({ volunteerId: Meteor.userId(), eventId: this._id });
		if(volunteer){
			return true;
		}
		return false;
	},
	volunteersCount(){
		return Volunteers.find({ eventId: this._id }).count();
	},
	donationProgress(){
		let donations = EventDonations.find({eventId: this._id});
		let total = 0;
		donations.map((donation)=>{
			total += donation.ammount;
		})
		if(total == 0){
			return 0;
		}
		let progress = total/this.targetBudget;
		return (progress*100).toFixed(0);
	},
	donationProgressCapped(){
		let donations = EventDonations.find({eventId: this._id});
		let total = 0;
		donations.map((donation)=>{
			total += donation.ammount;
		})

		let progress = total/this.targetBudget;
		if(progress > 1){
			progress = 1;
		}
		return (progress*100).toFixed(0);
	},
	categoryData() {
		return EventCategories.findOne(this.category);
	},
	cityData() {
		return Cities.findOne(this.city);
	},
	organization(){
		return Organizations.findOne(this.organizationId);
	},
	mainImage() {
		return EventPictures.findOne({"metadata.eventId": this._id});
	},
	images() {
		return EventPictures.find({"metadata.eventId": this._id});
	},
	sponsorCount(){
		let donations = EventDonations.find({eventId:this._id}, {fields:{ sponsorId: 1 }});

		let sponsorIds = [];

		donations.map((donation)=>{
			sponsorIds.push(donation.sponsorId)
		});

		let uniqueSponsorIds = _.uniq(sponsorIds);
		return Sponsors.find({_id: {$in: uniqueSponsorIds}},{fields:{ _id: 1 }}).count();
	},
	organizationData(){
		return Organizations.findOne(this.organizationId);
	},
	hasEnded(){
		let today = new Date();
		setInterval(() => {
			 today = new Date();
		}, 60000);

		let event = Events.find({_id:this._id, scheduledDate:{ $lt: today}});
		if(event.count() > 0){
			return true
		}
		return false
	},
	hasReview(){
		let review = EventReviews.find({eventId:this._id, author:Meteor.userId()}).count();

		if(review > 0){
			return true
		}
		return false
	}
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
Events.deny({
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
