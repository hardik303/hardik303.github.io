// BG180220 Eigene Video-Controls

// alert('video ready');



const medias = document.querySelectorAll('div.video-container');

var i;
for (i = 0; i < medias.length; i++) {
  //x[i].style.backgroundColor = "red";
  var kmedia = medias[i];


  const media = kmedia.querySelector('video');
  const controls = kmedia.querySelector('.controls');
  const play = kmedia.querySelector('.play');
  const stop = kmedia.querySelector('.stop');
  const rwd = kmedia.querySelector('.rwd');
  const fwd = kmedia.querySelector('.fwd');
  const timerWrapper = kmedia.querySelector('.timer');
  const timer = kmedia.querySelector('.timer span');
  const timerBar = kmedia.querySelector('.timer div');

  //const playhover = kmedia.querySelector('video');


  //console.log(play);

  media.removeAttribute('controls');
  controls.style.visibility = 'visible';

  play.addEventListener('click', playPauseMedia);

  function playPauseMedia() {
    if(media.paused) {
      play.setAttribute('data-icon','u');
      media.play();
    } else {
      play.setAttribute('data-icon','P');
      media.pause();
    }
  }

  //BG030320 auch beim Hovern den Play starten
  media.addEventListener('mouseover', playMedia);

  //BG121120 auch beim Hovern den Play starten, Touchstart für IOS
  //media.addEventListener('touch', playMedia);
  media.addEventListener('touchstart', playMedia);

  //BG121120 auch beim Hovern den Play stoppen
  media.addEventListener('mouseout', stopMedia);

  function playMedia() {
    //alert('touch');
    if(media.paused) {
      play.setAttribute('data-icon','u');
      //console.log('mouseover');
      media.play();
    }
  }

  stop.addEventListener('click', stopMedia);
  media.addEventListener('ended', stopMedia);

  function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon','P');
  }

  rwd.addEventListener('click', mediaBackward);
  fwd.addEventListener('click', mediaForward);

  let intervalFwd;
  let intervalRwd;

  function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if(rwd.classList.contains('active')) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      media.play();
    } else {
      rwd.classList.add('active');
      media.pause();
      intervalRwd = setInterval(windBackward, 200);
    }
  }

  function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if(fwd.classList.contains('active')) {
      fwd.classList.remove('active');
      clearInterval(intervalFwd);
      media.play();
    } else {
      fwd.classList.add('active');
      media.pause();
      intervalFwd = setInterval(windForward, 200);
    }
  }

  function windBackward() {
    if(media.currentTime <= 3) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      stopMedia();
    } else {
      media.currentTime -= 3;
    }
  }

  function windForward() {
    if(media.currentTime >= media.duration - 3) {
      fwd.classList.remove('active');
      clearInterval(intervalFwd);
      stopMedia();
    } else {
      media.currentTime += 3;
    }
  }

  //
  media.addEventListener('timeupdate', setTime);

  function setTime() {
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;

    let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
    timerBar.style.width = barLength + 'px';
  }

  //
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);



  //console.log(play);

}
