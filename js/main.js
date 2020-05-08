$(function (){
// <---Variables used for the JS code --->
	var currentPlayer = 1
	var player1Score = 0;
	var player2Score = 0;
	var count = 0; 
	var $p1score = $('#player1-score');
	var $p2score = $('#player2-score');
	var $playerTurn = $('#playersturn');
	var $instructions = $('#instructions');
	var $gameboard = $('#gameboard');

// localStorage.removeItem('game'); // <---Removes the stored page

// <---Start button--->
	$('#button').on('click', function(event){
		playSound('sounds/school-bell.wav');
		$instructions.slideUp(600);
		$gameboard.show()	
	});

//<---Restart Button-->
	$('#restart').on('click', function(event) {
		restart();
	});

//<--Instructions Button--->
	$('#instruct').on('click', function(event) {
		$instructions.show();
		$gameboard.hide()	
	});

// <--- This is the game functions--->
	function playGame() {
		$('.lines').one('click', function(event) {
			playSound('sounds/scribble.wav');
			count++;
			winLose();
			if (currentPlayer === 1) {
				$(this).addClass('player1 line-drawn');
				drawLine($(this));
				scoreAdd = makeBox($(this));

					if (scoreAdd == 1) {
						currentPlayer = 1;
						player1Score++; 
						$p1score.html(player1Score);
					} else if (scoreAdd == 2) {
						currentPlayer = 1;
						player1Score += 2;
						$p1score.html(player1Score);
					} else {
						currentPlayer = 0;
						$playerTurn.html('Player Two\'s\ Turn'); 
					}
				
			} else {
				$(this).addClass('player2 line-drawn');
				drawLine($(this));
				scoreAdd = makeBox($(this));

					if (scoreAdd == 1) {
						currentPlayer = 0;
						player2Score++; 
						$p2score.html(player2Score);
					} else if (scoreAdd == 2) {
						currentPlayer = 0;
						player2Score += 2;
						$p2score.html(player2Score);
					} else {
						currentPlayer = 1;
						$playerTurn.html('Player One\'s Turn'); 
				}
			};
			
		});
		
	};

//<---This function adds different border properties to the corresponding box if a line next to it has been clicked--->
	function drawLine($line) {

		var actions = $line.data('actions').split(' ');
		
			if ($line.hasClass('line-drawn')) {

				$line.removeClass('line-drawn');

				for (var i = 0; i < actions.length; i++) {
					
					var current = actions[i].split('-');

					$('#' + current[0]).addClass(current[1]);
				}

			}
	};
//<---This function checks if a box has all the border properties. If it does, then it will fill in the box with the approriate player colour-->
	function makeBox ($line) {

		var actions = $line.data('actions').split(' ');
		var madeBox = 0;
		
		for (var i = 0; i < actions.length; i++) {
			
			var current = actions[i].split('-');
			var $thisBox = $('#' + current[0])

			if ($thisBox.is('.bordertop.borderbottom.borderleft.borderright')) {
				
				$thisBox.removeClass('bordertop');
				if (currentPlayer === 1) {
					$thisBox.addClass('player1');
				} else {
					$thisBox.addClass('player2');
				}
				madeBox += 1;
			}	
		};
		return madeBox; 
	};

// <---This function will check if a player has won the game by couting all the moves that can be done in the game and comparing player scores--->
	function winLose () {
		if (count === 40 && player1Score > player2Score) {
				$playerTurn.html('Player One Wins!!');

			} 
		if (count === 40 && player2Score > player1Score) {
			$playerTurn.html('Player Two Wins!!');
		}
	};
// <---This function controls the sound--->
	function playSound(path) {
	    var sound = document.createElement('audio');
	    sound.setAttribute('src', path);
	    sound.play();
	};
//<---This function restarts the game-->
	    var game = localStorage.getItem('game');
		    if(game === 'true'){
		        $('#gameboard').show();
		        $('#instructions').hide();
		    } 
	function restart() {
		localStorage.setItem('game', 'true');
		location.reload();
		event.preventDefault();
        $('#gameboard').show();
        $('#instructions').hide();
        
	};		

	playGame();

});