// Cube Object
// -----------

var texCube = {
	
	numVertices: 36,
	points: [],
	tex: [],
	
	vertices: [
		vec4( -0.5, -0.5,  0.5, 1.0),
		vec4( -0.5,  0.5,  0.5, 1.0),
		vec4(  0.5,  0.5,  0.5, 1.0),
		vec4(  0.5, -0.5,  0.5, 1.0),
		vec4( -0.5, -0.5, -0.5, 1.0),
		vec4( -0.5,  0.5, -0.5, 1.0),
		vec4(  0.5,  0.5, -0.5, 1.0),
		vec4(  0.5, -0.5, -0.5, 1.0)
	],

	texCoords: [
		vec2(0.0, 0.0), 
		vec2(0.0, 1.0), 
		vec2(1.0, 1.0), 
		vec2(1.0, 0.0)
	],
	
	init: function() {
		
		// Create points
		this.square( 0, 1, 2, 3 );
		this.square( 3, 2, 6, 7 );
		this.square( 7, 6, 5, 4 );
		this.square( 4, 5, 1, 0 );
		this.square( 1, 5, 6, 2 );
		this.square( 7, 4, 0, 3 );
		
		// vertex array attribute buffer
		this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
		
		// texture array attribute buffer
		this.tBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.tex), gl.STATIC_DRAW );
		
		// texture image
		this.image = document.getElementById("texWhite");
		this.imageRed = document.getElementById("texRed");
		this.imageGray = document.getElementById("texGray");
	},

	square: function (a, b, c, d) {
		var indices = [a, d, b, b, d, c];
		var texDex = [0, 3, 1, 1, 3, 2];
		
		for (var i in indices) {
			this.points.push(this.vertices[indices[i]]);
			this.tex.push(this.texCoords[texDex[i]]);
		}
	}
}