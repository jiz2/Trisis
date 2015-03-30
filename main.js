// ========
// Mainloop
// ========

var main = {

	clank: new Audio ("/Audio/clank.mp3"),
	swish1: new Audio("/Audio/swish1.mp3"),
	swish2: new Audio("/Audio/swish2.mp3"),
	swish3: new Audio("/Audio/swish3.mp3"),
	ding: new Audio("/Audio/ding.mp3"),


	init: function () {
		spatialManager.init();
		
		this.createTromino();
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
		
		this.dropInterval = setInterval(this.dropTromino, 500);
		
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

			maxHeight = Math.max(maxHeight,main.active.a[1], main.active.b[1], main.active.c[1]);
			
			// Add inactive Tromino
			main.inactives.push(main.active.a);
			main.inactives.push(main.active.b);
			main.inactives.push(main.active.c);
			
			// Add inactive Tromino into game field
			spatialManager.register(main.active);

			// Check for completion of a level
			spatialManager.checkForCompletion(main.active.a[1],main.active.b[1],main.active.c[1]);
			
			// Make new Tromino
			if (maxHeight < 19)
				main.createTromino();
			else {
				main.gameOver = true;
				clearInterval(main.dropInterval);
				main.render();
				alert("<['>.<']> GAME OVER! d(TT.TT)b YOU LOST! q{'X.X'}p");
			}
		}
		
		// Add active Tromino into game field
		spatialManager.register(main.active);
		
		main.render();
	},
	
	moveTromino: function () {
		// Remove active Tromino from game field
		spatialManager.unregister(main.active);
		
		var x = 0;
		var z = 0;
		var angle = Math.round(-spinY/90)*Math.PI/2;

		if (eatKey(KEY_LEFT)) {
			x = -Math.round(Math.cos(angle));
			z =  Math.round(Math.sin(angle));
		}
		if (eatKey(KEY_UP)) {
			x = -Math.round(Math.sin(angle));
			z = -Math.round(Math.cos(angle));
		}
		if (eatKey(KEY_RIGHT)) {
			x =  Math.round(Math.cos(angle));
			z = -Math.round(Math.sin(angle));
		}
		if (eatKey(KEY_DOWN)) {
			x =  Math.round(Math.sin(angle));
			z =  Math.round(Math.cos(angle));
		}
		
		// If a change occurred
		if (x !== 0 || z !== 0) {
			var newA = add(this.active.a, vec3( x, 0, z ));
			var newB = add(this.active.b, vec3( x, 0, z ));
			var newC = add(this.active.c, vec3( x, 0, z ));
			
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
		
		// Free fall Tromino
		if (eatKey(" ".charCodeAt(0))) {
			while (spatialManager.canDrop(main.active)) {
				main.active.a[1]--;
				main.active.b[1]--;
				main.active.c[1]--;
			}
			// Let dropTromino handle the rest
			return this.dropTromino();
		}
		
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
			if (this.gameOver) drawTexObject(texCube, mv, "gray");
			else drawTexObject(texCube, mv, "red");
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
		main.active.render(mv, mvstack);
		
		// Render inactive Trominos
		main.renderInactives(mv, mvstack);
		
		//requestAnimFrame( main.render );
	}
}