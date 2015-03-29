//****************************************************//
//           Computer Graphics - Spring 2015          //
//                 Project 3 - TRISIS                 //
//           By Jianfei Zheng & Troy Porter           //
//****************************************************//

// ==========
// Initialize
// ==========
window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
	
	gl.enable( gl.BLEND );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
//    gl.blendFunc( gl.SRC_ALPHA, gl.DST_ALPHA );
//    gl.blendFunc( gl.ONE, gl.DST_ALPHA );
    //gl.blendFunc( gl.SRC_ALPHA, gl.ONE );
//    gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA );
	
	// ==================
	// Initialize objects
	// ==================
	colorCube.init();
	texCube.init();
	container.init();
	signaller.init();
	
	
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.enableVertexAttribArray( vPosition );
    vColor = gl.getAttribLocation( program, "vColor" );
	vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
	
    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

	var proj = perspective( 90.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));

    // ====================
	// Mouse Control Handle
	// ====================
	window.oncontextmenu = function (e) {
		e.preventDefault();
	};
	
	window.addEventListener("blur", function(e){
		movement = false;
		document.body.style.cursor = 'auto';
		e.preventDefault();
	});

	canvas.addEventListener("mousedown", function(e){
		if (e.button === 0) {
			movement = true;
			origX = e.offsetX;
			origY = e.offsetY;
			document.body.style.cursor = 'none';
		}
        e.preventDefault();         // Disable drag and drop
    });
	
	window.addEventListener("mouseup", function(e){
		if (e.button > 0) {
			movement = false;
			document.body.style.cursor = 'auto';
		}
        e.preventDefault();         // Disable drag and drop
    });

    window.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY = ( spinY + (e.offsetX - origX) )%360;
            spinX = ( spinX - (origY - e.offsetY) )%360;
            origX = e.offsetX;
            origY = e.offsetY;
			main.render();
        }
    });
	
    window.addEventListener("mousewheel", function(e){
		if (movement) {
			if( e.wheelDelta > 0.0 ) pov.zDist -= 0.5;
			else pov.zDist += 0.5;
			e.preventDefault();
		}
    });  
    
	// =========================
	// Keyboard movement control
	// =========================
	window.addEventListener("keydown", function(e){
		e.preventDefault();
		g_keys[e.keyCode] = true;
		main.moveTromino();
		main.rotateTromino();
    });
	
	window.addEventListener("keyup", function(e){
		g_keys[e.keyCode] = false;
    });
	
	// ==============
	// Start Mainloop
	// ==============
    main.init();
}