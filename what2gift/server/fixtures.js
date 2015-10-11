var POPULATE = {};

POPULATE.events = function() {
    //sample events

    if (Events.find().count() === 0) {
        console.log('Creating Sample Events');
        Events.insert({
            name: 'Christmas 2014',
            when: new Date("2014-12-25T00:00:00Z"),
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

POPULATE.events();
