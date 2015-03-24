// =========
// Tromino I
// =========

function TrominoI () {
	this.c = vec3( 3.0, 18.0, 3.0 );
	
	// ---- | ---- | ---- //
	//  A   |  C   |  B   //
	// ---- | ---- | ---- //
	
	switch (Math.floor(Math.random()*3)) {
		case(0): // on y axis
			this.a = vec3( this.c[0], this.c[1] + 1, this.c[2] );
			this.b = vec3( this.c[0], this.c[1] - 1, this.c[2] );
			break;
		case(1): // on x axis
			this.a = vec3( this.c[0] - 1, this.c[1], this.c[2] );
			this.b = vec3( this.c[0] + 1, this.c[1], this.c[2] );
			break;
		case(2): // on z axis
			this.a = vec3( this.c[0], this.c[1], this.c[2] - 1 );
			this.b = vec3( this.c[0], this.c[1], this.c[2] + 1 );
			break;
	}
}
TrominoI.prototype.render = function (mv, mvstack) {
	// Render A
	signaller.drawAt(mv, mvstack, this.a[0], this.a[1], this.a[2]);
	mvstack.push(mv);
	mv = mult( mv, translate( this.a[0], this.a[1], this.a[2] ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();
	
	// Render B
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