{
  /* getting our elements */
  const player = document.querySelector(`.player`);
  const audio = player.querySelector(`.viewer`);
  const progress = player.querySelector(`.progress`);
  const progressBar = player.querySelector(`.progress__filled`);
  const toggle = player.querySelector(`.toggle`);
  const skipButtons = player.querySelectorAll(`[data-skip]`);
  const ranges = player.querySelectorAll('.player__slider');

  const animation = document.querySelector(`.balkjes1`);
  const animation2 = document.querySelector(`.balkjes2`);
  const animation3 = document.querySelector(`.balkjes3`);


function togglePlay(){
  const method = audio.paused ? 'play' : 'pause';
  audio[method]();

}


  // function updateButton(){
  //   const icon = this.paused ? '►' : '❚ ❚';
  //   console.log(icon);
  //   toggle.textContent = icon;
  // }

  // function togglePlay( currentSong ){
  //   const method = audio.paused ? 'play' : 'pause';
  //   audio[method]();
  // }


//   function scrub(e) {
//   const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
//   audio.currentTime = scrubTime;
// }

function skip(){
  audio.currentTime += parseFloat(this.dataset.skip);
}

function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function handleRangeUpdate(){
  audio[this.name] = this.value;
}

function handleProgress(){
  const percent = (audio.currentTime/audio.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}



  function init(){
audio.addEventListener('click', togglePlay);
audio.addEventListener('play', updateButton);
audio.addEventListener('pause', updateButton);
audio.addEventListener('timeupdate', handleProgress);

skipButtons.forEach($button => $button.addEventListener('click', skip));

toggle.addEventListener('click', togglePlay);
ranges.forEach($range => $range.addEventListener('change', handleRangeUpdate));
ranges.forEach($range => $range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

  }
  init();
}
