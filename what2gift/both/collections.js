Events = new Mongo.Collection('events', {
    idGeneration: 'STRING'
});

Events.helpers({
    progress: function() {
        var total = _.sum(this.items, function(item) {
            return item.total_items;
        });
        var delivered = _.sum(this.items, function(item) {
            var a = _.countBy(item.for, function(for_) {
                return for_.status;
            });
            return a.delivered;
        });
        return (delivered * 100 / total);
    },
    total: function() {
        return _.sum(this.items, function(item) {
            return item.total_items;
        });
    },
    total_to_buy: function() {
        return _.sum(this.items, function(item) {
            var a = _.countBy(item.for, function(for_) {
                return for_.status;
            });
            return a['to buy'];
        });
    },
    total_bought: function() {
        return _.sum(this.items, function(item) {
            var a = _.countBy(item.for, function(for_) {
                return for_.status;
            });
            return a.bought;
        });
    },
    total_wrapped: function() {
        return _.sum(this.items, function(item) {
            var a = _.countBy(item.for, function(for_) {
                return for_.status;
            });
            return a.wrapped;
        });
    },
    total_delivered: function() {
        return _.sum(this.items, function(item) {
            var a = _.countBy(item.for, function(for_) {
                return for_.status;
            });
            return a.delivered;
        });
    },
    fors: function(){
        // this.for + itmes.for.names
        return _.compact(_.union(
            _.pluck(_.flattenDeep(_.pluck(this.items,"for")),'name'),
            this.for)).sort();
    },
});

Schema = {};

Schema.Events = new SimpleSchema({

    //name and when of the event
    name: {
        type: String
    },
    when: {
        type: Date
    },
    for: {
        type: [String],
        optional: true,
        defaultValue:[],
        // autoValue: function(){
        //     var content = this.siblingField('items');
        //     _.
        // }
    },
    status: {
        type: String,
        defaultValue: 'inactive',
        allowedValues: ['inactive', 'active', 'deleted'],
    },

    //owner of the event
    // user: {
    //     type: Object,
    // },
    // "user._id": {
    //     type: String,
    //     autoform: {
    //         type: "hidden",
    //         label: false
    //     },
    //     autoValue: function() {
    //         return Meteor.userId();
    //     }
    // },
    // "user.username": {
    //     type: String,
    //     autoform: {
    //         type: "hidden",
    //         label: false
    //     },
    //     autoValue: function() {
    //         return Meteor.user().username;
    //     }
    // },

    // list of items for the event
    items: {
        type: [Object],
        optional: true,
        blackbox: true,
    },
    "items.$._id": {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function() {
            return Random.id();
        }
    },
    "items.$.name": {
        type: String
    },
    "items.$.total_items": {
        type: Number
    },

    "items.$.for": {
        type: [Object],
    },
    "items.$.for.$._id": {
        type: String,
        optional: true,
        autoform: {
            type: "hidden",
            label: false,
        },
    },
    "items.$.for.$.name": {
        type: String
    },
    "items.$.for.$.status": {
        type: String,
        defaultValue: 'to buy',
        allowedValues: ['to buy', 'bought', 'wrapped', 'delivered'],
    },



    //internal fields
    created: {
        type: Date,
        autoform: {
            omit: true,
        },
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                };
            } else {
                this.unset();
            }
        },
    },
    updated: {
        type: Date,
        autoform: {
            omit: true,
        },
        autoValue: function() {
            return new Date();
        },
    },
});

Events.attachSchema(Schema.Events);
