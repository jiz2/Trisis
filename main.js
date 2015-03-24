// ========
// Mainloop
// ========

var main = {
	
	init: function () {
		setInterval(this.dropTromino, 500);
		
		this.render();
	},
	
	activeTromino: Math.random()<0.5? new TrominoI():new TrominoC(),
	
	dropTromino: function() {
		if (main.activeTromino.a[1] > 0 && 
			main.activeTromino.b[1] > 0 && 
			main.activeTromino.c[1] > 0
		) {
			main.activeTromino.a[1]--;
			main.activeTromino.b[1]--;
			main.activeTromino.c[1]--;
		} else {
			main.activeTromino = Math.random()<0.5? new TrominoI():new TrominoC();
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
		
		var relPosA = subtract(this.activeTromino.a, this.activeTromino.c);
		var relPosB = subtract(this.activeTromino.b, this.activeTromino.c);
		
		if (eatKey("A".charCodeAt(0))) { // x-axis, positive
			relPosA = rotateBy(relPosA, 90, [1,0,0]);
			relPosB = rotateBy(relPosB, 90, [1,0,0]);
		}
		if (eatKey("Z".charCodeAt(0))) { // x-axis, negative
			relPosA = rotateBy(relPosA, -90, [1,0,0]);
			relPosB = rotateBy(relPosB, -90, [1,0,0]);
		}
		if (eatKey("S".charCodeAt(0))) { // y-axis, positive
			relPosA = rotateBy(relPosA, 90, [0,1,0]);
			relPosB = rotateBy(relPosB, 90, [0,1,0]);
		}
		if (eatKey("X".charCodeAt(0))) { // y-axis, negative
			relPosA = rotateBy(relPosA, -90, [0,1,0]);
			relPosB = rotateBy(relPosB, -90, [0,1,0]);
		}
		if (eatKey("D".charCodeAt(0))) { // z-axis, positive
			relPosA = rotateBy(relPosA, 90, [0,0,1]);
			relPosB = rotateBy(relPosB, 90, [0,0,1]);
		}
		if (eatKey("C".charCodeAt(0))) { // z-axis, negative 
			relPosA = rotateBy(relPosA, -90, [0,0,1]);
			relPosB = rotateBy(relPosB, -90, [0,0,1]);
		}
		
		var newA = add(relPosA, this.activeTromino.c);
		var newB = add(relPosB, this.activeTromino.c);
		
		// Rotate if inside game field		
		var safeA = true;
		var safeB = true;
		
		if (newA[0] < 1 || newA[0] > 6) safeA = false;
		if (newA[1] < 1 || newA[1] >19) safeA = false;
		if (newA[2] < 1 || newA[2] > 6) safeA = false;
		
		if (newB[0] < 1 || newB[0] > 6) safeB = false;
		if (newB[1] < 1 || newB[1] >19) safeB = false;
		if (newB[2] < 1 || newB[2] > 6) safeB = false;
		
		if (safeA && safeB) {
			this.activeTromino.a = newA;
			this.activeTromino.b = newB;
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