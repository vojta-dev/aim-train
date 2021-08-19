const element = document.querySelector('main');
const scoreElement = document.querySelector('#score');

element.innerHTML = `<div class="tile"></div>`.repeat(16);

const tiles = [...document.querySelectorAll('.tile')];
let highlightedTiles = [];

const changeScore = (difference) => {
  scoreElement.innerText = +scoreElement.innerText + difference;
};

const flashTile = (tile, color) => {
  const className = color === 'green' ? 'flash' : 'flash-wrong';

  tile.classList.add(className);
  setTimeout(() => tile.classList.remove(className), 150);
};

const highlightRandomTile = () => {
  let randomTile;

  do {
    randomTile = tiles[Math.floor(tiles.length * Math.random())];
  } while (highlightedTiles.includes(randomTile));

  highlightedTiles.push(randomTile);
  randomTile.classList.add('highlighted');
};

const unhighlightTile = (tile) => {
  highlightedTiles = highlightedTiles.filter((highlighteTile) => highlighteTile !== tile);
  tile.classList.remove('highlighted');
};

element.addEventListener('click', (event) => {
  const tile = event.target;

  if (highlightedTiles.includes(tile)) {
    changeScore(+1);
    highlightRandomTile();
    unhighlightTile(tile);
    // flashTile(tile, 'green');
  } else {
    changeScore(-10);
    flashTile(tile, 'red');
  }
});

for (let i = 0; i < 3; i++) highlightRandomTile();
