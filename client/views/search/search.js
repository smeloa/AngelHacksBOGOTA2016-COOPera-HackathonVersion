Template.search.onCreated(function searchOnCreated() {
    this.search = new ReactiveVar(null);
    this.category = new ReactiveVar(null);
    this.city = new ReactiveVar(null);
    this.organization = new ReactiveVar(null);
    this.limit = new ReactiveVar(9);
});

Template.search.onRendered(function searchOnRendered() {
	$('#categoryId, #cityId, #organizationId').dropdown({
		placeholder:false
	});
});

Template.search.events({
    'keyup .search' (event, instance) {
        Template.instance().search.set(event.currentTarget.value);
    },
    'click .more' (event, instance) {
        let limit = Template.instance().limit.get() + 6;
        Template.instance().limit.set(limit);
    },
    'change #cityId' (event, instance) {
        Template.instance().city.set(event.currentTarget.value);
    },
    'change #categoryId' (event, instance) {
        Template.instance().category.set(event.currentTarget.value);
    },
    'change #organizationId' (event, instance) {
        Template.instance().organization.set(event.currentTarget.value);
    }
});

Template.search.helpers({
	events() {
    let city = Template.instance().city.get();
    let category = Template.instance().category.get();
    let organization = Template.instance().organization.get();
    let limit = Template.instance().limit.get();
    let searchCriteria = Template.instance().search.get();

    if (searchCriteria == null)
      searchCriteria = '';

    if (category == null)
        category = '';

    if (city == null)
        city = '';

    if (organization == null)
      organization = '';

    let events = Events.find({
			$and:[
				{'city': {'$regex': '.*' + city || '' + '.*', '$options' : 'i' }},
				{'category': {'$regex': '.*' + category || '' + '.*', '$options' : 'i' }},
        {'organizationId': {'$regex': '.*' + organization || '' + '.*', '$options' : 'i' }},
				{
					$or: [
					{'name': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
					{'description': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }}
				]
				}
			]
    },{
			limit: limit
		}, { fields: Events.basicFields});
		return events;
	},
	eventsCount(){
    let city = Template.instance().city.get();
    let category = Template.instance().category.get();
    let organization = Template.instance().organization.get();
    let limit = Template.instance().limit.get();
    let searchCriteria = Template.instance().search.get();

    if (searchCriteria == null)
      searchCriteria = '';

    if (category == null)
        category = '';

    if (city == null)
        city = '';

    if (organization == null)
      organization = '';

    let events = Events.find({
      $and:[
        {'city': {'$regex': '.*' + city || '' + '.*', '$options' : 'i' }},
        {'category': {'$regex': '.*' + category || '' + '.*', '$options' : 'i' }},
        {'organizationId': {'$regex': '.*' + organization || '' + '.*', '$options' : 'i' }},
        {
          $or: [
          {'name': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
          {'description': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }}
        ]
        }
      ]
    }, { fields: Events.basicFields});
    return events.count();
	},
	categories() {
		return EventCategories.find();
	},
	cities() {
		return Cities.find();
	},
  organizations() {
    return Organizations.find();
  },
  remainingEvents(){
    let city = Template.instance().city.get();
    let category = Template.instance().category.get();
    let limit = Template.instance().limit.get();
    let organization = Template.instance().organization.get();
    let searchCriteria = Template.instance().search.get();

    if (searchCriteria == null)
      searchCriteria = '';

    if (category == null)
        category = '';

    if (city == null)
        city = '';

    if (organization == null)
      organization = '';

    let events = Events.find({
      $and:[
        {'city': {'$regex': '.*' + city || '' + '.*', '$options' : 'i' }},
        {'category': {'$regex': '.*' + category || '' + '.*', '$options' : 'i' }},
        {'organizationId': {'$regex': '.*' + organization || '' + '.*', '$options' : 'i' }},
        {
          $or: [
          {'name': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
          {'description': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }}
        ]
        }
      ]
    },{
			limit: limit
		}, { fields: Events.basicFields});

    let events2 = Events.find({
      $and:[
        {'city': {'$regex': '.*' + city || '' + '.*', '$options' : 'i' }},
        {'category': {'$regex': '.*' + category || '' + '.*', '$options' : 'i' }},
        {'organizationId': {'$regex': '.*' + organization || '' + '.*', '$options' : 'i' }},
        {
          $or: [
          {'name': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
          {'description': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }}
        ]
        }
      ]
    }, { fields: Events.basicFields});
		return events2.count() > events.count();
	},
});
