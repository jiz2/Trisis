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

		for (var i = highest; i > lowest; i--) {
			var levelCount = 0;
			for (var j = 1; j <= 6; j++) {
				for (var k = 1; k <= 6; k++) {
					if (this.board[j][i][k]===false) {levelCount++};
					if (levelCount===36) {this.deleteLevel(i)};
				}
			}
		}
	},

	//Used when a player fills up an entire level
	deleteLevel: function (y) {

		//clear all boxes on deleted level from Spatial Board
		for (i=1; i<6;i++)
		{
			for (j=1;j<6;j++)
			{
				this.board[i][y][j]=true;
			}
		}
		//Splice all inactive boxes on deleted level from Inactives Array in Main
		for (b=main.inactives.length-1; b>=0;b--)
		{
			if (main.inactives[b][1]==y)
			{
				main.inactives.splice(b,1);
			}
		}

		//shift all higher boxes one level lower in the Spatial Board
		for (m=y+1; m<=19;m++)
		{
			for (n=1;n<6;n++)
			{
				for (p=1;p<6;p++)
				{
					if (this.board[n][m][p]===false)
					{
						this.board[n][m-1][p]=false;
						this.board[n][m][p]=true;
					}
				}
			}
		}

		//shift all higher boxes one level lower in the Inactives Array in Main
		for (z=main.inactives.length-1; z>=0;z--)
		{
			if (main.inactives[z][1]>y)
			{
				main.inactives[z][1]--;
			}
		}
		score++;
		main.render();
		//check for any cascading completions
		this.checkForCompletion(y,y,y);
	}
}
