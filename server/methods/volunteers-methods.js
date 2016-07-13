// Volunteers Methods
Meteor.methods({
  'volunteers.create'(eventId){
    check(eventId, String);
    let event = Events.findOne(eventId);

    let count = event.volunteerCount + 1;

    Events.update(eventId,{
        $set: {
          volunteerCount: count
        }
    },{
      bypassCollection2:true
    });

    Volunteers.insert({ eventId: eventId, volunteerId: Meteor.userId() });
  },
  'volunteers.update'(objectId, data){
    Volunteers.update({_id: objectId}, {$set: data});
  },
  'volunteers.delete'(eventId){
    let event = Events.findOne(eventId);
    let count = event.volunteerCount - 1;

    Events.update(eventId,{
        $set: {
          volunteerCount: count
        }
    },{
      bypassCollection2:true
    });
    
    Volunteers.remove({ eventId: eventId, volunteerId: Meteor.userId() });
  }
});
