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
    'RIGHT': [39, 68]
  }
  
  //////////////////////////// Game Item Objects /////////////////////////////////
  
  // snakeArray will contain all the snake-body-objects
  const snakeOne = []
  const snakeTwo = []
  const snakeArray = [snakeOne, snakeTwo]

  //inital scores
  let score = {
    user1: 0,
    user2: 0
  }
  let applesEaten = {
    user1: [],
    user2: []
  }

  let frameCount = 0 // variable to count frames that have been passesd
  
  //creates the first head for each player and pushes it to their respective snake in snakeArray
  var head1 = {
    id: nextID('body', snakeArray),
    x: 100,
    y: 200,
    width: 20,
    height: 20,
    speedX: 0,
    speedY: 0,
  }
  snakeArray[0].push(head1)

  var head1 = {
    id: nextID('body', snakeArray),
    x: 100,
    y: 200,
    width: 20,
    height: 20,
    speedX: 0,
    speedY: 0,
  }
  snakeArray[1].push(head2)

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
    height: $('#board').height(),
    rows: 22,
    columns: 22
  }

  //adds 5 body parts to the snakes
  for (var x = 0; x < snakeArray.length; x++) {
    for (var i = 0; i < 5; i++) {
      AddBody(x)
    }
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
    frameCount++
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
    // moves the snakes' head
    head.x += head.speedX
    head.y += head.speedY
    // moves the snakes' body
    for (var i = snakeLength(); i > 0; i--) {
      snakeArray[i].x = snakeArray[i-1].x
      snakeArray[i].y = snakeArray[i-1].y
    }
    friendlyWall()
  }

  function drawItems() { 
    // draws the snakes' head
    $('#head').css('top', head.y)
    $('#head').css('left', head.x)
    // draws the snakes' body
    for (var i = 1; i <= snakeLength(); i++) { 
      $(snakeArray[i].id).css('top', snakeArray[i].y)
      $(snakeArray[i].id).css('left', snakeArray[i].x)
    }
    drawApple()
  }

  function ateApple() { //what to do if the apple is or isn't eaten
    if (doCollide(apple, head1)) {
      AddBody(1)         // adds a body object to snakeArray
      updateScore(true) // updates the score and applesEaten count
      newApple()        // randomizes the apple's location
    } else if (doCollide(apple, head2)) {
      updateScore(false) // doesn't update the score if the apple is eaten
    }
  }

  function ouch() { //detects if the snake ran into the wall or itself
    if (deadlyVenom()) {
      endGame() //ends game if lethal collision is detected
    }
  } 

  function snakeLength(user) { // shortens calling the largest index of snakeArray
    return snakeArray[user].length - 1
  }

  function drawApple() {
    // draws the apple
    $('#apple').css('top', apple.y)
    $('#apple').css('left', apple.x)
  }

  function keyPress(event, speed) { // translates keyPresses into movement
    if (event.which === KEY.UP[0]) {         //cheking up keys
      if (head1.speedY === 0) {                                            //can't go up if moving down
        head1.speedY = -speed                                              //changes speed to match keyPress
        head1.speedX = 0                                                   //no diagonal movement allowed
      }
    } else if (event.which === KEY.DOWN[0]) { //checking down keys
      if (head1.speedY === 0) {                                             //can't go down if moving up
        head1.speedY = speed                                                //changes speed to match keyPress                                                //no diagonal movement allowed
        head1.speedX = 0                                                    //no diagonal movement allowed
      }
    } else if (event.which === KEY.LEFT[0]) { //checking left keys
      if (head1.speedX === 0){                                              // can't go left if moving right
        head1.speedX = -speed                                               //changes speed to match keyPress
        head1.speedY = 0                                                    //no diagonal movement allowed
      }
    } else if (event.which === KEY.RIGHT[0]) { //checking right keys
      if (head1.speedX === 0) {                                               // can't go right if moving left
        head1.speedX = speed                                                  //changes speed to match keyPress
        head1.speedY = 0                                                      //no diagonal movement allowed
      }
    } else if (event.which === KEY.UP[1]) {    //cheking up keys
      if (head2.speedY === 0) {                                              //can't go up if moving down
        head2.speedY = -speed                                                //changes speed to match keyPress
        head2.speedX = 0                                                     //no diagonal movement allowed
      }
    } else if (event.which === KEY.DOWN[1]) { //checking down keys
      if (head2.speedY === 0) {                                             //can't go down if moving up
        head2.speedY = speed                                                //changes speed to match keyPress                                                //no diagonal movement allowed
        head2.speedX = 0                                                    //no diagonal movement allowed
      }
    } else if (event.which === KEY.LEFT[1]) { //checking left keys
      if (head2.speedX === 0){                                              // can't go left if moving right
        head2.speedX = -speed                                               //changes speed to match keyPress
        head2.speedY = 0                                                    //no diagonal movement allowed
      }
    } else if (event.which === KEY.RIGHT[1]) { //checking right keys
      if (head2.speedX === 0) {                                               // can't go right if moving left
        head2.speedX = speed                                                  //changes speed to match keyPress
        head2.speedY = 0                                                      //no diagonal movement allowed
      }
    }
  }
  
  function AddBody(user) {
    let id = 'body' + user
    let newID = nextID(id, snakeArray[user]) // variable to hold newID
    // creates a new div element for each body part
    $('<div>').appendTo('#board').addClass('gameItem').addClass('body').attr('id', newID)
    return snakeArray.push( { //pushes additional body part
      //creates a new bodyPart
      id: '#' + newID,
      x: snakeArray[user][snakeLength(user)].x,
      y: snakeArray[user][snakeLength(user)].y,
      width: snakeArray[user][snakeLength(user)].width,
      height: snakeArray[user][snakeLength(user)].height,
      speedX: snakeArray[user][snakeLength(user)].speedX,
      speedY: snakeArray[user][snakeLength(user)].speedY,
    } )
  }
  
  function doCollide(square, squareTwo) {
    var square1 = square
    var square2 = squareTwo
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
  
  function friendlyWall(head) {
    if (head.x > $board.width) {
      head.x = 0
    } else if (head.x < 0) {
      head.x = $board.width
    } else if (head.y > $board.height) {
      head.y = 0
    } else if (head.y < 0) {
      head.y = $board.height
    }
  }
  
  function updateScore(user) {
    //updates sore and apple count
    if (user === 1) {
      //user 1 gets more points
      score.user1 += 20
      $('#score').text('Score: ' + score.user1)
      applesEaten.push('one more apple eaten')
      $('#applesEaten').text('Apples: ' + applesEaten.user1.length)

      //user 2 looses points
      score.user2 -= 5
      $('#score').text('Score: ' + score.user2)
      applesEaten.push('one more apple eaten')
      $('#applesEaten').text('Apples: ' + applesEaten.user2.length)
    } else if (score === 2) {
      //user 2 gets more points
      score.user1 += 20
      $('#score').text('Score: ' + score.user2)
      applesEaten.push('one more apple eaten')
      $('#applesEaten').text('Apples: ' + applesEaten.user2.length)

      //user 1 looses points
      score.user1 -= 5
      $('#score').text('Score: ' + score.user1)
      applesEaten.push('one more apple eaten')
      $('#applesEaten').text('Apples: ' + applesEaten.user1.length)     
    } else {
      $('#score').text('Score: ' + score)
      $('#applesEaten').text('Apples: ' + applesEaten.user1.length)
      $('#score').text('Score: ' + score)
      $('#applesEaten').text('Apples: ' + applesEaten.user2.length)
    }
  }

  function deadlyVenom() {
    for (var x = 0; x < snakeArray.length; x++) {
      for (var i = 2; i <= snakeLength(x); i++) {
        if ((snakeArray[x][0].x === snakeArray[x][i].x) && (snakeArray[x][0].y === snakeArray[x][i].y) && (snakeArray[x][0].speedX > 0 || snakeArray[x][0].speedY > 0) && frameCount > 100) {
          return true
        }
      }
    }

    if (doCollide(head1, head2)) {
      return true
    }
  }

  function newApple() {
    randomApple() // calls a random location for apple to be reset
    for (var x = 0; x < snakeArray.length; x++) {
      for (var i = 1; i <= snakeLength(x); i++) { // iterates over snake array to make sure the apple doesn't land on the snake
        if ((apple.x === snakeArray[x][i].x) && (apple.y === snakeArray[x][i].y)) {
          randomApple() // if the apple is on the snake, it randomizes the coordinates again
        }
      }
    }
  }

  function randomApple() { // randomizes apple's coordinates
    apple.x = Math.ceil((Math.random() * apple.width)) * $board.columns - 2
    apple.y = Math.ceil((Math.random() * apple.height)) * $board.rows - 2
  }
  
}  