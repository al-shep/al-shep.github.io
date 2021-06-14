/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  
  const KEY = { // setting keyboard events to numbers, avoinding magic numbers
    'ENTER': 13, 
    'UP': [38, 87],
    'DOWN': [40, 83],
    'LEFT': [37, 65],
    'RIGHT': [39, 68],
  }
  
  //////////////////////////// Game Item Objects /////////////////////////////////

  var snakeArray = []
  
  
  var head = {
    id: NextID(),
    x: 100,
    y: 200,
    speedX: 0,
    speedY: 0,
  }
  snakeArray.push(head)

  var apple = {
    x: 200, 
    y: 200,
    width: 20,
    height: 20
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0083 seconds (120 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  //$(document).on('keyup', handleRelease)
  const $board = {
    'width': $('board').width(),
    'height': $('board').height()
  }

  //adds 5 body parts to the snake
  for (var i = 0; i < 6; i++) {
    addBody()
    }

  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() { 
    moveItems() //moves the game items
    drawItems() //draws the game items
    ateApple() //what to do if the apple is eaten
    stayInside() // 
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    keyPress(event, 20)
  }

  //function handleRelease(event) {
  //  keyPress(event, 0)
  //}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
  function moveItems() {
    // moves the snake's head
    head.x += head.speedX
    head.y += head.speedY
    // moves the snake's body
    for (var i = snakeLength(); i > 0; i--) {
      snakeArray[i].x = snakeArray[i-1].x
      snakeArray[i].y = snakeArray[i-1].y
    }
  }

  function drawItems() { 
    // draws the snake's head
    $('#head').css('top', head.y)
    $('#head').css('left', head.x)
    // draws the snake's body
    for (var i = 1; i <= snakeLength(); i++) { 
      $(snakeArray[i].id).css('top', snakeArray[i].y)
      $(snakeArray[i].id).css('left', snakeArray[i].x)
    }
    // draws the apple
    $('#apple').css('top', apple.y)
    $('#apple').css('left', apple.x)
  }

  function ateApple() {
    if ((head.posX >= apple.x) && (head.posX <= apple.x + apple.width)) {
      if ((head.posY >= apple.y) && (head.posY <= apple.y + apple.height)) {
        addBody()
        newApple()
      }
    } 
  }

  function snakeLength() {
    return snakeArray.length - 1
  }

  function keyPress(event, speed) { ////////////////////////////////////////translates keyPresses into movement
    if (event.which === KEY.UP[0] || event.which === KEY.UP[1]) {         //cheking up keys
      if (head.speedY === 0) {                                            //can't go up if moving down
        head.speedY = -speed
        head.speedX = 0
      }
    } 
    else if (event.which === KEY.DOWN[0] || event.which === KEY.DOWN[1]) { //checking down keys
      if (head.speedY === 0) {                                             //can't go down if moving up
        head.speedY = speed
        head.speedX = 0
      }
    }
    else if (event.which === KEY.LEFT[0] || event.which === KEY.LEFT[1]) { //checking left keys
      if (head.speedX === 0){                                              // can't go left if moving right
        head.speedX = -speed
        head.speedY = 0
      }
    } 
    else if (event.which === KEY.RIGHT[0] || event.which === KEY.RIGHT[1]) { //checking right keys
      if (head.speedX === 0) {                                               // can't go right if moving left
        head.speedX = speed
        head.speedY = 0
      }
    }
  }
  
  function addBody() {
    let newID = NextID()
    $('<div>').appendTo('#board').addClass('gameItem').addClass('body').attr('id', newID)
    return snakeArray.push({ //pushes additional body part
      //creates a new bodyPart
      id: '#' + newID,
      x: snakeArray[snakeLength()].x,
      y: snakeArray[snakeLength()].y,    
      speedX: snakeArray[snakeLength()].speedX,
      speedY: snakeArray[snakeLength()].speedY,
    } )
  }

  function newApple() { 
    // randomizes the location of the apple
    apple.y = Math.ceil(Math.random * $board.height)
    apple.x = Math.ceil(Math.random * $board.width)
    // ensures it doesn't land on the snake
    for (var i = 0; i <= snakeLength(); i++) {
      if (apple.y !== snakeArray[i].y) {

      }
    }
  }
  
  function NextID() {
    var base = 'body'
    return base + snakeArray.length
  }

  function stayInside() {

  }
  
}