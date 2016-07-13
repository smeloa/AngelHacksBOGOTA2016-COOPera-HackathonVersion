Meteor.methods({
  'event_reviews.create'(review){
    return EventReviews.insert(review);
  }
})
