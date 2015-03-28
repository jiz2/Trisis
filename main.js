// ========
// Mainloop
// ========

var main = {
	
	init: function () {
		spatialManager.init();
		
		//if (maxHeight<20)
		//{
		this.createTromino();
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
		
		setInterval(this.dropTromino, 500);
		//}
		
		this.render();
	},

	inactives: [],
	
	createTromino: function() {
		this.active = Math.random()<0.5? new TrominoI():new TrominoC();
	},
	
	dropTromino: function() {
		// Remove active Tromino from game field
		spatialManager.unregister(main.active);
		
		if (spatialManager.canDrop(main.active)) {
			main.active.a[1]--;
			main.active.b[1]--;
			main.active.c[1]--;
		} else {
			// Add inactive Tromino
			main.inactives.push(main.active.a);
			main.inactives.push(main.active.b);
			main.inactives.push(main.active.c);
			
			// Add inactive Tromino into game field
			spatialManager.register(main.active);

			// Check for completion of a level
			spatialManager.checkForCompletion(main.active.a[1],main.active.b[1],main.active.c[1]);
			
			// Make new Tromino
			main.createTromino();

			var thisBoxHeight = Math.max(main.active.a[1],main.active.b[1],main.active.c[1])
			if (thisBoxHeight>maxHeight) maxHeight= thisBoxHeight;
		}
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
	},

	moveTromino: function () {
		// Remove active Tromino from game field
		spatialManager.unregister(main.active);
		
		if (eatKey(KEY_LEFT)) {
			var safe = true;
			if (this.active.a[0]-1 < 1) safe = false;
			if (this.active.b[0]-1 < 1) safe = false;
			if (this.active.c[0]-1 < 1) safe = false;
			
			safe = safe && spatialManager.checkCollision(this.active.a[0]-1, this.active.a[1], this.active.a[2]);
			safe = safe && spatialManager.checkCollision(this.active.b[0]-1, this.active.b[1], this.active.b[2]);
			safe = safe && spatialManager.checkCollision(this.active.c[0]-1, this.active.c[1], this.active.c[2]);
			
			if (safe) {
				this.active.a[0]--; 
				this.active.b[0]--;
				this.active.c[0]--;
			}
		}
		if (eatKey(KEY_UP)) {
			var safe = true;
			if (this.active.a[2]-1 < 1) safe = false;
			if (this.active.b[2]-1 < 1) safe = false;
			if (this.active.c[2]-1 < 1) safe = false;
			
			safe = safe && spatialManager.checkCollision(this.active.a[0], this.active.a[1], this.active.a[2]-1);
			safe = safe && spatialManager.checkCollision(this.active.b[0], this.active.b[1], this.active.b[2]-1);
			safe = safe && spatialManager.checkCollision(this.active.c[0], this.active.c[1], this.active.c[2]-1);
			
			if (safe) {
				this.active.a[2]--; 
				this.active.b[2]--;
				this.active.c[2]--;
			}
		}
		if (eatKey(KEY_RIGHT)) {
			var safe = true;
			if (this.active.a[0]+1 > 6) safe = false;
			if (this.active.b[0]+1 > 6) safe = false;
			if (this.active.c[0]+1 > 6) safe = false;
			
			safe = safe && spatialManager.checkCollision(this.active.a[0]+1, this.active.a[1], this.active.a[2]);
			safe = safe && spatialManager.checkCollision(this.active.b[0]+1, this.active.b[1], this.active.b[2]);
			safe = safe && spatialManager.checkCollision(this.active.c[0]+1, this.active.c[1], this.active.c[2]);
			
			if (safe) {
				this.active.a[0]++; 
				this.active.b[0]++;
				this.active.c[0]++;
			}
		}
		if (eatKey(KEY_DOWN)) {
			var safe = true;
			if (this.active.a[2]+1 > 6) safe = false;
			if (this.active.b[2]+1 > 6) safe = false;
			if (this.active.c[2]+1 > 6) safe = false;
			
			safe = safe && spatialManager.checkCollision(this.active.a[0], this.active.a[1], this.active.a[2]+1);
			safe = safe && spatialManager.checkCollision(this.active.b[0], this.active.b[1], this.active.b[2]+1);
			safe = safe && spatialManager.checkCollision(this.active.c[0], this.active.c[1], this.active.c[2]+1);
			
			if (safe) {
				this.active.a[2]++; 
				this.active.b[2]++;
				this.active.c[2]++;
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
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
	},
	
	rotateTromino: function () {
		// Remove active Tromino from game field
		spatialManager.unregister(main.active);
		
		var relPosA = subtract(this.active.a, this.active.c);
		var relPosB = subtract(this.active.b, this.active.c);
		
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
		
		var newA = add(relPosA, this.active.c);
		var newB = add(relPosB, this.active.c);
		
		// Rotate if inside game field		
		var safeA = true;
		var safeB = true;
		
		if (newA[0] < 1 || newA[0] > 6) safeA = false;
		if (newA[1] < 1 || newA[1] >19) safeA = false;
		if (newA[2] < 1 || newA[2] > 6) safeA = false;
		
		if (newB[0] < 1 || newB[0] > 6) safeB = false;
		if (newB[1] < 1 || newB[1] >19) safeB = false;
		if (newB[2] < 1 || newB[2] > 6) safeB = false;
		
		// Rotate if no collision
		safeA = safeA && spatialManager.checkCollision(newA[0], newA[1], newA[2]);
		safeB = safeB && spatialManager.checkCollision(newB[0], newB[1], newB[2]);		
		
		if (safeA && safeB) {
			this.active.a = newA;
			this.active.b = newB;
		}
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
	},
	
	renderInactives: function (mv, mvstack) {
		for (var i in this.inactives) {
			var pos = this.inactives[i];
			mvstack.push(mv);
			mv = mult( mv, translate( pos[0], pos[1], pos[2] ) );
			drawTexObject(texCube, mv);
			mv = mvstack.pop();
		}
	},
	
	render: function () {

		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		document.getElementById("score").innerHTML = score;
		
		var mvstack = [];
		var mv = pov.getMV();
		
		// Render boundary
		container.render(mv, mvstack);
		
		// Render active Tromino
		main.moveTromino();
		main.rotateTromino();
		main.active.render(mv, mvstack);
		
		// Render inactive Trominos
		main.renderInactives(mv, mvstack);
		
		// Reset indices
		cstackIndex = 1;

		requestAnimFrame( main.render );
	}
}