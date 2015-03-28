// ==============
// Grid Signaller
// ==============

var signaller = {
	
	numVertices: 30,
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
		this.square( 4, 5, 6, 7 ); // z negative
		this.square( 3, 2, 1, 0 ); // z positive
		this.square( 0, 1, 5, 4 ); // x negative
		this.square( 7, 6, 2, 3 ); // x positive
		this.square( 0, 4, 7, 3 ); // y negative
		
		// vertex array attribute buffer
		this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
		
		// texture array attribute buffer
		this.tBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.tex), gl.STATIC_DRAW );
		
		// texture image
		this.image = document.getElementById("texGray");
	},

	square: function (a, b, c, d) {
		var indices = [a, d, b, b, d, c];
		var texDex = [0, 3, 1, 1, 3, 2];
		
		for (var i in indices) {
			this.points.push(this.vertices[indices[i]]);
			this.tex.push(this.texCoords[texDex[i]]);
		}
	},
	
	drawAt: function (mv, mvstack, x, y, z) {
		gl.enableVertexAttribArray( vTexCoord );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
		
		configureTexture(this.image);
		gl.uniform1i( gl.getUniformLocation( program, "isTexture"), 1 );
		
		// z negative
		mvstack.push(mv);
		mv = mult( mv, translate( x, y, 1.001 ) );
		gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 0, 6 );
		mv = mvstack.pop();
		
		// z positive
		mvstack.push(mv);
		mv = mult( mv, translate( x, y, 5.999 ) );
		gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 6, 6 );
		mv = mvstack.pop();
		
		// x negative
		mvstack.push(mv);
		mv = mult( mv, translate( 1.001, y, z ) );
		gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 12, 6 );
		mv = mvstack.pop();
		
		// x positive
		mvstack.push(mv);
		mv = mult( mv, translate( 5.999, y, z ) );
		gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 18, 6 );
		mv = mvstack.pop();
		
		// y negative
		mvstack.push(mv);
		mv = mult( mv, translate( x, 1.001, z ) );
		gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 24, 6 );
		mv = mvstack.pop();
		
		gl.disableVertexAttribArray( vTexCoord );
	}
}