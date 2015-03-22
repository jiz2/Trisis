// =========
// Tromino I
// =========

function TrominoI () {
	this.cX = 3;
	this.cZ = 3;
	this.cY = 18;
	
	// ---- | ---- | ---- //
	//  A   |  C   |  B   //
	// ---- | ---- | ---- //
	
	switch (Math.floor(Math.random()*3)) {
		case(0): // on y axis
			this.aX = this.cX;
			this.aY = this.cY + 1;
			this.aZ = this.cZ;
			this.bX = this.cX;
			this.bY = this.cY - 1;
			this.bZ = this.cZ;
			break;
		case(1): // on x axis
			this.aX = this.cX - 1;
			this.aY = this.cY;
			this.aZ = this.cZ;
			this.bX = this.cX + 1;
			this.bY = this.cY;
			this.bZ = this.cZ;
			break;
		case(2): // on z axis
			this.aX = this.cX;
			this.aY = this.cY;
			this.aZ = this.cZ - 1;
			this.bX = this.cX;
			this.bY = this.cY;
			this.bZ = this.cZ + 1;
			break;
	}
}
TrominoI.prototype.render = function (mv, mvstack) {
	// Render A
	signaller.drawAt(mv, mvstack, this.aX, this.aY, this.aZ);
	mvstack.push(mv);
	mv = mult( mv, translate( this.aX, this.aY, this.aZ ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();
	
	// Render B
	signaller.drawAt(mv, mvstack, this.bX, this.bY, this.bZ);
	mvstack.push(mv);
	mv = mult( mv, translate( this.bX, this.bY, this.bZ ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();

	// Render C
	signaller.drawAt(mv, mvstack, this.cX, this.cY, this.cZ);
	mvstack.push(mv);
	mv = mult( mv, translate( this.cX, this.cY, this.cZ ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();

}