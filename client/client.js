//if (Meteor.isClient) {
    
    Template.leaderboard.helpers({

        'player': function() {
            var userId = Meteor.userId();
            return PlayersList.find({'createdBy': userId}, {sort: {score: -1, name: 1}});
        },

        'selectedClass': function() {
            var playerId = this._id;
            var selectedId = Session.get("selectedPlayer");
            if (playerId === selectedId) {
                return "selected";
            }
        },

        'showSelectedPlayer': function() {
            var userId = Meteor.userId();
            return PlayersList.findOne(Session.get("selectedPlayer"));
        }
    });

    Template.leaderboard.events({

        'click .players': function() {

            var playerId = this._id;
            Session.set("selectedPlayer", playerId);
        },

        'click .increment': function() {

            var selectedPlayer = Session.get("selectedPlayer");
            Meteor.call('updatePlayerScore', selectedPlayer, 5);
        },

        'click .decrement': function() {
   
            var selectedPlayer = Session.get("selectedPlayer");
            Meteor.call('updatePlayerScore', selectedPlayer, -5);
        },

        'click .remove': function() {
            var selectedPlayer = Session.get("selectedPlayer");
            Meteor.call('removePlayerData', selectedPlayer);
        }
    });

    Template.addPlayerForm.events({

        'submit form': function(event) {
 
            event.preventDefault();
            var playerName = event.target.playerName.value;
            Meteor.call('insertPlayerData', playerName);            
        }
    });

    Meteor.subscribe('playerList');
//}
