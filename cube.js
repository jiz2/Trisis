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
		this.square( 1, 0, 3, 2 );
		this.square( 2, 3, 7, 6 );
		this.square( 3, 0, 4, 7 );
		this.square( 6, 5, 1, 2 );
		this.square( 4, 5, 6, 7 );
		this.square( 5, 4, 0, 1 );

		// color array attribute buffer
		this.cBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW );
		
		// vertex array attribute buffer
		this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
	},

	square: function (a, b, c, d) {

		var indices = [ a, b, c, a, c, d ];

		for ( var i = 0; i < indices.length; ++i ) {
			this.points.push( this.vertices[indices[i]] );
			//this.colors.push( this.vertexColors[indices[i]] );
		
			// for solid colored faces use 
			this.colors.push(this.vertexColors[a]);
		}
	}
}