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

		for (var i = highest; i > highest-3; i--) {
			var levelCount = 0;
			for (var j = 1; j <= 6; j++) {
				for (var k = 1; k <= 6; k++) {
					if (this.board[j][i][k]===false) {levelCount++};
					if (levelCount===36) {deleteLevel(i)};
				}
			}
		}
	},

	//Used when a player fills up an entire level
	deleteLevel: function (y) {

		//clear all boxes from current level
		for (i=0; i<6;i++)
		{
			for (j=0;j<6;j++)
			{
				this.board[y][i][j]=true;
			}
		}
		//shift all higher boxes one level lower
		for (m=y+1; m<=19;m++)
		{
			for (n=0;n<6;n++)
			{
				for (p=0;p<6;p++)
				{
					if (this.board[m][n][p]===false)
					{
						this.board[m-1][n][p]=false;
						this.board[m][n][p]=true;
					}
				}
			}
		}
		score++;
		renderRedBoxes();
		//check for any cascading completions
		checkForCompletion(y,y,y);
	}
}
