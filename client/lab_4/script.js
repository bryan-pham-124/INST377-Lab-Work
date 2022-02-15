let currentTileIndex = 0;
const allTiles = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector("#prev-tile");
const nextBtn = document.querySelector("#next-tile");


// updates slideshow, shows new tile
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
    moveTile('prev');
    prevBtn.classList.add('highlight-btn');
    nextBtn.classList.remove('highlight-btn')
})

nextBtn.addEventListener('click', (e) => {
    moveTile('forward');
    prevBtn.classList.remove('highlight-btn');
    nextBtn.classList.add('highlight-btn')
})

