Volunteers = new Mongo.Collection("volunteers");

const VolunteersSchema = new SimpleSchema ({
  volunteerId: {
    type: String,
    label: "Id del voluntario",
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    }
  },
  eventId: {
    type: String,
    label: "Id del evento"
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date ();
      }
    }
  }
});
