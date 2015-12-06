FlowRouter.route('/', {
    name: 'home',
    // calls just before the action
    // triggersEnter: [trackRouteEntry],

    action: function(params, queryParams){
        BlazeLayout.render("layout", {
            headerTitle: 'header_title',
            headerButtonRight: '', //'',
            headerButtonLeft: '',
            content: 'home'
        });
    },
    // calls when when we decide to move to another route
    // but calls before the next route started
    // triggersExit: [trackRouteClose]
});

// https://github.com/meteor-useraccounts/core/issues/192
AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    redirect: 'home',
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');

FlowRouter.route('/logout', {
    name: 'logout',
    action: AccountsTemplates.logout
});

FlowRouter.route('/contacts', {
    name: 'contacts_list',
    action: function(params, queryParams){
        BlazeLayout.render("layout", {
            headerTitle: 'header_title',
            headerButtonRight: '', //'',
            headerButtonLeft: '',
            content: 'contacts_list',
        });
    },
});

FlowRouter.route('/contacts/:name', {
    name: 'contacts_details',
    action: function(params, queryParams){
        BlazeLayout.render("layout", {
            headerTitle: 'header_title',
            headerButtonRight: '', //'',
            headerButtonLeft: '',
            content: 'contacts_details',
        });
    },
});


FlowRouter.route('/events', {
    name: 'events_list',
    action: function(params, queryParams){
        BlazeLayout.render("layout", {
            headerTitle: 'header_title',
            headerButtonRight: '', //'',
            headerButtonLeft: '',
            content: 'events_list',
        });
    },
});

FlowRouter.route('/events/:_id', {
    name: 'events_details',
    action: function(params, queryParams){
        BlazeLayout.render("layout", {
            headerTitle: 'header_title',
            headerButtonRight: '', //'',
            headerButtonLeft: '',
            content: 'events_details',
        });
    },
});

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn], { except: ["home"] });
