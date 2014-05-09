(function (root) {
	var TTT = root.TTT = (root.TTT || {});
	var Game = TTT.Game;
	
	var UI = TTT.UI = function (game, $el) {
		this.game = game;
		this.$el = $el;
	};

  UI.POS = [
    [0,0],
    [0,1],
    [0,2],
    [1,0],
    [1,1],
    [1,2],
    [2,0],
    [2,1],
    [2,2],
  ]
	
  UI.prototype.buildBoard = function () {
    var squareString = "";
    _.times(9, function(i) {
      squareString += ("<div class='square' id='" + i + "'></div>")
    });
    $(this.$el).html(squareString);
    $('#current_player').html("It is " + this.game.player + "'s turn");
  }
	
  UI.prototype.setHandlers = function () {
		var ui = this;
		
    $(".square").click(function(){
      ui.handleClick(this);
    })
  }

  UI.prototype.handleClick = function (square) {
    var ui = this;
    if(!ui.game.winner()){
      ui.game.turn( UI.POS[square.id], function(){
        if (ui.game.winner()) {
          ui.displayWinner();
        } else {
					console.log(square);
					console.log(ui.game.player);
					$(square).css('background-color', ui.game.player);
        }
      });
    }
  }
	
	UI.prototype.displayWinner = function () {
		var ui = this;
		var winner = ui.game.player;
    $('#current_player').html(winner + " won!");
    $('.square').css('background-color', winner);
    console.log("Someone won!");
	}

}(this));