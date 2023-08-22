import { createFlagsContain } from "./createFlagsContain";
import { appendMine, createCell, createGameZone, createResetBtn, quantityCell } from "./createMain";

const render = () => {
  createGameZone();
  for (let i = 0; i < quantityCell; i++) {
    createCell();
  };
  appendMine();
  createResetBtn();
  createFlagsContain();
};

export default render;