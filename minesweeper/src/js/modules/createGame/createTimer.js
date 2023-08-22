const createTimeContain = () => {
  const header = document.createElement('header');
  const timerContain = document.createElement('div');
  const timer = document.createElement('div');

  header.classList.add('header');
  timerContain.classList.add('timer-contain');
  timer.classList.add('timer');

  timer.innerHTML = '10:00';
  document.body.append(header);
  header.append(timerContain);
  timerContain.append(timer);
};
createTimeContain();

export const timer = (minutes) => {
  const timer = document.querySelector('.timer');
  const timerContain = document.querySelector('.timer-contain');
  let sec = minutes * 60;
  const interval = setInterval(() => {
    const minutesLeft = Math.floor(sec / 60);
    const secondsLeft = sec % 60;

    timer.innerHTML = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

    if (sec <= 0) {
      clearInterval(interval);
      timerContain.textContent = 'Time is OVER\n You lost';
    } else {
      sec--;
    }
  }, 1000);
  return interval;
};


