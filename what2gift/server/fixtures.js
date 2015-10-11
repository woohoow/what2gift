var POPULATE = {};

POPULATE.users = function() {
    //sample users
    if (Meteor.users.find().count() === 0) {
        console.log('Creating Users');

        Accounts.createUser({
            "username": "admin1",
            "email": "admin1@loc.al",
            "password": "password",
        });

        for (var i = 0; i < 4; i++) {
            var user = "user" + i;
            Accounts.createUser({
                "username": user,
                "email": user + "@loc.al",
                "password": "password",
            });
        }

        var user1 = _.pick(Meteor.users.findOne({
            username: "user1"
        }), 'username', '_id');
        var user2 = _.pick(Meteor.users.findOne({
            username: "user2"
        }), 'username', '_id');
        var user3 = _.pick(Meteor.users.findOne({
            username: "user3"
        }), 'username', '_id');
        console.log('users', user1, user2, user3);

    }
}



POPULATE.events = function() {
    //sample events

    if (Events.find().count() === 0) {
        console.log('Creating Sample Events');
        var user1 = Meteor.users.findOne({
            username: "user1"
        }, {
            fields: {
                username: 1,
                _id: 1
            }
        });

        console.log("creating event for user", user1);


        Events._collection.insert({
            _id: Random.id(),
            user: user1,
            name: 'Christmas 2014',
            when: new Date("2014-12-25T00:00:00Z"),
            status: 'active',
            for: ['Mo'],
            items : [ {
                "name": "Ball",
                "total_items": 2,
                "for": [ {
                    "name": "Asha",
                    "status": "delivered"
                }, {
                    "name": "Yowyn",
                    "status": "wrapped"
                } ],
                }, {
                "name": "Spin Go",
                "total_items": 4,
                "for": [ {
                    "name": "Bernard",
                    "status": "delivered"
                }, {
                    "name": "Nathaniel",
                    "status": "bought"
                }, {
                    "name": "Huey",
                    "status": "to buy"
                }, {
                    "name": "Kiwi",
                    "status": "delivered"
                }
                ]
            },
            ],
        });

    }
};

POPULATE.users();
POPULATE.events();
