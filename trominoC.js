// =========
// Tromino C
// =========

function TrominoC() {
	this.cX=3;
	this.cY=18;
	this.cZ=3;
	

	switch (Math.floor(Math.random()*12)){
		case(0): //looks like an L
			this.aX = this.cX;
			this.aY = this.cY+1;
			this.aZ = this.cZ;
			this.bX = this.cX+1;
			this.bY = this.cY;
			this.bZ = this.cZ;
			break;
		case(1): // Looks like an an L, pointing in negative direction on Z-axis
			this.aX = this.cX;
			this.aY = this.cY+1;
			this.aZ = this.cZ;
			this.bX = this.cX;
			this.bY = this.cY;
			this.bZ = this.cZ-1;
			break;
		case(2): // Looks like _\,
			this.aX=this.cX;
			this.aY=this.cY+1;
			this.aZ=this.cZ;
			this.bX=this.cX-1;
			this.bY= this.cY;
			this.bZ= this.cZ;
			break;
		case(3): // Looks like an L, pointing in positive direction on Z-axis
			this.aX=this.cX;
			this.aY=this.cY+1;
			this.aZ=this.cZ;
			this.bX=this.cX;
			this.bY= this.cY;
			this.bZ= this.cZ+1;
			break;
		case(4): // upside-down L
			this.aX=this.cX+1;
			this.aY=this.cY;
			this.aZ=this.cZ;
			this.bX=this.cX;
			this.bY= this.cY-1;
			this.bZ= this.cZ;
			break;
		case(5): // upside-down L, pointing in negative direction on Z-axis
			this.aX=this.cX+1;
			this.aY=this.cY;
			this.aZ=this.cZ-1;
			this.bX=this.cX;
			this.bY= this.cY-1;
			this.bZ= this.cZ;
			break;
		case(6): // _| upside down
			this.aX=this.cX-1;
			this.aY=this.cY;
			this.aZ=this.cZ;
			this.bX=this.cX;
			this.bY= this.cY-1;
			this.bZ= this.cZ;
			break;
		case(7): //upside-down L pointing in positive direction Z-axis
			this.aX=this.cX;
			this.aY=this.cY;
			this.aZ=this.cZ+1;
			this.bX=this.cX;
			this.bY= this.cY-1;
			this.bZ= this.cZ;
			break;
		case(8): //laying sideways, box A on positive z-axis
			this.aX=this.cX;
			this.aY=this.cY;
			this.aZ=this.cZ+1;
			this.bX=this.cX+1;
			this.bY= this.cY;
			this.bZ= this.cZ;
			break;
		case(9): //laying sideways, box A on positive x-axis
			this.aX=this.cX+1;
			this.aY=this.cY;
			this.aZ=this.cZ;
			this.bX=this.cX;
			this.bY= this.cY;
			this.bZ= this.cZ-1;
			break;
		case(10): //laying sideways, box A on negative z-axis
			this.aX=this.cX;
			this.aY=this.cY;
			this.aZ=this.cZ-1;
			this.bX=this.cX-1;
			this.bY= this.cY;
			this.bZ= this.cZ;
			break;
		case(11): //laying sideways, box A on negative x-axis
			this.aX=this.cX-1;
			this.aY=this.cY;
			this.aZ=this.cZ;
			this.bX=this.cX;
			this.bY= this.cY;
			this.bZ= this.cZ+1;
			break;
	}
}

TrominoC.prototype.render = function (mv, mvstack) {
	//Render A
	signaller.drawAt(mv, mvstack, this.aX, this.aY, this.aZ);
	mvstack.push(mv);
	mv = mult(mv, translate(this.aX, this.aY, this.aZ));
	drawTexObject(texCube,mv);
	mv=mvstack.pop();

	//Render B
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
