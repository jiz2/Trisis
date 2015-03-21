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