Template.home.helpers({
    counter: function() {
        return Session.get('counter');
    }
});

Template.home.events({
    'click button': function() {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    }
});

Template.events_list.helpers({
    'active_events': function(){
        return Events.find({status:{"$ne":'deleted'}});
    }
});
