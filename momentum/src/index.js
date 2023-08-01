window.onload = function() {
    getTimeOfDay(showHours());
    showDuration();
    audio.src = playList[playNum].src;
}
import playList from './playList.js';
//Add time
const time = document.querySelector('.time');

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    showDate()
    time.textContent = currentTime;
    getTimeOfDay(showHours());
}
setInterval(showTime, 1000);

//Add date
const dateToDay = document.querySelector('.date');
dateToDay.textContent = '';

const showDate = () => {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const currentDate = date.toLocaleDateString('ru', options);
    dateToDay.textContent = currentDate;
}


//Add greeting
const greeting = document.querySelector('.greeting');
greeting.textContent = '';

const showHours = () => {
    const date = new Date();
    const hours = date.getHours();
    return hours
}

const getTimeOfDay = (hours) => {
    if (6 <= hours && hours < 12) {
        return 'morning'
    }
    if (12 <= hours && hours < 18) {
        return 'afternoon'
    }
    if (18 <= hours && hours < 24) {
        return 'evening'
    }
    if (0 <= hours && hours < 6) {
        return 'night'
    }
}
greeting.textContent = `Good ${getTimeOfDay(showHours())}`;

//add LocalStorage
const setLocalStorage = () => {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
    const cityName = document.querySelector('.city');
    localStorage.setItem('city', cityName.value);
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    const name = document.querySelector('.name')
    if (localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    const cityName = document.querySelector('.city')
    if (localStorage.getItem('city')) {
      cityName.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)

//background change
const body = document.querySelector('body');
const getRandomNum = (num) => {
    let number = Math.floor(Math.random() * num + 1);
    return number
}
let bgNum = getRandomNum(20);

let timeOfDay = getTimeOfDay(showHours());

const getBg = (timeOfDay, num) => {
    num = String(num);
    num = num.padStart(2, '0');

    switch (timeOfDay) {
        case 'morning':
            return `https://github.com/Mat-Kon/stage1-tasks/blob/assets/images/morning/${num}.jpg?raw=true`;
        case 'afternoon':
            return `https://github.com/Mat-Kon/stage1-tasks/blob/assets/images/afternoon/${num}.jpg?raw=true`;
        case 'evening':
            return `https://github.com/Mat-Kon/stage1-tasks/blob/assets/images/evening/${num}.jpg?raw=true`;
        case 'night':
            return `https://github.com/Mat-Kon/stage1-tasks/blob/assets/images/night/${num}.jpg?raw=true`; 
    }
}

const setBg = (timeOfDay, num) => {
    const img = new Image();
    img.src = getBg(timeOfDay,num);
    img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}
setBg(timeOfDay, bgNum);

//Functions for slide image
const setSlideNext = () => {
    bgNum = bgNum + 1;
    if (bgNum > 20) {
       bgNum = 1;
    }
    setBg(timeOfDay,bgNum);
}

const setSlidePrev = () => {
    bgNum = bgNum - 1;
    if (bgNum < 1) {
       bgNum = 20;
    }
    setBg(timeOfDay,bgNum);
}

const slideNext = document.querySelector('.button-right');
slideNext.addEventListener('click', event => {
        setSlideNext();
});

const slidePrev = document.querySelector('.button-left');
slidePrev.addEventListener('click', event => {
        setSlidePrev();
});

// add weather widget
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const clouds = document.querySelector('.clouds');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityName = document.querySelector('.city');

async function getWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=0380bab79ebe14975ff3341abbe0c56c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (city === undefined || data.cod === '404') {
        errorWeather();
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    clouds.textContent = `Clouds: ${data.clouds.all}%`;
    windSpeed.textContent = `Wind speed: ${Math.floor(data.wind.speed)}m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
const errorWeather = () => {
    cityName.placeholder = '[Enter City]';
    temperature.textContent = 'Error! Nothing to geocode for!';
    weatherDescription.textContent = '';
    clouds.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    weatherIcon.classList.add('active');
}
getWeather(cityName.placeholder);

cityName.addEventListener('change', (event) => {

    if (event.target.value === ''){
        getWeather()
        // errorWeather();
    }
    getWeather(event.target.value);

})

//Quote widget
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes(num) {
    const quotes = 'src/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    quote.textContent = data[num].text;
    author.textContent = data[num].author;
}

getQuotes(getRandomNum(4));

const changeQuote = document.querySelector('.update-button');
changeQuote.addEventListener('click', event => {
    getQuotes(getRandomNum(4))
});

//Audio widget
const audioName = document.querySelector('.audio-name');
const playStopAudio = document.querySelector('.play-stop-audio');
const timeAudio = document.querySelector('.time-music .end-music');
const audio = new Audio();
timeAudio.textContent = '0:00';
let playNum = 0;
audioName.textContent = playList[playNum].title;

const playListContainer = document.querySelector('.playlist');
const addAudioName = (num) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.length = playList.length;
    li.textContent = playList[num].title;
    playListContainer.append(li);
    playListContainer.append()
}
const addButtonsPlayStopForPlaylist = (num) => {
    const button = document.createElement('button');
    button.classList.add('play-stop-track');
    playListContainer.append(button);
}
for (let i = 0; i < playList.length; i++) {
    addButtonsPlayStopForPlaylist(i);
    addAudioName(i);
}

function setVolumeFromSlider(audio, x) {
  var volumeControl = document.getElementById("volumeControl");
  var volumeSlider = document.getElementById("volumeSlider");
  var volume = x / volumeControl.offsetWidth;
  volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1
  var playAudio = audio;
  playAudio.volume = volume;
  volumeSlider.style.width = (volume * 100) + '%';
}

function initVolumeControl(audio) {
  var volumeControl = document.getElementById("volumeControl");
  volumeControl.addEventListener("click", function (e) {
    setVolumeFromSlider(audio, e.offsetX);
  });
}


const showDuration = () => {
    audio.addEventListener("loadeddata", event => {
        timeAudio.textContent = getTimeCodeFromNum(audio.duration);
    });
}

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }


const addIndicatesWhatIsPlay = () => {
    const nameAudio = document.querySelectorAll('.play-item');
    nameAudio[playNum].classList.add('active');
    const iconAudio = document.querySelectorAll('.play-stop-track');
    iconAudio[playNum].classList.add('active');
}
const removeIndicatesWhatIsPlay = () => {
    const nameAudio = document.querySelectorAll('.play-item');
    const iconAudio = document.querySelectorAll('.play-stop-track');
    nameAudio.forEach(element => {
        element.classList.remove('active');
    })
    iconAudio.forEach(element => {
        element.classList.remove('active');
    })
}

const playAudio = () => {
    audioName.textContent = playList[playNum].title;
    audio.play();
    initVolumeControl(audio);
}

const stopAudio = () => {
    audio.pause();
}
/*music auto-switch*/
audio.addEventListener('ended',event => {
    removeIndicatesWhatIsPlay();
    playNext();
    audioName.textContent = playList[playNum].title;
});

/*Change icon stop => play */
const changeIconInPlayer = () => {
    playStopAudio.classList.toggle('active');
}
/*Change icon to play => stop */
const setPauseIcon = () => {
    playStopAudio.classList.add('active');
}

const progressTime = () => {
    audio.addEventListener('timeupdate', () => {
        const progressBar = document.querySelector(".progress");
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
        document.querySelector('.start-music').textContent = getTimeCodeFromNum(audio.currentTime)
    })
}


/*Play/Stop music with one button*/
playStopAudio.addEventListener('click', (event) => {
    changeIconInPlayer();

    if (event.target.className === 'btn-audio play-stop-audio active') {
        addIndicatesWhatIsPlay();
        playAudio();
        progressTime();
    }
    if (event.target.className === 'btn-audio play-stop-audio') {
        stopAudio();
        removeIndicatesWhatIsPlay();
        clearInterval(progressTime)
    }
});
/*Play/stop music with button track*/
document.querySelectorAll('.play-stop-track').forEach(element => {
    element.addEventListener('click', (event) => {
        const iconAudio = document.querySelectorAll('.play-stop-track')
        iconAudio.forEach(element => {
            changeIconInPlayer();
            if(element.classList.contains('active')){
                addIndicatesWhatIsPlay();
                playAudio(playNum);
                progressTime();
            }
            if(!element.classList.contains('active')){
                stopAudio();
                removeIndicatesWhatIsPlay();
            }
        })
    });
})

/*change time music to timeline */
const timeline = document.querySelector('.timeline');
timeline.addEventListener('click', event => {
    const time = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(time) * audio.duration;
    audio.currentTime = timeToSeek;
})

/*Music switching*/
const nextMusic = document.querySelector('.next-audio');
const prevMusic = document.querySelector('.prev-audio');

const playNext = () => {
    if (playNum < 0) {
        playNum = -1;
    }
    playNum = playNum + 1;
    if (playNum >= playList.length) {
        playNum = 0;
        audio.src = playList[playNum].src;
    }
    audio.src = playList[playNum].src;
    audio.play();
    addIndicatesWhatIsPlay();
}

const playPrev = () => {
    playNum = playNum - 1;
    if (playNum < 0) {
        playNum = playList.length - 1;
        audio.src = playList[playNum].src;
    }
    if (playNum === 0) {
        audio.src = playList[playNum].src;
    }
    if (playNum > 0) {
        audio.src = playList[playNum].src;
    }
    audio.play();
    addIndicatesWhatIsPlay();
}

nextMusic.addEventListener('click', event => {
    removeIndicatesWhatIsPlay();
    setPauseIcon();
    playNext();
    progressTime();
    audioName.textContent = playList[playNum].title;
});
prevMusic.addEventListener('click', event => {
    removeIndicatesWhatIsPlay();
    playPrev();
    setPauseIcon();
    progressTime();
    audioName.textContent = playList[playNum].title;
});




