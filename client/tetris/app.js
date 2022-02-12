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
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const width = 10;
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

  const tetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino];

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

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
  }

  // make tetris shape move every sec
  timerId = setInterval(moveDown, 1000);

  // freeze function
  function freeze() {
    if(current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));

      // start a new tetromino falling
      random = Math.floor(Math.random() * tetrominoes.length);
      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

});