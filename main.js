// ========
// Mainloop
// ========

var main = {
	
	init: function () {
		setInterval(this.dropTromino, 100);
		
		this.render();
	},
	
	activeTromino: Math.random()<0.5? new TrominoI():new TrominoC(),
	
	dropTromino: function() {
		if (main.activeTromino.aY > 0 && 
			main.activeTromino.bY > 0 && 
			main.activeTromino.cY > 0
		) {
			main.activeTromino.aY--;
			main.activeTromino.bY--;
			main.activeTromino.cY--;
		} else {
			main.activeTromino = Math.random()<0.5? new TrominoI():new TrominoC();
		}
	},
	
	rotateTromino: function() {

		if (eatKey("A")) { // x-axis, positive
			
		}
		if (eatKey("Z")) { // x-axis, negative
		
		}
		if (eatKey("S")) { // y-axis, positive
		
		}
		if (eatKey("X")) { // y-axis, negative
		
		}
		if (eatKey("D")) { // z-axis, positive
		
		}
		if (eatKey("C")) { // z-axis, negative 
		
		}
	},
	
	render: function () {

		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		var mvstack = [];
		var mv = pov.getMV();
		
		container.render(mv, mvstack);
		
		main.rotateTromino();
		main.activeTromino.render(mv, mvstack);
		
		// Reset indices
		cstackIndex = 1;

		requestAnimFrame( main.render );
	}
}

