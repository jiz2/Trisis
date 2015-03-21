// =============
// Point of View
// =============

function handlePOV() {

	// Zoom limit
	if ( zDist < 10 ) zDist = 10.0;
	if ( zDist > 15 ) zDist = 15.0;
	
	// Elevation limit
	if ( spinX < -45 ) spinX = -45;
	if ( spinX > 70 ) spinX = 70;
}