Security.defineMethod('ownsDocument', {
  // fetch: ['ownerId'],
  deny: function (type, arg, userId, doc) {
    return userId !== doc.user._id;
  }
});
Events.permit(['insert', 'update']).ownsDocument().apply();
