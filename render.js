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
	
	mvstack.push(mv);
	mv = mult( mv, translate( 3.0, 10.0, 5.0 ) );
	drawTexObject(texCube,mv);
	mv = mvstack.pop();
	
	/* mvstack.push(mv);
	mv = mult( mv, translate( 3.5, 0.0, 3.5 ) );
	mv = mult( mv, scale4( 6.0, 0.001, 6.0 ) );
	loadColor(colorCube, vec4( 0.8, 0.8, 0.8, 1.0 ));
	drawObject(colorCube, mv);
	mv = mvstack.pop(); */
	
	// Reset indices
	cstackIndex = 1;

    requestAnimFrame( render );
}