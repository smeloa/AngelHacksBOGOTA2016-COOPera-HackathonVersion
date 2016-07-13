Meteor.users.helpers({
    popularEvents() {
        return Events.find({},{sort:{volunteerCount:-1}, limit:9});
    },
    recommendedEvents(){
        const user = Meteor.user();

        if(!user){
          return 'Error'
        }

        let today = new Date();

        let bogota = Cities.findOne({name:"Bogotá"});

        let query = {};
        if (user.profile.categories && user.profile.categories.length > 0) {
            query.category = {
                $in: user.profile.categories
            };
            query.scheduledDate = {
              $gte: today
            };
            query.city = user.profile.city;
        }
        return Events.find(query, {sort:{ volunteerCount:-1, scheduledDate: 1}});
    },
    myEvents(){
      let user = Meteor.user()
      let today = new Date();
      if(Helpers.userIsVolunteer()){
  			let volunteers = Volunteers.find({ volunteerId: Meteor.userId() }, {fields: { eventId: 1 }});
  			let eventIDs = [];

  			volunteers.map((volunteer)=>{
  				eventIDs.push(volunteer.eventId);
  			})

  			let cursor = Events.find({_id: {$in: eventIDs}, scheduledDate:{	$gte: today }}, { sort: { scheduledDate:1 }}, { fields: Events.basicFields});
        return cursor;
  		}
  		else if(Helpers.isOrganization()){
  			let organizationId = user.profile.organizationId;
  			let cursor = Events.find({organizationId:organizationId, scheduledDate:{	$gte: today }}, { fields: Events.basicFields});
  			return cursor;
  		}
  		else if(Helpers.isSponsor()){
  			let sponsorId = user.profile.sponsorId;
  			let donations = EventDonations.find({sponsorId:sponsorId}, {fields:{ eventId: 1 }});
  			let eventIds = [];

  			donations.map((donation)=>{
  				eventIds.push(donation.eventId)
  			});

  			let uniqueEventIds = _.uniq(eventIds);
  			let cursor =  Events.find({_id: {$in: uniqueEventIds}, scheduledDate:{ $gte: today }},{fields: Events.basicFields });
  			return cursor;
  		}else{
        return Events.find(1);
      }
    },
    myExecutedEvents(){
      let user = Meteor.user()
      let organizationId = user.profile.organizationId;
      let cursor = Events.find({organizationId:organizationId, scheduledDate:{	$lt: today }}, { fields: Events.basicFields});
      return cursor;
    }
});
