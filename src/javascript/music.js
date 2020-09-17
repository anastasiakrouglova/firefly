{
    let allSongs;
    let activeSong;
    let $audioIsActive;
    let currentSongName = "Hazard";
    let currentQuote = "Don't to be afraid, all those shadows are nothing but a dream";
    let currentSongImage = "hazard";

    const songlist = document.querySelector(`.list`);
    const $currentSongname = document.querySelector(`.music_title`);
    const $currentQuote = document.querySelector(`.music_subtitle`);
    const $currentSongImage = document.querySelector(`.coverImage`);


    const faders = document.querySelectorAll(`.fade-in`);

    const togglePlayPause = () => {
        const playpause = document.getElementById("play");

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


    const toggleForward = () => {
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

    const checkIfOld = () => {
        const $old = document.querySelector(`.active-song`);

        if ($old) {
            $old.classList.remove(`active-song`);
            $old.classList.add(`not-active-song`);
        }
    }

    const toggleBackward = () => {
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

    const letTheMusicPlay = ($tr, song) => {
        $tr.innerHTML = 
        ` <td class="nr"><h5>${song.id}<h5></td>
        <td class="title"><h6 class="songtitle">${song.title}<h6></td>
        
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
        currentQuote = song.desc;
        currentSongImage = song.song;

        $currentSongname.innerHTML = currentSongName;
        $currentQuote.innerHTML = currentQuote;
        $currentSongImage.innerHTML = `
        <picture class="cover-single">
            <source media="(max-width: 500px)" srcset="/src/assets/img/covers/small/${currentSongImage}.jpg, /src/assets/img/covers/small/${currentSongImage}@2x.jpg 2x">
            <source media="(max-width: 2000px)" srcset="/src/assets/img/covers/large/${currentSongImage}.jpg, /src/assets/img/covers/large/${currentSongImage}@2x.jpg 2x">
            <img class="cover-single" src="/src/assets/img/covers/square/${currentSongImage}.jpg" alt="${currentSongImage}">
        </picture>
        `

        if ($activeAudio.play) {
            playStatus = document.getElementById(`play`)
            playStatus.checked = true;
        }
    }

    function checkIfEnded(){
        let activeSong = document.querySelector(`.active-song`);
        if (activeSong != null) {
            toggleForward()
        }
    }

    const showSonglist = (songs) => {

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
        });

        const $firstTr = document.querySelector(`.not-active-song`);
        $firstTr.classList.add(`active-song`);
        $firstTr.classList.remove(`not-active-song`);
    }

    const showCurrentSongname = () => {
        $currentSongname.innerHTML = currentSongName;
        $currentQuote.innerHTML = currentQuote;
        $currentSongImage.innerHTML = `
        <picture class="cover-single">
            <source media="(max-width: 500px)" srcset="/src/assets/img/covers/small/${currentSongImage}.jpg, /src/assets/img/covers/small/${currentSongImage}@2x.jpg 2x">
            <source media="(max-width: 900px)" srcset="/src/assets/img/covers/medium/${currentSongImage}.jpg, /src/assets/img/covers/medium/${currentSongImage}@2x.jpg 2x">
            <source media="(max-width: 2000px)" srcset="/src/assets/img/covers/large/${currentSongImage}.jpg, /src/assets/img/covers/large/${currentSongImage}@2x.jpg 2x">
            <img class="cover-single" src="/src/assets/img/covers/square/${currentSongImage}.jpg" alt="${currentSongImage}">
        </picture>
        `
        //<img class="cover-single" src="/src/assets/img/covers/square/${currentSongImage}.jpg" alt="${currentSongImage}">
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

    const toggleCredits = () => {
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
        threshold: 0.5,
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
        initFetch();
        showCurrentSongname();

        const creditToggle = document.querySelector(`.credits__input`);
        creditToggle.addEventListener("click", toggleCredits);

        const toggleplay = document.getElementById(`play`);
        toggleplay.addEventListener("click", togglePlayPause);

        const forward = document.getElementById(`forward`);
        forward.addEventListener("click", toggleForward);

        const backward = document.getElementById(`backward`);
        backward.addEventListener("click", toggleBackward);
        
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        })
        
  };
  init();
}