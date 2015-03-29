// ========
// Mainloop
// ========

var main = {

	clank: new Audio ("/audio/clank.mp3"),
	swish1: new Audio("/audio/swish1.mp3"),
	swish2: new Audio("/audio/swish2.mp3"),
	swish3: new Audio("/audio/swish3.mp3"),
	ding: new Audio("/audio/ding.mp3"),


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

			main.clank.play();
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
		
		main.render();
	},
	
	throwTromino: function () {
		// Remove active Tromino from game field
		spatialManager.unregister(main.active);

		if (eatKey(" ".charCodeAt(0))) {
			while (spatialManager.canDrop(main.active)) {
				main.active.a[1]--;
				main.active.b[1]--;
				main.active.c[1]--;
		}}
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
	},

	moveTromino: function () {
		// Remove active Tromino from game field
		spatialManager.unregister(main.active);
		
		var newA = this.active.a;
		var newB = this.active.b;
		var newC = this.active.c;

		if (eatKey(KEY_LEFT)) {
			newA = add(newA, vec3( -1, 0, 0 ));
			newB = add(newB, vec3( -1, 0, 0 ));
			newC = add(newC, vec3( -1, 0, 0 ));
		}
		if (eatKey(KEY_UP)) {
			newA = add(newA, vec3( 0, 0, -1 ));
			newB = add(newB, vec3( 0, 0, -1 ));
			newC = add(newC, vec3( 0, 0, -1 ));
		}
		if (eatKey(KEY_RIGHT)) {
			newA = add(newA, vec3( 1, 0, 0 ));
			newB = add(newB, vec3( 1, 0, 0 ));
			newC = add(newC, vec3( 1, 0, 0 ));
		}
		if (eatKey(KEY_DOWN)) {
			newA = add(newA, vec3( 0, 0, 1 ));
			newB = add(newB, vec3( 0, 0, 1 ));
			newC = add(newC, vec3( 0, 0, 1 ));
		}
		
		// If a change occurred
		if (newA[0] !== this.active.a[0] || newA[2] !== this.active.a[2]) {
			// Check collision
			var safe = true;
			
			if (newA[0] < 1 || newA[0] > 6) safe = false;
			if (newB[0] < 1 || newB[0] > 6) safe = false;
			if (newC[0] < 1 || newC[0] > 6) safe = false;
			
			if (newA[2] < 1 || newA[2] > 6) safe = false;
			if (newB[2] < 1 || newB[2] > 6) safe = false;
			if (newC[2] < 1 || newC[2] > 6) safe = false;
			
			safe = safe && spatialManager.checkCollision(newA[0], newA[1], newA[2]);
			safe = safe && spatialManager.checkCollision(newB[0], newB[1], newB[2]);	
			safe = safe && spatialManager.checkCollision(newC[0], newC[1], newC[2]);	
			
			if (safe) {
				this.active.a = newA;
				this.active.b = newB;
				this.active.c = newC;
				this.render();
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
			main.swish1.play();
			relPosA = rotateBy(relPosA, 90, [1,0,0]);
			relPosB = rotateBy(relPosB, 90, [1,0,0]);
		}
		if (eatKey("Z".charCodeAt(0))) { // x-axis, negative
			main.swish1.play();
			relPosA = rotateBy(relPosA, -90, [1,0,0]);
			relPosB = rotateBy(relPosB, -90, [1,0,0]);
		}
		if (eatKey("S".charCodeAt(0))) { // y-axis, positive
			main.swish2.play();
			relPosA = rotateBy(relPosA, 90, [0,1,0]);
			relPosB = rotateBy(relPosB, 90, [0,1,0]);
		}
		if (eatKey("X".charCodeAt(0))) { // y-axis, negative
			main.swish2.play();
			relPosA = rotateBy(relPosA, -90, [0,1,0]);
			relPosB = rotateBy(relPosB, -90, [0,1,0]);
		}
		if (eatKey("D".charCodeAt(0))) { // z-axis, positive
			main.swish3.play();
			relPosA = rotateBy(relPosA, 90, [0,0,1]);
			relPosB = rotateBy(relPosB, 90, [0,0,1]);
		}
		if (eatKey("C".charCodeAt(0))) { // z-axis, negative 
			main.swish3.play();
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
			this.render();
		}
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
	},
	
	renderInactives: function (mv, mvstack) {
		for (var i in this.inactives) {
			var pos = this.inactives[i];
			mvstack.push(mv);
			mv = mult( mv, translate( pos[0], pos[1], pos[2] ) );
			drawTexObject(texCube, mv, true);
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
		//main.moveTromino();
		//main.rotateTromino();
		main.active.render(mv, mvstack);
		
		// Render inactive Trominos
		main.renderInactives(mv, mvstack);
		
		// Reset indices
		cstackIndex = 1;

		//requestAnimFrame( main.render );
	}
}