/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 120;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  var press = event.which // simplifying to 'press' so as to not have to type 'event.which' each time
  var KEY = { // setting keyboard events to numbers, avoinding magic numbers
    
    'ENTER': 13, 
    'UP': 38,
    'DOWN': 40,
    'LEFT': 37,
    'RIGHT': 39,
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
    //cheking up arrow
    if (press === KEY.UP) {
      speedY = -2.5;
    } 
    //checking down arrow
    else if (press === KEY.DOWN) {
      speedY = 2.5
    } 
    //checking left arrow
    else if (press === KEY.LEFT) {
      speedX = -2.5
    } 
    //checking right arrow
    else if (press === KEY.RIGHT) {
      speedX = 2.5
    }
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
}
