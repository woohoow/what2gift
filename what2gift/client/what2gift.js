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
    'events': function() {
        return Events.find({
            status: {
                "$ne": 'deleted'
            }
        });
    }
});

Template.events_edit_modal.helpers({
    'current_event': function() {
        var template = Template.instance();
        return Events.findOne({
            _id: template.data.id
        });
    }
});

Template.events_details.helpers({
    circularOptions: function() {
        var template = Template.instance();
        Session.set('progress', Events.findOne(template.data._id).progress());
        return {
            'canvasSize': 100,
            'arcWidth': 10,
            'sessionValueKey': 'progress',
            'tweenDuration': 500,
            'progressClass': 'progress-positive',
        };
    }
});

Template.contacts_list.helpers({
    all_fors: function(){
        //get all fors names based on subscription
        var res = Events.find({},{fields:{"for":1,"items.for.name":1}}).fetch();
        var all_fors = _.union(_.flattenDeep(_.pluck(res,"for")));
        return _.compact(
                _.union(
                    _.pluck(
                        _.flattenDeep(
                            _.pluck(
                                _.flattenDeep(_.pluck(res,"items")),
                                "for")),
                        'name'),
                all_fors)).sort();
    }
})
