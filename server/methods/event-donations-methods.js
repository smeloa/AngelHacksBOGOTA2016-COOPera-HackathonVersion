// Event Donations Methods
Meteor.methods({
  'event_donations.create'(data){
    check(data, Object);
    const user = Meteor.users.findOne({_id: this.userId});

    if(user.profile.type == "volunteer"){
      data.type = "volunteer";
    }else{
      let sponsorId = user.profile.sponsorId;
      data.sponsorId = sponsorId;
      data.type = "sponsor";
    }

    EventDonations.insert(data);
  },
  'event_donations.update'(objectId, data){
    check(data, Object);
    check(objectId, String);
    EventDonations.update({_id: objectId}, {$set: data});
  },
  'event_donations.delete'(objectId){
    check(objectId, String);
    EventDonations.remove(objectId);
  }
});
