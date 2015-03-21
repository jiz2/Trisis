// =============
// Point of View
// =============

function handlePOV() {

	// Position limits
	if ( xPos < -10 ) xPos = -10.0;
	if ( xPos > 10 ) xPos = 10.0;
	if ( yPos < -1 ) yPos = -1.0;
	if ( yPos > 5 ) yPos = 5.0;
	if ( zPos < -10 ) zPos = -10.0;
	if ( zPos > 10 ) zPos = 10.0;
	
	// Zoom limit
	if ( zDist < 5 ) zDist = 5.0;
	if ( zDist > 10 ) zDist = 10.0;
	
	// Elevation limit
	if ( spinX < -70 ) spinX = -70;
	if ( spinX > 70 ) spinX = 70;
}