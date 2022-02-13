/*
const lTetromino = 'firstShape';
const zTetromino = 'secondShape';
const oTetromino = 'thirdShape';
const iTetromino = 'fourthShape';
const tTetromino = 'fifthShape';

//const tetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino];
*/

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  let score = 0;
  const width = 10;
  let nextRandom = 0;
  let timerId;

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * tetrominoes.length);
  let current = tetrominoes[random][currentRotation];

  // draw first rotation of first tetrmino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino')
    });
  }
  draw();

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino')
    });
  }

  // freeze function
  function freeze() {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));

      // start a new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      console.log(nextRandom)

      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  // move the tetris shape left, but it stops at the edge of screen or it hits another shape
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function rotate() {
    undraw();
    currentRotation += 1;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = tetrominoes[random][currentRotation];
    draw();
  }

  timerId = setInterval(moveDown, 1000);


  // assign functions to keycodes
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);
 

  // show up next shape in mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  const displayIndex = 0;

  // shape without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ]

  function displayShape() {
    // remove any trace of shape from the grid
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    console.log(nextRandom)
     upNextTetrominoes[nextRandom].forEach((index) => {
       
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  }

  
 startBtn.addEventListener('click', () => {
    if(timerId){
        clearInterval(timerId);
        timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      displayShape()
    }
 })
 

 function addScore() {
  for (let i = 0; i < 199; i += width){
     const row = [i , i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
      

     if(row.every(index => squares[index].classList.contains('taken'))){
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(index => {
           squares[index].classList.remove('taken');
           squares[index].classList.remove('tetromino');
           
        })
        const squaresRemoved = squares.splice(i , width);
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
     }
    }
  }

  // checks for gameover condition
  function gameOver(){
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        scoreDisplay.innerHTML = 'end';
        clearInterval(timerId)
    }
  }
});



