{
  let allSongs;
  let activeSong;
  let playState;
  let currentAudio;

  const playCurrentSong = () => {

    const $playbuttonBig = document.querySelector(".playBig");
    
    $playbuttonBig.addEventListener('click', () => {
      //console.log(activeSong);
      //console.log(playState);

      // const $audio = document.createElement('audio');
      // $audio.src = `src/assets/audio/${song.song}.wav`;
      // $audio.classList.add(`audioo`);

      if (!playState) {
        console.log(currentAudio)
        currentAudio['play']();
        playState = true;
        $playbuttonBig.innerHTML = `<img src="src/assets/img/icons/pause.svg" width="200">`;
      } else {
        currentAudio['pause']();
        playState = false;
        $playbuttonBig.innerHTML = `<img src="src/assets/img/icons/play.svg" width="200">`;
      }
    });



    // if (!playState) {
    //   $audio['play']();
    //   playState = true;
    //   console.log(playState);
    //   $playBtn.innerHTML = `<img src="src/assets/img/icons/pause.svg" width="30">`;
    //   $playbuttonBig.innerHTML = `<img src="src/assets/img/icons/pause.svg" width="200">`;
    // } else {
    //   $audio['pause']();
    //   playState = false;
    //   console.log(playState);
    //   $playBtn.innerHTML = `<img src="src/assets/img/icons/play.svg" width="30">`;
    //   $playbuttonBig.innerHTML = `<img src="src/assets/img/icons/play.svg" width="200">`;
    // }
    
  }

  const setActiveElement = ($button, $audioo) => {
    //$audioo['play']();

    const progress = document.querySelector(`.progress`);
    const progressBar = document.querySelector(`.progress__filled`);

    let mousedown = false;
    progress.addEventListener('click', (e) => {
      const scrubTime = (e.offsetX / progress.offsetWidth) * $audioo.duration;
      $audioo.currentTime = scrubTime;
    });

    progress.addEventListener('mousemove', (e) => mousedown && ((e) => {
      const scrubTime = (e.offsetX / progress.offsetWidth) * $audioo.duration;
      $audioo.currentTime = scrubTime;
    }));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);  

    $audioo.addEventListener('timeupdate', () => {
      const percent = ($audioo.currentTime/$audioo.duration) * 100
      progressBar.style.flexBasis = `${percent}%`;
    });


    const ranges = document.querySelectorAll('.player__slider');

    ranges.forEach($range => $range.addEventListener('change', () => {
      $audioo.volume = $range.value;
    }));
    ranges.forEach($range => $range.addEventListener('mousemove', () => {
      $audioo.volume = $range.value;
    }));

    currentAudio = $audioo;

    const bigsongTitle = document.querySelector(".songtitle-big");
    bigsongTitle.innerHTML = allSongs[$button.id - 1].title;

    const bigsongDescription = document.querySelector(".song-description");
    bigsongDescription.innerHTML = allSongs[$button.id - 1].desc;

    activeSong = allSongs[$button.id - 1];

    const $audio = document.querySelectorAll(`.audioo`);

    $audio.forEach(audiosong => {
      const $old = document.querySelector(`.active`);
      if ($old) {
        $old.classList.add(`button-playy`); // foute klasse, juiste is button-play
        $old.classList.remove(`active`);
        $old.innerHTML = `<img src="src/assets/img/icons/play.svg" width="30">`;     
      }

      $button.classList.remove(`button-playy`);
      $button.classList.add(`active`);

      if (audiosong != $audioo) {
        audiosong['pause']();
      }
      $button.innerHTML = `<img src="src/assets/img/icons/pause.svg" width="30">`;
    })
  }
  
  createResultItems = (songs) => {
    const $ul = document.querySelector(`.song-list`);
    $ul.innerHTML = ``;
    
    songs.forEach(song => {
      const $li = document.createElement(`li`);
      $li.classList.add(`li-songs`);
      $li.innerHTML =
        `
        <img class="song-image" src="src/assets/img/covers/${song.song}.jpg" width="80">
        <div class="text-container-song">
          <h2 class="title-song">${song.title}<h2>
        </div>
        `;

      const $audio = document.createElement('audio');
      $audio.src = `src/assets/audio/${song.song}.wav`;
      $audio.classList.add(`audioo`);

    
      const $playBtn = document.createElement('button');
      $playBtn.innerHTML = `<img src="src/assets/img/icons/play.svg" width="30">`;
      $playBtn.classList.add(`button-play`);
      $playBtn.id = song.id;

      const $songFromPlaylist = document.querySelector(`.song-image`);
      console.log($songFromPlaylist);

      const $playbuttonBig = document.querySelector(".playBig");
      
      $playBtn.addEventListener('click', () => {
        setActiveElement($playBtn, $audio);

        //$audio['play']();
        if (!playState) {
          $audio['play']();
          playState = true;
          $playBtn.innerHTML = `<img src="src/assets/img/icons/pause.svg" width="30">`;
          $playbuttonBig.innerHTML = `<img src="src/assets/img/icons/pause.svg" width="200">`;
        } else {
          $audio['pause']();
          playState = false;
          $playBtn.innerHTML = `<img src="src/assets/img/icons/play.svg" width="30">`;
          $playbuttonBig.innerHTML = `<img src="src/assets/img/icons/play.svg" width="200">`;
        }
      });

      $ul.appendChild($li);
      $li.appendChild($playBtn);
      $li.appendChild($audio);
    })
  }

  const initFetch = () => {
    const url = `src/assets/data/songs.json`;
    fetch(url)
      .then(r=>r.json())
      .then(jsonData => {
        allSongs = jsonData;
        createResultItems(allSongs);
        activeSong = allSongs[0];
      });
}

  
  function init() {
    initFetch();
    playCurrentSong();
    currentAudio = document.querySelector(`.audioo`);
    playState = false;
  }

  init();
}
