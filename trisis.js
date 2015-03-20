//****************************************************//
//           Computer Graphics - Spring 2015          //
//                 Project 3 - TRISIS                 //
//           By Jianfei Zheng & Troy Porter           //
//****************************************************//

// ================
// Global Variables
// ================
var canvas;
var gl;

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = 0.1;
var xPos = 0.0;
var yPos = 0.0;
var zPos = 5.0;

var vPosition;
var vColor;

var proLoc;
var mvLoc;

var g_keys = [];
var g_gridOn = false;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var cstack = [];
var cstackIndex = 1;

// =========
// Utilities
// =========

// Usage: loadObject(vertexObject)
// Pre:   vertexObject is an object that has its own vertex buffer
// Post:  loads vertexObject into vPosition
function loadObject(vertexObject) {
	if (vertexObject.vBuffer) {
		gl.bindBuffer( gl.ARRAY_BUFFER, vertexObject.vBuffer );
	} else throw "trying to load non-existing object";
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
}

// Usage: loadColor(colorObject, newColor)
// Pre:   colorObject is an object that has its own color buffer,
//        newColor is the new color to use on the colorObject
// Post:  if newColor exists then loads newColor into vColor
//        else color of colorObject is loaded into vColor
function loadColor(colorObject, newColor) {
	if (!newColor) {
		gl.bindBuffer( gl.ARRAY_BUFFER, colorObject.cBuffer );
	} else if ("red".localeCompare(newColor) === 0) {
		gl.bindBuffer( gl.ARRAY_BUFFER, cstack[0] );
	} else if (cstack[cstackIndex]) {
		gl.bindBuffer( gl.ARRAY_BUFFER, cstack[cstackIndex] );
	} else {
		var newColorBuffer = gl.createBuffer();
		var colors = [];
		for (var i in colorObject.colors)
			colors.push(newColor);
		gl.bindBuffer( gl.ARRAY_BUFFER, newColorBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
		cstack[cstackIndex] = newColorBuffer;
	}
	cstackIndex++;
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
}

// Usage: drawObject(vertexObject, mv)
// Pre:   vertexObject is an object that has its own vertex buffer
//        mv is the modelview matrix
// Post:  loads vertexObject into vPosition and draws it
function drawObject(vertexObject, mv) {
	gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
	loadObject(vertexObject);
	gl.drawArrays( gl.TRIANGLES, 0, vertexObject.numVertices)
}

// Usage: eatKey(keyCode)
// Pre:   keyCode is the ASCII char on the keyboard
// Post:  single-signal true of a button press
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
}

//----------------------------------------------------------------------------
// Define the transformation scale here (two scale functions in MV.js)
function scale4( x, y, z ) {
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

// ==========
// Initialize
// ==========
window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.8, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
	
	var cstackRed = [];
	for (var i = 0; i < 108; i++)
		cstackRed.push(vec4(1.0, 0.0, 0.0, 1.0));
	
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	var cstackBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cstackBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cstackRed), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.enableVertexAttribArray( vPosition );
    vColor = gl.getAttribLocation( program, "vColor" );
	gl.enableVertexAttribArray( vColor );
	
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
	
	window.addEventListener("mousedown", function(e){
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
        }
    });
	
    window.addEventListener("mousewheel", function(e){
		if (movement) {
			if( e.wheelDelta > 0.0 ) zDist -= 0.2;
			else zDist += 0.2;
			e.preventDefault();
		}
    });  
    
	// =========================
	// Keyboard movement control
	// =========================
	window.addEventListener("keydown", function(e){
		g_keys[e.keyCode] = true;
    });
	
	window.addEventListener("keyup", function(e){
		g_keys[e.keyCode] = false;
    });
	
	// ==================
	// Initialize objects
	// ==================
	cstack.push(cstackBuffer);
	cube.init();

    render();
}

// =======
// Objects
// =======

// Cube Object
// -----------
var cube = {
	
	numVertices: 36,
	points: [],
	colors: [],
	
	vertices: [
		vec3( -0.5, -0.5,  0.5 ),
		vec3( -0.5,  0.5,  0.5 ),
		vec3(  0.5,  0.5,  0.5 ),
		vec3(  0.5, -0.5,  0.5 ),
		vec3( -0.5, -0.5, -0.5 ),
		vec3( -0.5,  0.5, -0.5 ),
		vec3(  0.5,  0.5, -0.5 ),
		vec3(  0.5, -0.5, -0.5 )
	],

	vertexColors: [
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 1.0, 0.3, 0.3, 1.0 ),  // fading red
		vec4( 0.8, 0.8, 0.0, 1.0 ),  // yellow
		vec4( 0.2, 1.0, 0.2, 1.0 ),  // green
		vec4( 0.3, 0.3, 1.0, 1.0 ),  // blue
		vec4( 0.8, 0.2, 0.8, 1.0 ),  // magenta
		vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
		vec4( 1.0, 1.0, 1.0, 1.0 )   // white
	],
	
	init: function() {
		this.quad( 1, 0, 3, 2 );
		this.quad( 2, 3, 7, 6 );
		this.quad( 3, 0, 4, 7 );
		this.quad( 6, 5, 1, 2 );
		this.quad( 4, 5, 6, 7 );
		this.quad( 5, 4, 0, 1 );

		// color array attribute buffer
		this.cBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW );
		
		// vertex array attribute buffer
		this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
	},

	quad: function (a, b, c, d) {

		var indices = [ a, b, c, a, c, d ];

		for ( var i = 0; i < indices.length; ++i ) {
			this.points.push( this.vertices[indices[i]] );
			//this.colors.push( this.vertexColors[indices[i]] );
		
			// for solid colored faces use 
			this.colors.push(this.vertexColors[a]);
		}
	}
}

// ===============
// Frame and Floor
// ===============
var frameNfloor = {
	height: 5.0,
	width: 3.0,
	dColor: vec4(.55, .45, 0.35, 1.0),
	fColor: vec4(0.85, 0.85, 0.85, 1.0),

	render: function(mv, mvstack) {
		
		// Floor
		// =====
		mvstack.push(mv);
		mv = mult( mv, translate( 0.0, -this.height/2, 0.0 ) );
		mv = mult( mv, scale4( 20.0, 0.001, 20.0 ) );
		loadColor(cube, this.fColor);
		drawObject(cube, mv);
		mv = mvstack.pop();
	}
}

// ======
// Person
// ======
function renderPerson(mv, mvstack) {
	mvstack.push(mv);
	loadColor(cube, vec4(0.0, 0.0, 0.0, 0.2));
	var rotLimbs = 0;
	mv = mult( mv, translate( xPos, yPos-1.1, zPos ) );
	mv = mult( mv, rotate( parseFloat(-spinY), [0, 1, 0] ) );
	mv = mult( mv, scale4( 1.5, 1.5, 1.5 ) );
	var overlapOffset = 0.001;
	var armsMod = rotLimbs/90*0.2*0.5 + overlapOffset;
	var legsMod = rotLimbs/90*0.22*0.5 + overlapOffset;
	
    // draw head
	mvstack.push(mv);
	mv = mult( mv, translate( 0.0, 0.7, 0.0 ) );
    mv = mult( mv, scale4( 0.3, 0.3, 0.3 ) );
    drawObject(cube, mv);
	mv = mvstack.pop();
	
    // draw body
	mvstack.push(mv);
    mv = mult( mv, translate( 0.0, 0.2, 0.0 ) );
    mv = mult( mv, scale4( 0.5, 0.7, 0.3 ) );
    drawObject(cube, mv);
	mv = mvstack.pop();
	
    // draw arms
	mvstack.push(mv);
    mv = mult( mv, translate( -0.25+armsMod, 0.2+0.5*0.7-armsMod*2, 0.0 ) );
	mv = mult( mv, rotate( -rotLimbs, [ 0, 0, 1 ]) );
    mv = mult( mv, scale4( 0.2, 0.6, 0.2 ) );
	mv = mult( mv, translate( -0.5, -0.5, 0.0 ) );
    drawObject(cube, mv);
	mv = mvstack.pop();
	
	mvstack.push(mv);
	mv = mult( mv, translate( 0.25-armsMod, 0.2+0.5*0.7-armsMod*2, 0.0 ) );
	mv = mult( mv, rotate( rotLimbs, [ 0, 0, 1 ]) );
    mv = mult( mv, scale4( 0.2, 0.6, 0.2 ) );
	mv = mult( mv, translate( 0.5, -0.5, 0.0 ) );
    drawObject(cube, mv);
	mv = mvstack.pop();
	
    // draw legs
	mvstack.push(mv);
	mv = mult( mv, translate( -0.12, 0.2-0.5*0.7+legsMod, 0.0 ) );
	mv = mult( mv, rotate( -rotLimbs, [ 0, 0, 1 ]) );
    mv = mult( mv, scale4( 0.22, 0.8, 0.22 ) );
	mv = mult( mv, translate( 0.0, -0.5, 0.0 ) );
    drawObject(cube, mv);
	mv = mvstack.pop();
	
	mvstack.push(mv);
	mv = mult( mv, translate( 0.12, 0.2-0.5*0.7+legsMod, 0.0 ) );
	mv = mult( mv, rotate( rotLimbs, [ 0, 0, 1 ]) );
    mv = mult( mv, scale4( 0.22, 0.8, 0.22 ) );
	mv = mult( mv, translate( 0.0, -0.5, 0.0 ) );
    drawObject(cube, mv);
	mv = mvstack.pop();
	mv = mvstack.pop();
}

// =======
// Handles
// =======
function handlePOV() {
	// Key events
	if ( g_keys['W'.charCodeAt(0)] ) {
		xPos -= 0.1*Math.sin(-spinY*Math.PI/180);
		zPos -= 0.1*Math.cos(-spinY*Math.PI/180);
	}
	if ( g_keys['S'.charCodeAt(0)] ) {
		xPos += 0.1*Math.sin(-spinY*Math.PI/180);
		zPos += 0.1*Math.cos(-spinY*Math.PI/180);
	}
	if ( g_keys['A'.charCodeAt(0)] ) {
		xPos -= 0.1*Math.cos(-spinY*Math.PI/180);
		zPos += 0.1*Math.sin(-spinY*Math.PI/180);
	}
	if ( g_keys['D'.charCodeAt(0)] ) {
		xPos += 0.1*Math.cos(-spinY*Math.PI/180);
		zPos -= 0.1*Math.sin(-spinY*Math.PI/180);
	}
	if ( g_keys['Q'.charCodeAt(0)] ) 
		yPos += 0.1;
	if ( g_keys['E'.charCodeAt(0)] ) 
		yPos -= 0.1;

	// Position limits
	if ( xPos < -10 ) xPos = -10.0;
	if ( xPos > 10 ) xPos = 10.0;
	if ( yPos < -1 ) yPos = -1.0;
	if ( yPos > 5 ) yPos = 5.0;
	if ( zPos < -10 ) zPos = -10.0;
	if ( zPos > 10 ) zPos = 10.0;
	
	// Zoom limit
	if ( zDist < 0.1 ) zDist = 0.1;
	if ( zDist > 5 ) zDist = 5.0;
	
	// Elevation limit
	if ( spinX < -70 ) spinX = -70;
	if ( spinX > 70 ) spinX = 70;
}

// =======
// Renders
// =======
function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Handle POV Movement
	handlePOV();
	
	var mvstack = [];

	// Point of View
	var mv = lookAt( vec3(xPos, yPos, zPos+zDist), vec3(xPos, yPos, zPos), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, translate( xPos, yPos, zPos ) );
	mv = mult( mv, rotate( parseFloat(spinX), [1, 0, 0] ) );
    mv = mult( mv, rotate( parseFloat(spinY), [0, 1, 0] ) );
	mv = mult( mv, translate( -xPos, -yPos, -zPos ) );
	
	// Person
	renderPerson(mv, mvstack);

	// Frame and Floor
	frameNfloor.render(mv, mvstack);
	var frame = frameNfloor.getHnW();
	var height = frame.height;
	var width = frame.width;
	var barThickness = 0.05;
	var barWidth = width*2/3;

	// Reset indices
	cstackIndex = 1;

    requestAnimFrame( render );
}