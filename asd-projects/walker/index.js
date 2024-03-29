/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 120;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  
  var KEY = { // setting keyboard events to numbers, avoinding magic numbers
    'ENTER': 13, 
    'UP': [38, 87],
    'DOWN': [40, 83],
    'LEFT': [37, 65],
    'RIGHT': [39, 68],
  }
  
  //////////////////////////// Game Item Objects /////////////////////////////////

  // initial box coordinates
  var posX = 0 
  var posY = 0

  //initial speed values
  var speedX = 0
  var speedY = 0

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleRelease)
  var $board = {
    'width': $('board').width(),
    'height': $('board').height()
  }
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() { 
    repositionGameItem() //moves the box
    redrawGameItem() //draws the box
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    keyPress(event, 2.5)
  }

  function handleRelease(event) {
    keyPress(event, 0)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
  function repositionGameItem() { 
    //moves the box
    posX += speedX
    posY += speedY 
  }

  function redrawGameItem() { 
    //draws the box as it moves
    $('#box').css("top", posY)
    $('#box').css("left", posX) 
  }

  function keyPress(event, speed) {
    //cheking up arrow
    if (event.which === KEY.UP[0] || event.which === KEY.UP[1]) {
      speedY = -speed
    } 
    //checking down arrow
    else if (event.which === KEY.DOWN[0] || event.which === KEY.DOWN[1]) {
      speedY = speed
    } 
    //checking left arrow
    else if (event.which === KEY.LEFT[0] || event.which === KEY.LEFT[1]) {
      speedX = -speed
    } 
    //checking right arrow
    else if (event.which === KEY.RIGHT[0] || event.which === KEY.RIGHT[1]) {
      speedX = speed
    }
  }

}
