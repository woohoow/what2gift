Tracker.autorun(function() {
    if (Meteor.status().connected) {
        Meteor.subscribe('Events');
    }
});

Meteor.startup(function() {
    // client side startup
    AutoForm.setDefaultTemplate('ionic');
});

Tracker.autorun(function() {
        // Track progress
        console.log('READ', Events.pendingReads.percent.get() + '%', 'done:', Events.pendingReads.isDone());
        console.log('WRITE', Events.pendingWrites.percent.get() + '%', 'done:', Events.pendingWrites.isDone());
    });

Events.once('loaded', function(evt) {
    // When all the data is loaded subscribe
    console.log('ground item loaded, subscribing', evt);
    Meteor.subscribe('items', function() {
        Session.set('ItemSubscriptionReady', true);
    });
    // If you only want incremental updates
    // requires the use of createdAt/updatedAt/removedAt pattern
    // Meteor.subscribe('foo', foo.lastUpdatedAt);
});

// Experimental api
Events.shutdown(function() {
    // Ok, it should be safe to shutdown now - WIP
    console.log('ground shutdown called');
});
