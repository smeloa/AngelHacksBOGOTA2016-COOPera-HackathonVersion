// Sponsors Methods
Meteor.methods({
  'sponsors.create'(data){
    check(data, Object);
    return Sponsors.insert(data);
  },
  'sponsors.update'(objectId, data){
    check(data, Object);
    check(objectId, String);
    return Sponsors.update({_id: objectId}, {$set: data});
  },
  'sponsors.delete'(objectId){
    check(objectId, String);
    return Sponsors.remove(objectId);
  }
});
