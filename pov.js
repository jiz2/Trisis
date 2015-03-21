// =============
// Point of View
// =============

var pov = {
	
	zDist: 10.0,
	xPos: 3.5,
	yPos: 12.0,
	zPos: 3.5,

	getMV: function () {
		
		// Zoom limit
		if ( this.zDist < 10 ) this.zDist = 10.0;
		if ( this.zDist > 15 ) this.zDist = 15.0;
		
		// Elevation limit
		if ( spinX < -45 ) spinX = -45;
		if ( spinX > 70 ) spinX = 70;
		
		// Modelview
		var mv = lookAt(
			vec3(this.xPos, this.yPos, this.zPos+this.zDist), 
			vec3(this.xPos, this.yPos, this.zPos), 
			vec3(0.0, 1.0, 0.0)
		);
		mv = mult( mv, translate( this.xPos, this.yPos, this.zPos ) );
		mv = mult( mv, rotate( parseFloat(spinX), [1, 0, 0] ) );
		mv = mult( mv, rotate( parseFloat(spinY), [0, 1, 0] ) );
		mv = mult( mv, translate( -this.xPos, -this.yPos, -this.zPos ) );
		
		return mv;
	}
}