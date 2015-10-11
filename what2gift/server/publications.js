Meteor.publish('Events', function() {
    if(this.userId){
        return Events.find({"user._id":this.userId});        
    }else{
        return [];
    }
});
