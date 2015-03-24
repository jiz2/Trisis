// ========
// Mainloop
// ========

var main = {
	
	init: function () {
		//setInterval(this.dropTromino, 100);
		
		this.render();
	},
	
	activeTromino: new TrominoI(),
	
	dropTromino: function() {
		if (main.activeTromino.aY > 0 && 
			main.activeTromino.bY > 0 && 
			main.activeTromino.cY > 0
		) {
			main.activeTromino.aY--;
			main.activeTromino.bY--;
			main.activeTromino.cY--;
		} else {
			main.activeTromino = new TrominoI();
		}
	},
	
	moveTromino: function () {

		if (eatKey(KEY_LEFT)) {
			var safe = true;
			if (this.activeTromino.a[0]-1 < 1) safe = false;
			if (this.activeTromino.b[0]-1 < 1) safe = false;
			if (this.activeTromino.c[0]-1 < 1) safe = false;
			
			if (safe) {
				this.activeTromino.a[0]--; 
				this.activeTromino.b[0]--;
				this.activeTromino.c[0]--;
			}
		}
		if (eatKey(KEY_UP)) {
			var safe = true;
			if (this.activeTromino.a[2]-1 < 1) safe = false;
			if (this.activeTromino.b[2]-1 < 1) safe = false;
			if (this.activeTromino.c[2]-1 < 1) safe = false;
			
			if (safe) {
				this.activeTromino.a[2]--; 
				this.activeTromino.b[2]--;
				this.activeTromino.c[2]--;
			}
		}
		if (eatKey(KEY_RIGHT)) {
			var safe = true;
			if (this.activeTromino.a[0]+1 > 6) safe = false;
			if (this.activeTromino.b[0]+1 > 6) safe = false;
			if (this.activeTromino.c[0]+1 > 6) safe = false;
			
			if (safe) {
				this.activeTromino.a[0]++; 
				this.activeTromino.b[0]++;
				this.activeTromino.c[0]++;
			}
		}
		if (eatKey(KEY_DOWN)) {
			var safe = true;
			if (this.activeTromino.a[2]+1 > 6) safe = false;
			if (this.activeTromino.b[2]+1 > 6) safe = false;
			if (this.activeTromino.c[2]+1 > 6) safe = false;
			
			if (safe) {
				this.activeTromino.a[2]++; 
				this.activeTromino.b[2]++;
				this.activeTromino.c[2]++;
			}
		}
		
		/* 	Code used in Mobile for positive movement at any angle
			that needs to be changed if want to implement here
		
		if ( g_keys['W'.charCodeAt(0)] ) {
			xPos -= 0.1*Math.sin(-spinY*Math.PI/180);
			zPos -= 0.1*Math.cos(-spinY*Math.PI/180);
		}
		if ( g_keys['S'.charCodeAt(0)] ) {
			xPos += 0.1*Math.sin(-spinY*Math.PI/180);
			zPos += 0.1*Math.cos(-spinY*Math.PI/180);
		}
		if ( g_keys['A'.charCodeAt(0)] ) {
			xPos -= 0.1*Math.cos(-spinY*Math.PI/180);
			zPos += 0.1*Math.sin(-spinY*Math.PI/180);
		}
		if ( g_keys['D'.charCodeAt(0)] ) {
			xPos += 0.1*Math.cos(-spinY*Math.PI/180);
			zPos -= 0.1*Math.sin(-spinY*Math.PI/180);
		}
		*/
	},
	
	rotateTromino: function () {

		if (eatKey("A".charCodeAt(0))) { // x-axis, positive
			console.log(this.activeTromino.a);
			console.log(this.activeTromino.b);
			console.log(this.activeTromino.c);
			console.log();
		}
		if (eatKey("Z".charCodeAt(0))) { // x-axis, negative
		
		}
		if (eatKey("S".charCodeAt(0))) { // y-axis, positive
		
		}
		if (eatKey("X".charCodeAt(0))) { // y-axis, negative
		
		}
		if (eatKey("D".charCodeAt(0))) { // z-axis, positive
		
		}
		if (eatKey("C".charCodeAt(0))) { // z-axis, negative 
		
		}
	},
	
	render: function () {

		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		var mvstack = [];
		var mv = pov.getMV();
		
		container.render(mv, mvstack);
		
		main.moveTromino();
		main.rotateTromino();
		main.activeTromino.render(mv, mvstack);
		
		// Reset indices
		cstackIndex = 1;

		requestAnimFrame( main.render );
	}
}

