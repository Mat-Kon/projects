import { disableCell, flagsCounter } from "./disableCell";
import { gameOverToFindMine } from "./gameOver";
import { gameWin } from "./gameWin";
import { openCell } from "./openCell";
import { getMatrix, listenerClickCell } from "./quantityMines";
import { resetGame } from "./resetGame";

const app = () => {
  disableCell();
  flagsCounter();
  gameOverToFindMine();
  gameWin();
  openCell();
  listenerClickCell();
  getMatrix();
  resetGame();
};

export default app;