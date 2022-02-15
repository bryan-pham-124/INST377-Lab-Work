// select btns
const prevBtn = document.querySelector("#prev-tile");
const nextBtn = document.querySelector("#next-tile");

// select all tiles
const tile2 = document.querySelector('#tile-two');
const tile5 = document.querySelector('#tile-five');
const tile4 = document.querySelector('#tile-four');
const tile3 = document.querySelector('#tile-three');
const tile1 = document.querySelector('#tile-one');

// array of all tiles
const allTiles = [tile2, tile3, tile4, tile5, tile1];

let currentTileIndex = 0;

// function that searches through array for a tile 
function moveTile(tileDirection)  {

    const currentTile = allTiles[currentTileIndex];

    currentTile.classList.remove('visible-tile');
    currentTile.classList.add('invisible-tile');

    if(tileDirection === 'forward') {
        currentTileIndex++;
        currentTileIndex = currentTileIndex > allTiles.length - 1 ? 0: currentTileIndex;
    } else {
        currentTileIndex--;
        currentTileIndex = currentTileIndex < 0 ? allTiles.length - 1: currentTileIndex;
    }

    const nextTile = allTiles[currentTileIndex];
    nextTile.classList.remove('invisible-tile');
    nextTile.classList.add('visible-tile');

}

prevBtn.addEventListener('click', (e) => {
    moveTile();
    prevBtn.classList.add('highlight-btn');
    nextBtn.classList.remove('highlight-btn')
})

nextBtn.addEventListener('click', (e) => {
    moveTile('forward');
    prevBtn.classList.remove('highlight-btn');
    nextBtn.classList.add('highlight-btn')
})