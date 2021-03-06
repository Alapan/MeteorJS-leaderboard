Meteor.publish('playerList', function() {

    var playerId = this.userId;
    return PlayersList.find({'createdBy': playerId});
});

Meteor.methods({

    'insertPlayerData': function(playername) {

        var playerId = Meteor.userId();
        PlayersList.insert({
            
            'name': playername,
            'score': 0,
            'createdBy': playerId
        });
    },

    'removePlayerData': function(selectedPlayer) {
        var currentUser = Meteor.userId();
        PlayersList.remove({'createdBy': currentUser, '_id': selectedPlayer});
    },

    'updatePlayerScore': function(selectedPlayer, score) {
        var currentUser = Meteor.userId();
        PlayersList.update({'_id': selectedPlayer, 'createdBy': currentUser}, {$inc: {'score': score}});
    }
});



