document.addEventListener("DOMContentLoaded", (event) => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const blankTile = document.getElementById("tile-blank");
  const shuffleButton = document.getElementById("shuffle-button");

  function getAdjacentTiles(tile) {
    const index = tiles.indexOf(tile);
    const adjacentIndexes = [
      index - 3, // Above
      index + 3, // Below
      index - 1, // Left
      index + 1, // Right
    ];

    return adjacentIndexes
      .filter((i) => i >= 0 && i < 9)
      .map((i) => tiles[i])
      .filter((t) => t !== undefined);
  }

  function canMoveTile(tile) {
    return getAdjacentTiles(tile).includes(blankTile);
  }

  function swapTiles(tile) {
    const blankIndex = tiles.indexOf(blankTile);
    const tileIndex = tiles.indexOf(tile);

    tiles[blankIndex] = tile;
    tiles[tileIndex] = blankTile;

    tile.classList.add("animate");
    blankTile.classList.add("animate");

    updateTiles();
  }

  function updateTiles() {
    tiles.forEach((tile, index) => {
      tile.style.order = index;
    });
  }

  function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    updateTiles();
  }

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      if (canMoveTile(tile)) {
        swapTiles(tile);
      }
    });
  });

  shuffleButton.addEventListener("click", shuffleTiles);

  updateTiles();
});
