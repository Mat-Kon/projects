const getQuantityMines = (className) => {
  const cellMatrix = getMatrix();
  let quantityMines = [];
  for (let r = 0; r < cellMatrix.length; r++) {
    for (let c = 0; c < cellMatrix[r].length; c++) {
      if (cellMatrix[r][c].className === className) {
        if (r - 1 < 0) {
          const matrix = [
            cellMatrix[r][c - 1], cellMatrix[r][c], cellMatrix[r][c + 1],
            cellMatrix[r + 1][c - 1], cellMatrix[r + 1][c], cellMatrix[r + 1][c + 1]
          ];

          matrix.forEach((elem) => {
            if (elem !== undefined) {
              if (elem.children.length !== 0) {
                quantityMines.push(elem);
              }
            }
          });
          return quantityMines.length;
        }
        if (r + 1 >= cellMatrix.length) {
          const matrix = [
            cellMatrix[r - 1][c - 1], cellMatrix[r - 1][c], cellMatrix[r - 1][c + 1],
            cellMatrix[r][c - 1], cellMatrix[r][c], cellMatrix[r][c + 1]
          ];

          matrix.forEach((elem) => {
            if (elem !== undefined) {
              if (elem.children.length !== 0) {
                quantityMines.push(elem);
              }
            }
          });
          return quantityMines.length;
        }
        if (c - 1 < 0) {
          const matrix = [
            cellMatrix[r - 1][c], cellMatrix[r - 1][c + 1],
            cellMatrix[r][c], cellMatrix[r][c + 1],
            cellMatrix[r + 1][c], cellMatrix[r + 1][c + 1]
          ];

          matrix.forEach((elem) => {
            if (elem !== undefined) {
              if (elem.children.length !== 0) {
                quantityMines.push(elem);
              }
            }
          });
          return quantityMines.length;
        }
        if (c + 1 > cellMatrix[r].length) {
          const matrix = [
            cellMatrix[r - 1][c - 1], cellMatrix[r - 1][c],
            cellMatrix[r][c - 1], cellMatrix[r][c],
            cellMatrix[r + 1][c - 1], cellMatrix[r + 1][c]
          ];

          matrix.forEach((elem) => {
            if (elem !== undefined) {
              if (elem.children.length !== 0) {
                quantityMines.push(elem);
              }
            }
          });
          return quantityMines.length;
        }

        const matrix = [
          cellMatrix[r - 1][c - 1], cellMatrix[r - 1][c], cellMatrix[r - 1][c + 1],
          cellMatrix[r][c - 1], cellMatrix[r][c], cellMatrix[r][c + 1],
          cellMatrix[r + 1][c - 1], cellMatrix[r + 1][c], cellMatrix[r + 1][c + 1]
        ];

        matrix.forEach((elem) => {
          if (elem !== undefined) {
            if (elem.children.length !== 0) {
              quantityMines.push(elem);
            }
          }
        });
        return quantityMines.length;
      };
    }
  }
  quantityMines = [];
};

const listenerClickCell = () => {
  const gameZone = document.querySelector('.game-zone');
  gameZone.addEventListener('click', (event) => {
    if (event.target.className === 'cell disable') {
        event.target.classList.add('find');
      if(event.target.children.length === 1) {
        return
      }
      if (event.target.classList.contains('find')) {
        const cell = document.querySelector('.find');
        const howManyMines = getQuantityMines(event.target.className);
        if (howManyMines === 0) {
          cell.textContent = '';
          event.target.classList.remove('find');
          return;
        }
        cell.textContent = howManyMines;
        cell.style.color = quantityChangeColor(howManyMines);
        event.target.classList.remove('find');
      }
    }
  });
}
listenerClickCell()

function getMatrix() {
  const cells = document.querySelector('.game-zone').children;
  const matrix = [];
  let line = [];
  for (let i = 0; i < cells.length; i++ ) {
    line.push(cells[i]);
    if (line.length === 10) {
      matrix.push(line);
      line = [];
    }
  }
  return matrix;
};
getMatrix();

const quantityChangeColor = (num) => {
  if (num === 0) {
    return 'green';
  }
  if (num === 1) {
    return 'darksalmon'
  }
  if (num === 2) {
    return 'orange';
  }
  if (num === 3) {
    return 'red';
  }
  if (num === 4 ) {
    return 'indigo'
  }
  return 'black';
}