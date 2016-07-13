// Event Categories Methods
Meteor.methods({
  'event_categories.create'(categories){
    Meteor.users.update(this.userId,{
      $set:{
          'profile.categories': categories
      }
    },{
      bypassCollection2:true
    });
  }
});
