// Organizations Methods
Meteor.methods({
  'organizations.create'(data){
    check(data, Object);
    return Organizations.insert(data);
  },
  'organizations.update'(objectId, data){
    check(data, Object);
    check(objectId, String);
    return Organizations.update({_id: objectId}, {$set: data});
  },
  'organizations.delete'(objectId){
    check(objectId, String);
    return Organizations.remove(objectId);
  }
});
