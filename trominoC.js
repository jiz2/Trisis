// =========
// Tromino C
// =========

function TrominoC() {

	this.c = vec3( 3.0, 19.0, 3.0 );

	switch (Math.floor(Math.random()*12)){
		case(0): //looks like an L
			this.a = vec3( this.c[0], this.c[1] + 1, this.c[2] );
			this.b = vec3( this.c[0] + 1, this.c[1], this.c[2] );
			break;
		case(1): // Looks like an an L, pointing in negative direction on Z-axis
			this.a = vec3( this.c[0], this.c[1] + 1, this.c[2] );
			this.b = vec3( this.c[0], this.c[1], this.c[2] - 1 );
			break;
		case(2): // Looks like _\,
			this.a = vec3( this.c[0], this.c[1] + 1, this.c[2] );
			this.b = vec3( this.c[0] - 1, this.c[1], this.c[2] );
			break;
		case(3): // Looks like an L, pointing in positive direction on Z-axis
			this.a = vec3( this.c[0], this.c[1] + 1, this.c[2] );
			this.b = vec3( this.c[0], this.c[1], this.c[2] + 1 );
			break;
		case(4): // upside-down L
			this.a = vec3( this.c[0] + 1, this.c[1], this.c[2] );
			this.b = vec3( this.c[0], this.c[1] - 1, this.c[2] );
			break;
		case(5): // upside-down L, pointing in negative direction on Z-axis
			this.a = vec3( this.c[0], this.c[1], this.c[2] - 1 );
			this.b = vec3( this.c[0], this.c[1] - 1, this.c[2] );
			break;
		case(6): // _| upside down
			this.a = vec3( this.c[0] - 1, this.c[1], this.c[2] );
			this.b = vec3( this.c[0], this.c[1] - 1, this.c[2] );
			break;
		case(7): //upside-down L pointing in positive direction Z-axis
			this.a = vec3( this.c[0], this.c[1], this.c[2] + 1 );
			this.b = vec3( this.c[0], this.c[1] - 1, this.c[2] );
			break;
		case(8): //laying sideways, box A on positive z-axis
			this.a = vec3( this.c[0], this.c[1], this.c[2] + 1 );
			this.b = vec3( this.c[0] + 1, this.c[1], this.c[2] );
			break;
		case(9): //laying sideways, box A on positive x-axis
			this.a = vec3( this.c[0] + 1, this.c[1], this.c[2] );
			this.b = vec3( this.c[0], this.c[1], this.c[2] - 1 );
			break;
		case(10): //laying sideways, box A on negative z-axis
			this.a = vec3( this.c[0], this.c[1], this.c[2] - 1 );
			this.b = vec3( this.c[0] - 1, this.c[1], this.c[2] );
			break;
		case(11): //laying sideways, box A on negative x-axis
			this.a = vec3( this.c[0] - 1, this.c[1], this.c[2] );
			this.b = vec3( this.c[0], this.c[1], this.c[2] + 1 );
	}
}

TrominoC.prototype.render = function (mv, mvstack) {
	//Render A
	signaller.drawAt(mv, mvstack, this.a[0], this.a[1], this.a[2]);
	mvstack.push(mv);
	mv = mult(mv, translate(this.a[0], this.a[1], this.a[2]));
	drawTexObject(texCube,mv);
	mv=mvstack.pop();

	//Render B
	signaller.drawAt(mv, mvstack, this.b[0], this.b[1], this.b[2]);
	mvstack.push(mv);
	mv = mult( mv, translate( this.b[0], this.b[1], this.b[2] ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();

	// Render C
	signaller.drawAt(mv, mvstack, this.c[0], this.c[1], this.c[2]);
	mvstack.push(mv);
	mv = mult( mv, translate( this.c[0], this.c[1], this.c[2] ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();
}
