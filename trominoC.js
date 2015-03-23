// =========
// Tromino C
// =========

var halfPi = Math.PI/2;

function TrominoC() {
	this.cX=3;
	this.cY=18;
	this.cZ=3;
	this.theta1=90;
	this.theta2=270;
	

	switch (Math.floor(Math.random()*12)){
		case(0): //looks like an L
			this.aX = this.cX;
			this.aY = this.cY+1;
			this.aZ = this.cZ;
			this.bX = this.cX+1;
			this.bY = this.cY;
			this.bZ = this.cZ;
			this.theta1=90;
			this.theta2=270;
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

/*RotationTypes: 0: x-axis, positive
				 1: y-axis, positive
				 2: z-axis, positive
				 3: x-axis, negative
				 4: y-axis, negative
				 5: z-axis, negative 
*/

TrominoC.prototype.rotate = function (rotationType) {

	switch(rotationType) {
		case(0): //rotate on x-axis, positive direction
		{
			this.theta1=this.theta1+halfPi;
			this.aY=this.cY+Math.sin(this.theta1);
			this.theta2=this.theta2+halfPi;
			this.bZ=this.cZ+math.cos(this.theta2);
			if (this.theta1===360) {this.theta1=0;}
			if (this.theta2===360) {this.theta2=0;}
			break;
		}
		case(1): rotate on y-axis, positive direction
		{}
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
