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
	var rotMat = rotate( degAngle, axis );
	var x = relativePos[0];
	var y = relativePos[1];
	var z = relativePos[2];
	var newX = rotMat[0][0] * x + rotMat[0][1] * y + rotMat[0][2] * z;
	var newY = rotMat[1][0] * x + rotMat[1][1] * y + rotMat[1][2] * z;
	var newZ = rotMat[2][0] * x + rotMat[2][1] * y + rotMat[2][2] * z;
	return vec3( newX, newY, newZ );
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

// Usage: drawTexObject(texObject, mv, color)
// Pre:   texObject is an object that has its own vertex and texture buffer
//        mv is the modelview matrix
//        color defined the color of the object [optional]
// Post:  loads texObject and its texture and draws it
function drawTexObject(texObject, mv, color) {
	gl.enableVertexAttribArray( vTexCoord );
	loadTexObject(texObject);
	if ("red".localeCompare(color) === 0) configureTexture(texObject.imageRed);
	else if ("gray".localeCompare(color) === 0) configureTexture(texObject.imageGray);
	else configureTexture(texObject.image);
	gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
	gl.drawArrays( gl.TRIANGLES, 0, texObject.numVertices);
	gl.disableVertexAttribArray( vTexCoord );
}