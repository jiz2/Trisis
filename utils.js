// =========
// Utilities
// =========

// Usage: eatKey(keyCode)
// Pre:   keyCode is the ASCII char code on the keyboard
// Post:  single-signal true of a button press
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
}

// Usage: rotateBy(relativePos, degAngle, axis)
// Pre:   relativePos is the position, degAngle is the angle
//        axis is the rotation axis
// Post:  rotates relativePos degAngle degrees by axis
function rotateBy(relativePos, degAngle, axis) {
	var matPos = mat4(
		relativePos[0], 0, 0, 0,
		relativePos[1], 0, 0, 0,
		relativePos[2], 0, 0, 0,
		0, 0, 0, 1
	);
	var rotMat = mult( rotate( degAngle, axis ), matPos );
	return vec3( rotMat[0][0], rotMat[1][0], rotMat[2][0] );
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

//---------------------------------------------------------------------------
// Configure the given texture image
function configureTexture( image ) {
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
	
    gl.generateMipmap( gl.TEXTURE_2D );
//    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
//    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );

//    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
//    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST );
//    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
	
//    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEREAST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}

//---------------------------------------------------------------------------
// Load and draw for Color Objects

// Usage: loadObject(vertexObject)
// Pre:   vertexObject is an object that has its own vertex buffer
// Post:  loads vertexObject into vPosition
function loadObject(vertexObject) {
	if (vertexObject.vBuffer) {
		gl.bindBuffer( gl.ARRAY_BUFFER, vertexObject.vBuffer );
		gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	} else throw "trying to load non-existing object";
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
		for (var i in colorObject.points)
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
	gl.enableVertexAttribArray( vColor );
	gl.uniform1i( gl.getUniformLocation( program, "isTexture"), 0 );
	loadObject(vertexObject);
	gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
	gl.drawArrays( gl.TRIANGLES, 0, vertexObject.numVertices);
	gl.disableVertexAttribArray( vColor );
}

//----------------------------------------------------------------------------
// Load and draw for Texture Objects

// Usage: loadTexObject(texObject)
// Pre:   texObject is an object that has its own vertex and texture buffer
// Post:  loads texObject into vPosition
function loadTexObject(texObject) {
	if (texObject.vBuffer) {
		gl.bindBuffer( gl.ARRAY_BUFFER, texObject.vBuffer );
		gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	} else throw "trying to load non-existing object";
	
	if (texObject.tBuffer) {
		gl.bindBuffer( gl.ARRAY_BUFFER, texObject.tBuffer );
		gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
	} else throw "trying to load non-texture object";
}

// Usage: drawTexObject(texObject, mv)
// Pre:   texObject is an object that has its own vertex and texture buffer
//        mv is the modelview matrix
// Post:  loads texObject and its texture and draws it
function drawTexObject(texObject, mv, inactive) {
	gl.enableVertexAttribArray( vTexCoord );
	gl.uniform1i( gl.getUniformLocation( program, "isTexture"), 1 );
	loadTexObject(texObject);
	if (inactive) configureTexture(texObject.imageRed);
	else configureTexture(texObject.image);
	gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
	gl.drawArrays( gl.TRIANGLES, 0, texObject.numVertices);
	gl.disableVertexAttribArray( vTexCoord );
}