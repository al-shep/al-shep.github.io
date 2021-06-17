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
  
  // snakeArray will contain all the snake-body-objects
  let snakeArray = []

  //inital scores
  let score = 0
  let applesEaten = []
  
  //creates the first head and pushes it to snakeArray
  var head = {
    id: nextID('body', snakeArray),
    x: 100,
    y: 200,
    width: 20,
    height: 20,
    speedX: 0,
    speedY: 0,
  }
  snakeArray.push(head)

  //initial coordinates for the apple
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
    width: $('#board').width(),
    height: $('#board').height()
  }

  //adds 5 body parts to the snake
  for (var i = 0; i < 5; i++) {
    AddBody()
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
    ouch() //checks if the snake runs into the wall or attempts to eat itself
    ateApple() //what to do if the apple is eaten
    drawItems() //draws the game items
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

  function ateApple() { //what to do if the apple is or isn't eaten
    if (doCollide(apple, head)) {
      AddBody()         // adds a body object to snakeArray
      updateScore(true) // updates the score and applesEaten count
      newApple()        // randomizes the apple's location
    } else {
      updateScore(false) // doesn't update the score if the apple is eaten
    }
  }

  function ouch() { //detects if the snake ran into the wall or itself
    if (hitWall(head) || lethalVenom()) {
      endGame()
    }
  } 

  function snakeLength() { // shortens calling the length of snakeArray
    return snakeArray.length - 1
  }

  function keyPress(event, speed) { // translates keyPresses into movement
    if (event.which === KEY.UP[0] || event.which === KEY.UP[1]) {         //cheking up keys
      if (head.speedY === 0) {                                            //can't go up if moving down
        head.speedY = -speed                                              //changes speed to match keyPress
        head.speedX = 0                                                   //no diagonal movement allowed
      }
    } 
    else if (event.which === KEY.DOWN[0] || event.which === KEY.DOWN[1]) { //checking down keys
      if (head.speedY === 0) {                                             //can't go down if moving up
        head.speedY = speed                                                //changes speed to match keyPress                                                //no diagonal movement allowed
        head.speedX = 0                                                    //no diagonal movement allowed
      }
    }
    else if (event.which === KEY.LEFT[0] || event.which === KEY.LEFT[1]) { //checking left keys
      if (head.speedX === 0){                                              // can't go left if moving right
        head.speedX = -speed                                               //changes speed to match keyPress
        head.speedY = 0                                                    //no diagonal movement allowed
      }
    } 
    else if (event.which === KEY.RIGHT[0] || event.which === KEY.RIGHT[1]) { //checking right keys
      if (head.speedX === 0) {                                               // can't go right if moving left
        head.speedX = speed                                                  //changes speed to match keyPress
        head.speedY = 0                                                      //no diagonal movement allowed
      }
    }
  }
  
  function AddBody() {
    let newID = nextID('body', snakeArray) // variable to hold newID
    // creates a new div element for each body part
    $('<div>').appendTo('#board').addClass('gameItem').addClass('body').attr('id', newID)
    return snakeArray.push( { //pushes additional body part
      //creates a new bodyPart
      id: '#' + newID,
      x: snakeArray[snakeLength()].x,
      y: snakeArray[snakeLength()].y,
      width: snakeArray[snakeLength()].width,
      height: snakeArray[snakeLength()].height,
      speedX: snakeArray[snakeLength()].speedX,
      speedY: snakeArray[snakeLength()].speedY,
    } )
  }
  
  function doCollide(square1, square2) {
    //assigns the arguments for the comparison below
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x + square1.width
    square1.bottomY = square1.y + square1.height
    
    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.rightX = square2.x + square2.width
    square2.bottomY = square2.y + square2.height
    
    //checks if the given objects collide and returns a value
    if ((square1.leftX < square2.rightX) && (square1.rightX > square2.leftX) && (square1.topY < square2.bottomY) && (square1.bottomY > square2.topY)) {
      return true
    } else {
      return false
    }
  }

  function nextID(baseName, array) {
    //creates an ID for each new item
    var base = baseName
    return base + array.length
  }
  
  function hitWall(square1) {
    //assigns the arguments for the wall detection below
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x + square1.width
    square1.bottomY = square1.y + square1.height
    
    //checks if the head collides with the wall and returns a value
    if ((square1.leftX < 0) || (square1.rightX > $board.width) || (square1.topY < 0) || (square1.bottomY > $board.height )) {
      return true
    } else {
      return false
    }
  }
  
  function updateScore(boolean) {
    //updates sore and apple count
    if (boolean) {
      score += 20
      $('#score').text('Score: ' + score)

      applesEaten.push('one more apple eaten')
      $('#applesEaten').text('Apples: ' + applesEaten.length)
    } else {
      $('#score').text('Score: ' + score)
      $('#applesEaten').text('Apples: ' + applesEaten.length)
    }
  }

  function lethalVenom(square1, square2) {
    for (var i = 0; i <= snakeLength; i++) {
      if (head.x === snakeArrray) {
      }
    }
  }

  function newApple() {
    randomApple() // calls a random location for apple to be reset
    for (var i = 1; i < snakeArray; i++) {
      if ((apple.x === snakeArray[i].x) && (apple.y === snakeArray[i].y)) { // checks if the coordinate is on the snake
        randomApple()
      }
    }
  }

  function randomApple() { // randomizes apple's coordinates
    apple.x = Math.ceil((Math.random(20))) * 21
    apple.y = Math.ceil((Math.random(20))) * 21
  }
}  