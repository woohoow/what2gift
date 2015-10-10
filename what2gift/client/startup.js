Tracker.autorun(function() {
    if (Meteor.status().connected) {
        Meteor.subscribe('Events');
    }
});

Meteor.startup(function() {
    // client side startup
    AutoForm.setDefaultTemplate('ionic');
});
