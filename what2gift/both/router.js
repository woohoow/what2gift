Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });
});

Router.route('/contacts', {
    name: 'contacts',
    template: 'contactsList',
    layoutTemplate: 'layout',
});

Router.route('/events', {
    name: 'events',
    template: 'eventsList',
    layoutTemplate: 'layout',
});
