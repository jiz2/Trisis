var spatialManager = {

	init: function () {
		this.board = []
		for (var x = 1; x <= 6; x++) {
			this.board[x] = [];
			for (var y = 1; y <= 20; y++) {
				this.board[x][y] = [];
				for (var z = 1; z <= 6; z++)
					this.board[x][y][z] = true;
			}
		}
	},

	canDrop: function (tromino) {
		// true means can drop
		var dropable = true;
		
		if (tromino.a[1] - 1 > 0 && tromino.b[1] - 1 > 0 && tromino.c[1] - 1 > 0) {
			dropable = dropable && this.board[tromino.a[0]][tromino.a[1] - 1][tromino.a[2]];
			dropable = dropable && this.board[tromino.b[0]][tromino.b[1] - 1][tromino.b[2]];
			dropable = dropable && this.board[tromino.c[0]][tromino.c[1] - 1][tromino.c[2]];
		} else dropable = false;
		
		return dropable;
	},
	
	register: function (tromino) {
		this.board[tromino.a[0]][tromino.a[1]][tromino.a[2]] = false;
		this.board[tromino.b[0]][tromino.b[1]][tromino.b[2]] = false;
		this.board[tromino.c[0]][tromino.c[1]][tromino.c[2]] = false;
	},
	
	unregister: function (tromino) {
		this.board[tromino.a[0]][tromino.a[1]][tromino.a[2]] = true;
		this.board[tromino.b[0]][tromino.b[1]][tromino.b[2]] = true;
		this.board[tromino.c[0]][tromino.c[1]][tromino.c[2]] = true;
	},

	checkCollision: function (x,y,z){
		return this.board[x][y][z];
	},
	//This function called when a tromino is settled. Check to see if the level has been completely filled.
	checkForCompletion: function (y1,y2,y3) {
		
		var highest = Math.max(y1,y2,y3);
		var lowest = Math.max(0,highest-3);

		for (var y = highest; y > lowest; y--) {
			var levelCount = 0;
			for (var x = 1; x <= 6; x++) {
				for (var z = 1; z <= 6; z++) {
					if (this.board[x][y][z] === false) levelCount++;
					if (levelCount === 36) 
						{
							this.deleteLevel(y);
						}
				}
			}
		}
	},

	//Used when a player fills up an entire level
	deleteLevel: function (y) {
		main.ding.play();
		
		// Remove all inactive boxes on deleted level from Inactives Array in Main
		for (var i = main.inactives.length-1; i >= 0; i--) {
			if (main.inactives[i][1] == y) {
				main.inactives.splice(i,1);
			}
		}

		// Shift all higher boxes one level lower in the Spatial Board
		for (var i = y; i <= 19; i++) {
			for (var x = 1; x <= 6; x++) {
				for (var z = 1; z <= 6; z++) {
					this.board[x][i][z]=this.board[x][i+1][z];
					/*if (this.board[x][i][z] === false) {
						this.board[x][i-1][z] = false;
						this.board[x][i][z] = true;
					}*/
				}
			}
		}

		// Shift all higher boxes one level lower in the Inactives Array in Main
		for (var i = main.inactives.length-1; i >= 0; i--) {
			if (main.inactives[i][1] > y) {
				main.inactives[i][1]--;
			}
		}
		
		score++;
		//check for any cascading completions
		this.checkForCompletion(y,y,y);
	}
}
