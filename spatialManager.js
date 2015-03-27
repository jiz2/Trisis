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

	canDrop: function(tromino) {
		// false means can drop, so if all is false, return true
		var dropable = false;
		dropable = dropable || this.board[tromino.a[1] - 1];
		dropable = dropable || this.board[tromino.b[1] - 1];
		dropable = dropable || this.board[tromino.c[1] - 1];
		return dropable;
	},
	
	registerInactive: function(pos){
		this.board[y][x][z] = false;
	},
	
	checkForCollision: function(x,y,z){
		return board[y][x][z];
	},

	checkForCompletion: function(){
		for (i=maxHeight; i>0; i--)
		{
			var levelCount=0;
			for (j=0;j<6;j++)
			{
				for (k=0; k<6; k++)
				{
					if (board[i][j][k]===true) {levelCount++};
					if (levelCount===36) {deleteLevel(i)};
				}
			}
		}
	},

	//Used when a player fills up an entire level
	deleteLevel: function(y){

		//clear all boxes from current level
		for (i=0; i<6;i++)
		{
			for (j=0;j<6;j++)
			{
				board[y][i][j]=false;
			}
		}
		//shift all higher boxes one level lower
		for (m=y+1; m<=maxHeight;m++)
		{
			for (n=0;n<6;n++)
			{
				for (p=0;p<6;p++)
				{
					if (board[m][n][p]===true)
					{
						board[m-1][n][p]=true;
						board[m][n][p]=false;
					}
				}
			}
		}
		maxHeight--;
		score++;
		renderRedBoxes();
		checkForCompletion();
	}
}
