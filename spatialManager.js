var spatialManager ={
	
	 maxHeight: 0,

	 board: [
	 
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, true, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ],
	 [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false]
	 ], 
     [[false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, false, false, false],
	  [false, false, false, true, false, false],
	  [false, false, false, false, false, false]
	 ]   
	 ],

	renderRedBoxes: function (mv, mvstack){
		for (i=0; i<=maxHeight; i++)
		{
			for(j=0; j<6; j++)
			{
				for (k=0; k<6; k++)
				{
					if (board[i][j][k]===true)
						signaller.drawAt(mv, mvstack, j, i, k);
						mvstack.push(mv);
						mv = mult(mv, translate(j, i, k));
						drawTexObject(texCube,mv);
						mv=mvstack.pop();
				}
			}
		}
	},

	registerRedBox: function(x,y,z){
		board[y][x][z]=true;
		if (y>maxHeight){maxHeight=y;}
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
