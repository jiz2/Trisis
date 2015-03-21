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

var zDist = 7.0;
var xPos = 3.5;
var yPos = 10.0;
var zPos = 3.5;

var vPosition;
var vColor;
var vTexCoord;

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