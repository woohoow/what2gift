Router.configure({
  layoutTemplate: 'layout'
});

// https://github.com/meteor-useraccounts/core/issues/192
AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    layoutTemplate: 'layout',
    redirect: 'home',
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');

Router.route('/logout', {
    name: 'logout',
    // template: 'login',
    onBeforeAction: function() {
        //https://github.com/meteor-useraccounts/core/blob/master/Guide.md#accountstemplateslogout
        AccountsTemplates.logout();
        this.next();
    }
});

Router.route('/', {
  name: 'home',
  template: 'home',
  'layoutTemplate': 'layout',
});

Router.route('/contacts', {
    name: 'contacts_list',
    template: 'contacts_list',
    layoutTemplate: 'layout',
});

Router.route('/contacts/:name', {
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

Router.plugin('ensureSignedIn', {
    //only: ['events_list','events_details','contacts_list','contacts_details']
    except: _.pluck(AccountsTemplates.routes, 'name').concat(
        ['home'])
});
