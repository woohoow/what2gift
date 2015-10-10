Events = new Mongo.Collection('events', {
    idGeneration: 'STRING'
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
        optional: true
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
    "items.$.total_items":{
        type: Number
    },

    "items.$.for": {
        type: [Object],
    },
    "items.$.for.$._id": {
        type: String,
        optional: true,
        autoform:{
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
