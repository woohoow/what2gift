Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  template: 'home',
  'layoutTemplate': 'layout',
});

Router.route('/contacts', {
    name: 'contacts',
    template: 'contactsList',
    layoutTemplate: 'layout',
});

Router.route('/contacts/:_id', {
    name: 'contacts_details',
    template: 'contacts_details',
    layoutTemplate: 'layout',
});


Router.route('/events', {
    name: 'events_list',
    template: 'events_list',
    layoutTemplate: 'layout',
});

Router.route('/events/:_id', {
    name: 'events_details',
    template: 'events_details',
    layoutTemplate: 'layout',
    data: function(){
        return Events.findOne({_id: this.params._id});
    }
});
