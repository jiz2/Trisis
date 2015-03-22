// =======
// Renders
// =======

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var mvstack = [];
	var mv = pov.getMV();
	
	mvstack.push(mv);
	mv = mult( mv, translate( 3.5, 9.5, 3.5 ) );
	mv = mult( mv, scale4( 3.0, 10.0, 3.0 ) );
	container.render(mv, mvstack);
	mv = mvstack.pop();
	
	trominoI = new TrominoI();
	trominoI.render(mv, mvstack);
	
	
	// Reset indices
	cstackIndex = 1;

    requestAnimFrame( render );
}