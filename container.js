var container = {
	
	length: 6,
	width: 6,
	height: 20,
	
	numVertices: 36,
	points: [],
	tex: [],
	
	vertices: [
		vec4( -1.0, -1.0, -1.0, 1.0),
		vec4( -1.0,  1.0, -1.0, 1.0),
		vec4(  1.0,  1.0, -1.0, 1.0),
		vec4(  1.0, -1.0, -1.0, 1.0),
		vec4( -1.0, -1.0,  1.0, 1.0),
		vec4( -1.0,  1.0,  1.0, 1.0),
		vec4(  1.0,  1.0,  1.0, 1.0),
		vec4(  1.0, -1.0,  1.0, 1.0)
	],
	
	init: function() {
		
		// Create texture coordinates
		this.wallTexCoords = [
			vec2(0.0*this.length, 0.0*this.height), 
			vec2(0.0*this.length, 1.0*this.height), 
			vec2(1.0*this.length, 1.0*this.height), 
			vec2(1.0*this.length, 0.0*this.height)
		];
		
		this.floorTexCoords = [
			vec2(0.0*this.length, 0.0*this.width), 
			vec2(0.0*this.length, 1.0*this.width), 
			vec2(1.0*this.length, 1.0*this.width), 
			vec2(1.0*this.length, 0.0*this.width)
		];
		
		
		// Create points
		this.square( 2, 3, 0, 1 ); // z wall
		this.square( 7, 6, 5, 4 ); // z wall
		this.square( 3, 2, 6, 7 ); // x wall
		this.square( 4, 5, 1, 0 ); // x wall
		this.square( 0, 3, 7, 4 ); // y up floor
		this.square( 0, 4, 7, 3 ); // y down floor
		
		// vertex array attribute buffer
		this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
		
		// texture array attribute buffer
		this.tBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.tex), gl.STATIC_DRAW );
		
		// texture images
		this.imageGreen = document.getElementById("texGreen");
		this.imageBlue = document.getElementById("texBlue");
		this.imageYellow = document.getElementById("texYellow");
	},

	square: function (a, b, c, d) {
		var indices = [a, d, b, b, d, c];
		var texDex = [0, 3, 1, 1, 3, 2];
		
		for (var i in indices) {
			this.points.push(this.vertices[indices[i]]);
			if (a === 0) this.tex.push(this.floorTexCoords[texDex[i]]);
			else this.tex.push(this.wallTexCoords[texDex[i]]);
		}
	},
	
	render: function (mv, mvstack) {
		gl.enableVertexAttribArray( vTexCoord );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
		
		mvstack.push(mv);
		mv = mult( mv, translate( 3.5, 10.5, 3.5 ) );
		mv = mult( mv, scale4( 3.0, 10.0, 3.0 ) );
		gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
		
		// z wall
		configureTexture(this.imageBlue);
		gl.drawArrays( gl.TRIANGLES, 0, 12 );
		
		// x wall
		configureTexture(this.imageGreen);
		gl.drawArrays( gl.TRIANGLES, 12, 12 );
		
		// y up floor
		configureTexture(this.imageYellow);
		gl.drawArrays( gl.TRIANGLES, 24, 6 );
		// y down floor
		gl.drawArrays( gl.TRIANGLES, 30, 6 );
		mv = mvstack.pop();
		
		gl.disableVertexAttribArray( vTexCoord );
	}
}