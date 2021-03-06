Template.appAtPwdFormBtn.replaces('atPwdFormBtn');

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

Template.events_details.onDestroyed(function(){
    Session.set('activeItemStatus', undefined);
    delete Session.keys.activeItemStatus;
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
    },
    summary_status: function(item){
        console.log('item', item);
        var status = Session.get('activeItemStatus');
        var res={name:item.name};
        res.sub_total = _.countBy(item.for, function(for_) {
                return for_.status;
        })[status];
        if(res.sub_total===undefined){
            res.sub_total = 0;
        }
        return res;
    },
});

Template.events_details.events({
    'click a[name="to_buy"]': function(e, t) {
        console.log('to_buy');
        Session.set('activeItemStatus','to buy');
    },
    'click a[name="bought"]': function(e, t) {
        console.log('bought');
        Session.set('activeItemStatus','bought');
    },
    'click a[name="wrapped"]': function(e, t) {
        console.log('wrapped');
        Session.set('activeItemStatus','wrapped');
    },
    'click a[name="delivered"]': function(e, t) {
        console.log('delivered');
        Session.set('activeItemStatus','delivered');
    },
});

Template.contacts_list.helpers({
    all_fors: function(){
        //get all fors names based on subscription
        var events = Events.find({},{fields:{"for":1,"items.for.name":1}}).fetch();
        var all_fors = _.union(_.flattenDeep(_.pluck(events,"for")));
        return _.compact(
                _.union(
                    _.pluck(
                        _.flattenDeep(
                            _.pluck(
                                _.flattenDeep(_.pluck(events,"items")),
                                "for")),
                        'name'),
                all_fors)).sort();
    }
});

Template.contacts_details.helpers({
    my_events: function(){
        //get all events for a user
        var to = Router.current().params.name;
        return {to:to, events:Events.find({"items.for.name":to},
            {fields:{"name":1, "when":1, "items.name":1, "items.for":1}}).fetch()};
    },
    iconify: function(status){
        var icon_map={
            'to buy': 'ion-ios-cart-outline assertive',
            'bought': 'ion-ios-box-outline energized',
            'wrapped': 'ion-bag positive',
            'delivered': 'ion-happy-outline balanced',

        };
        return icon_map[status];
    }
});

UI.registerHelper('FormatDate', function(date){
    return moment(date).format("ll");
})
