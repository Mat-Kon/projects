const disableCell = () => {
  const gameZone = document.querySelector('.game-zone');
  gameZone.addEventListener('contextmenu', (event) => {
    if (event.target.classList.contains('cell')) {
      event.preventDefault();
      event.target.classList.toggle('flag');
    }
  });
}

const flagsCounter = () => {
  const flagsContent = document.querySelector('.flags__content');
  const gameZone = document.querySelector('.game-zone');
  let count = 10;
  flagsContent.innerHTML = `flags <br> You have: ${count}`;
  gameZone.addEventListener('contextmenu', (event) => {
    if (event.target.classList.contains('flag')) {
      if (count >= 0 && count <= 10) {
        count --;
        if (count < 0) {
          event.target.classList.toggle('flag');
          count = 0
          flagsContent.innerHTML = `flags <br> You not have flags`;
        }
        flagsContent.innerHTML = `flags <br> You have: ${count}`;
      }
    }
    if (!event.target.classList.contains('flag')) {
      if ( count < 0) {
        event.target.classList.remove('flag');
      }
    }
  });
}

export {
  disableCell,
  flagsCounter
}