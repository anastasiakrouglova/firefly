{
    let allSongs;
    let activeSong;
    let $audioIsActive;
    let currentSongName = "Hazard";
    let currentQuote = "Don't to be afraid, all those shadows are nothing but a dream";
    let currentSongImage = "hazard";
    let allAudios = [];

    const playpause = document.getElementById("play");
    const songlist = document.querySelector(`.list`);
    const $currentSongname = document.querySelector(`.music_title`);
    const $currentQuote = document.querySelector(`.music_subtitle`);
    const $currentSongImage = document.querySelector(`.coverImage`);


    const faders = document.querySelectorAll(`.fade-in`);

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
        
        <td><audio onended="checkIfEnded()" preload="auto" id="audio" class="activeAudio"><source src="src/assets/audio/${song.song}.wav"></audio></td>
        `

        let $activeAudio = document.querySelector(`.activeAudio`);

        $audioIsActive = $activeAudio;
        $audioIsActive.play();
        console.log($audioIsActive);

        // DIT IN APARTE FUNCTIE SCHRIJVEN EN DIE FUNCTIE INVULLEN IPV SONG.DURATION! AANTAL RETURNEN.

        
        // // if (timeleft == "NaN:NaN" || NaN || undefined || null) {
        // //     console.log('aaii');
        // //     timeleft.innerHTML = "wacht";
        // // }

        // $audioIsActive.addEventListener("timeupdate", function () {
        //     let timeleft = document.querySelector(`.songduration`);
        //     console.log(timeleft.innerHTML)

        //     let s = parseInt($audioIsActive.currentTime % 60);
        //     let m = parseInt(($audioIsActive.currentTime / 60) % 60);


        //     duration = parseInt($audioIsActive.duration);
        //     currentTime = parseInt( $audioIsActive.currentTime ),
            
        //     timeLeft = duration - currentTime,
        //         s, m;
            
        //     // if (s < 10) {
        //     //     timeline.innerHTML = m + ':0' + s;
        //     // }
        //     // else {
        //     //     timeline.innerHTML = m + ':' + s;
        //     // }
            
        //     s = timeLeft % 60;
        //     m = Math.floor( timeLeft / 60 ) % 60;
            
        //     s = s < 10 ? "0"+s : s;
        //     m = m < 10 ? "0"+m : m;
            
        //     if (m == NaN && s == NaN) {
        //         timeleft.innerHTML = "niks"
        //     } else {
        //         timeleft.innerHTML =  m + ":" + s;
                
        //     }
            
        //     // if (timeleft.innerHTML == `NaN:NaN`) {
        //     //     console.log('aaaa')
        //     //     timeleft.innerHTML = "aaa";
        //     // }
            
        //     console.log(timeleft);
        // }, false)

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
        currentQuote = song.desc;
        currentSongImage = song.song;

        $currentSongname.innerHTML = currentSongName;
        $currentQuote.innerHTML = currentQuote;
        $currentSongImage.innerHTML = `<img class="cover-single" src="/src/assets/img/covers/square/${currentSongImage}.jpg" alt="${currentSongImage}">`

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

    function showSonglist(songs) {

        songs.forEach(song => {
            const $tr = document.createElement(`tr`);

            $tr.classList.add(`not-active-song`);
            $tr.classList.add(`song`);
            $tr.id = song.id;

            $tr.innerHTML =
            ` <td class="nr"><h5>${song.id}<h5></td>
              <td class="title"><h6 class="songtitle">${song.title}<h6></td>
              <td><audio onended="checkIfEnded()" preload="auto" id="audio" class="not-activeAudio" controls><source src="src/assets/audio/${song.song}.wav"></audio></td>
              `
              
            songlist.appendChild($tr);

            $tr.addEventListener('click', () => {
                checkIfOld();
                
                $tr.classList.remove(`not-active-song`);
                $tr.classList.add(`active-song`);
                
                letTheMusicPlay($tr, song);
            })
  
    
            // $songaudios.forEach(songaudio => {
            //     songaudio.onloadedmetadata = function () {
            //         console.log(songaudio.duration);
            //         let $songduration = songaudio.duration;
            //     }
    
            //     console.log($songaudios);
    
            // })

            //getSongDuration();

        });

        const $firstTr = document.querySelector(`.not-active-song`);
        $firstTr.classList.add(`active-song`);
        $firstTr.classList.remove(`not-active-song`);

        // // DIT WERKT VOOR EERSTE ITEM
        // let $songduration = document.querySelector(`.songduration`);
        // let $songaudio = document.querySelector(`.not-activeAudio`);

        // $songaudio.onloadedmetadata = function () {
        //     $songduration.innerHTML = $songaudio.duration;
        // }


        // let $songdurations = document.querySelectorAll(`.songduration`);
        // let $songaudios = document.querySelectorAll(`.not-activeAudio`);


        // allemaal opslaan als values in openbare array en ze dan via i = 0, ++ opvragen.
        // $songaudios.forEach(songaudio => {
        //     songaudio.onloadedmetadata = function () {
        //         console.log(songaudio.duration);
        //         allAudios.push(songaudio.duration);
        //     }
        // });
    }

    const showCurrentSongname = () => {
        $currentSongname.innerHTML = currentSongName;
        $currentQuote.innerHTML = currentQuote;
        $currentSongImage.innerHTML = `<img class="cover-single" src="/src/assets/img/covers/square/${currentSongImage}.jpg" alt="${currentSongImage}">`
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

    function toggleCredits () {
        const creditCheck = document.querySelector(`.credits__input`);
        const creditInfo = document.querySelector(`.credits_info`);
        const creditLabel = document.querySelector(`.credits__label`);

        if (creditCheck.checked) {
            creditInfo.classList.remove(`credit_false`);
            creditInfo.classList.add(`credit_true`);
            creditLabel.innerHTML = `hide credits`
        } else {
            creditInfo.classList.add(`credit_false`);
            creditInfo.classList.remove(`credit_true`);
            creditLabel.innerHTML = `show credits`
        }
    }

    const appearOptions = {
        threshold: 1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver
        (function (
            entries,
            appearOnScroll
        ) { 
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            })
        },
        appearOptions);
    

    const init = () => {
    console.log('hey code stalker x');
    initFetch();
    showCurrentSongname();

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    })
  };
  init();
}





        // audio.addEventListener("timeupdate", function() {
        //     var timeleft = document.getElementById('timeleft'),
        //         duration = parseInt( audio.duration ),
        //         currentTime = parseInt( audio.currentTime ),
        //         timeLeft = duration - currentTime,
        //         s, m;
            
            
        //     s = timeLeft % 60;
        //     m = Math.floor( timeLeft / 60 ) % 60;
            
        //     s = s < 10 ? "0"+s : s;
        //     m = m < 10 ? "0"+m : m;
            
        //     timeleft.innerHTML = m+":"+s;
            
        // }, false);
        
        // Countup
        // audio.addEventListener("timeupdate", function() {
        //     var timeline = document.getElementById('duration');
        //     var s = parseInt(audio.currentTime % 60);
        //     var m = parseInt((audio.currentTime / 60) % 60);
        //     if (s < 10) {
        //         timeline.innerHTML = m + ':0' + s;
        //     }
        //     else {
        //         timeline.innerHTML = m + ':' + s;
        //     }
        // }, false);