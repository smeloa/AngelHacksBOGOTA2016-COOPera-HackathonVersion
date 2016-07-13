Meteor.methods({
  'event.comments.create'(data){
    check(data, Object);
    EventComments.insert(data);
  },
  // 'event.comments.update'(objectId, data){
  //   check(data, Object);
  //   check(objectId, String);
  //   EventComments.update({_id: objectId}, {$set: data});
  // },
  'event.comments.delete'(objectId){
    check(objectId, String);
    EventComments.remove(objectId);
  }
})
