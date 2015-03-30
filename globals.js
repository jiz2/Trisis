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

var program;
var vPosition;
var vColor;
var vTexCoord;

var proLoc;
var mvLoc;

var g_keys = [];

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var score = 0;
var maxHeight = 0;