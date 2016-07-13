Organizations = new Mongo.Collection("organizations");

const OrganizationsSchema = new SimpleSchema ({
  name: {
    type: String,
    label: "Nombre de la ONG",
    unique: true
  },
  description: {
    type: String,
    label: "Descripción de la ONG"
  },
  address: {
    type: String,
    label: "Dirección de la ONG"
  },
  phone: {
    type: Number,
    label: "Teléfono de la ONG"
  },
  url: {
    type: String,
    label: "URL de la ONG",
    optional: true
  },
  facebook: {
    type: String,
    label: "Usuario de Facebook de la ONG",
    optional: true
  },
  twitter: {
    type: String,
    label: "Usuario de Twitter de la ONG",
    optional: true
  },
  instagram: {
    type: String,
    label: "Usuario de Instagram de la ONG",
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});


Organizations.attachSchema(OrganizationsSchema);

Organizations.helpers({
	events() {
    return Events.find({organizationId:this._id},{limit:9});
	},
  eventsCount(){
    return Events.find({organizationId:this._id}).count();
  }
});
