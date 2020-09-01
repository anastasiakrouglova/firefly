{
    let allSongs;
    let activeSong;
    let $audioIsActive;
    let currentSongName = "Hazard";

    const playpause = document.getElementById("play");
    const songlist = document.querySelector(`.list`);
    const $currentSongname = document.querySelector(`.music_title`);

    function togglePlayPause() {
        
        if ($audioIsActive !== undefined) {
            if (activeSong.paused || activeSong.ended) {
                playpause.title = "Pause";
                activeSong.play();
             } else {
                playpause.title = "Play";
                activeSong.pause();
            }
            
        } else {
            const firstSong = document.querySelector(`.not-activeAudio`);

            if (firstSong.paused || firstSong.ended) {
                playpause.title = "Pause";
                firstSong.play();
             } else {
                playpause.title = "Play";
                firstSong.pause();
            }
        }
    }


    function toggleForward() {
        let activeSong = document.querySelector(`.active-song`)
        let nextSongId = 1 + parseInt(activeSong.id);

        if (nextSongId >= 10) {
            nextSongId = 1;
        }

        let allNotActiveSongs = document.querySelectorAll(`.not-active-song`);

        allNotActiveSongs.forEach(songTr => {

            if (nextSongId == songTr.id) {
                checkIfOld();

                songTr.classList.remove(`not-active-song`);
                songTr.classList.add(`active-song`);
                
                letTheMusicPlay(songTr, allSongs[nextSongId - 1]);
            }
        })
    }


    function toggleBackward() {
        let activeSong = document.querySelector(`.active-song`)
        let prevSongId = parseInt(activeSong.id) - 1;

        if (prevSongId <= 0) {
            prevSongId = 9;
        }

        let allNotActiveSongs = document.querySelectorAll(`.not-active-song`);

        allNotActiveSongs.forEach(songTr => {

            if (prevSongId == songTr.id) {
                checkIfOld();
                songTr.classList.remove(`not-active-song`);
                songTr.classList.add(`active-song`);

                letTheMusicPlay(songTr, allSongs[prevSongId - 1]);
            }
        })
    }

    function checkIfOld() {
        const $old = document.querySelector(`.active-song`);

        if ($old) {
            $old.classList.remove(`active-song`);
            $old.classList.add(`not-active-song`);
        }
    }

    function letTheMusicPlay($tr, song) {
        $tr.innerHTML = 
        ` <td class="nr"><h5>${song.id}<h5></td>
        <td class="title"><h6 class="songtitle">${song.title}<h6></td>
        <td class="length"><h5>${song.duration}<h5></td>
        <td><input type="checkbox" id="heart"/><label class="zmr" for="heart"></label></td>
        <td><audio onended="checkIfEnded()" preload="auto" id="audio" class="activeAudio"><source src="src/assets/audio/${song.song}.wav"></audio></td>
        `

        let $activeAudio = document.querySelector(`.activeAudio`);

        $audioIsActive = $activeAudio;
        $audioIsActive.play();

        let $notActiveAudios = document.querySelectorAll(`.not-activeAudio`);
        $notActiveAudios.forEach(notActiveAudio => {
            notActiveAudio.pause();
        })
        
        let notActiveSongs = document.querySelectorAll(`.not-active-song`);
        notActiveSongs.forEach(notActiveSong => {
            $activeAudio.classList.remove(`activeAudio`)
            $activeAudio.classList.add(`not-activeAudio`);
        })       

        activeSong = $activeAudio;
        currentSongName = song.title;
        $currentSongname.innerHTML = currentSongName;

        if ($activeAudio.play) {
            playStatus = document.getElementById(`play`)
            playStatus.checked = true;
        }
    }

    function checkIfEnded() {
        let activeSong = document.querySelector(`.active-song`);
        if (activeSong != null) {
            toggleForward()
        }
        
    }

    function songDuration() {
        // let songDurations = document.querySelectorAll(`.not-activeAudio`);

        // songDurations.forEach(songDuration => {
            
        //     songDuration.onloadedmetadata = function() {
        //         console.log(songDuration.duration);
                
        //         //return songDuration.duration;
        //         return "10";
        //     };
        // })

        return duration;
    }

    function showSonglist(songs) {

        

        songs.forEach(song => {
            const $tr = document.createElement(`tr`);

            $tr.classList.add(`not-active-song`);
            $tr.classList.add(`song`);
            $tr.id = song.id;
            $tr.innerHTML =
                ` <td class="nr"><h5>${song.id}<h5></td>
              <td class="title"><h6 class="songtitle">${song.title}<h6></td>
              <td class="length"><h5>${song.duration}<h5></td>
              <td><input type="checkbox" id="heart"/><label class="zmr" for="heart"></label></td>
              <td><audio onended="checkIfEnded()" preload="auto" id="audio" class="not-activeAudio" controls><source src="src/assets/audio/${song.song}.wav"></audio></td>
              `
        
            songlist.appendChild($tr);


            $tr.addEventListener('click', () => {
                checkIfOld();

                $tr.classList.remove(`not-active-song`);
                $tr.classList.add(`active-song`);
                
                letTheMusicPlay($tr, song);
            })

        });

        const $firstTr = document.querySelector(`.not-active-song`);
        $firstTr.classList.add(`active-song`);
        $firstTr.classList.remove(`not-active-song`);
    }

    const showCurrentSongname = () => {
        $currentSongname.innerHTML = currentSongName;
    }

    const initFetch = () => {
        const url = `src/assets/data/songs.json`;
        fetch(url)
          .then(r=>r.json())
          .then(jsonData => {
            allSongs = jsonData;
            showSonglist(allSongs);

          });
    }


const init = () => {
    initFetch();
    showCurrentSongname();
  };
  init();
}




