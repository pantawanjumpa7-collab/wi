/* =====================================================
   OUR LITTLE WORLD
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const pages =
    document.querySelectorAll(".page");


const pageHistory = [];


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(pageId) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(pageId);


    if (target) {

        target.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   GO TO PAGE
===================================================== */

function goToPage(pageId) {

    const currentPage =
        document.querySelector(".page.active");


    if (
        currentPage &&
        currentPage.id !== pageId
    ) {

        pageHistory.push(
            currentPage.id
        );

    }


    showPage(pageId);

}


/* =====================================================
   BACK
===================================================== */

function goBack() {

    if (pageHistory.length > 0) {

        const previousPage =
            pageHistory.pop();


        showPage(previousPage);

    } else {

        showPage("welcomePage");

    }

}


/* =====================================================
   DATA-GO
===================================================== */

document
    .querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                goToPage(
                    button.dataset.go
                );

            }
        );

    });


/* =====================================================
   DATA-BACK
===================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-back]"
            );


        if (!button) {
            return;
        }


        goBack();

    }
);


/* =====================================================
   PIN LOCK
===================================================== */

const correctPin =
    "1201";


let enteredPin =
    "";


const pinDots =
    document.querySelectorAll(
        ".pin-dots span"
    );


const unlockBtn =
    document.getElementById(
        "unlockBtn"
    );


const lockMessage =
    document.getElementById(
        "lockMessage"
    );


const hintBtn =
    document.getElementById(
        "hintBtn"
    );


/* =====================================================
   UPDATE PIN
===================================================== */

function updatePin() {

    pinDots.forEach(
        (dot, index) => {

            if (
                index <
                enteredPin.length
            ) {

                dot.classList.add(
                    "filled"
                );

            } else {

                dot.classList.remove(
                    "filled"
                );

            }

        }
    );

}


/* =====================================================
   KEYPAD
===================================================== */

document
    .querySelectorAll(
        "[data-key]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    enteredPin.length >= 4
                ) {
                    return;
                }


                enteredPin +=
                    button.dataset.key;


                updatePin();


                if (
                    enteredPin.length === 4
                ) {

                    setTimeout(
                        checkPin,
                        150
                    );

                }

            }
        );

    });


/* =====================================================
   CLEAR / DELETE
===================================================== */

document
    .querySelectorAll(
        "[data-action]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;


                if (
                    action === "clear"
                ) {

                    enteredPin = "";

                }


                if (
                    action === "delete"
                ) {

                    enteredPin =
                        enteredPin.slice(
                            0,
                            -1
                        );

                }


                updatePin();

            }
        );

    });


/* =====================================================
   CHECK PIN
===================================================== */

function checkPin() {

    if (
        enteredPin === correctPin
    ) {

        lockMessage.textContent =
            "welcome to our little world ♡";


        lockMessage.style.color =
            "#e78aa7";


        setTimeout(
            () => {

                showPage(
                    "welcomePage"
                );

                enteredPin = "";

                updatePin();

            },
            500
        );


    } else {

        lockMessage.textContent =
            "อื้ม...รหัสยังไม่ถูกนะ ♡";


        lockMessage.style.color =
            "#b84e72";


        const card =
            document.querySelector(
                ".lock-card"
            );


        card.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },
                {
                    transform:
                        "translateX(-8px)"
                },
                {
                    transform:
                        "translateX(8px)"
                },
                {
                    transform:
                        "translateX(0)"
                }
            ],
            {
                duration:
                    300
            }
        );


        enteredPin = "";

        updatePin();

    }

}


/* =====================================================
   UNLOCK BUTTON
===================================================== */

if (unlockBtn) {

    unlockBtn.addEventListener(
        "click",
        checkPin
    );

}


/* =====================================================
   HINT
===================================================== */

if (hintBtn) {

    hintBtn.addEventListener(
        "click",
        () => {

            lockMessage.textContent =
                "เลข 4 ตัวที่เธอน่าจะจำได้นะ ♡";

        }
    );

}


/* =====================================================
   LITTLE THINGS
===================================================== */

const memoryMessages = {

    music:
        "เพลงบางเพลงไม่ได้มีไว้ฟังอย่างเดียว แต่มีไว้คิดถึงใครบางคนด้วย 🎧♡",

    flower:
        "ดอกไม้ไม่จำเป็นต้องมีเหตุผล แค่เห็นแล้วนึกถึงก็พอแล้ว 🌷",

    coffee:
        "ในวันที่ทุกอย่างวุ่นวาย ขอให้มีช่วงเวลาสั้น ๆ ที่ได้พักบ้างนะ ☕",

    bear:
        "ถ้าเหนื่อยมาก ๆ ก็ไม่ต้องฝืน เก็บแรงไว้แล้วค่อยไปต่อก็ได้ 🧸♡"

};


const memoryMessage =
    document.getElementById(
        "memoryMessage"
    );


document
    .querySelectorAll(
        ".memory-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const key =
                    card.dataset.memory;


                if (
                    memoryMessages[key]
                ) {

                    memoryMessage.textContent =
                        memoryMessages[key];

                }

            }
        );

    });


/* =====================================================
   MUSIC PLAYER
===================================================== */

const songs = [

    {
        title: "อะไรอ่ะสวยกว่า...ทะเล",
        artist: "WHATFALSE",
        file: "music/song1.mp3",
        cover: "🌊"
    },

    {
        title: "ถ้าโลกไม่ใจดี",
        artist: "ARMOR",
        file: "music/song2.mp3",
        cover: "🫶"
    },

    {
        title: "เธอคือสิ่งที่สวยงาม",
        artist: "Miss Uni",
        file: "music/song3.mp3",
        cover: "💗"
    },

    {
        title: "เธอเก่งที่สุดแล้ว",
        artist: "PORZAX",
        file: "music/song4.mp3",
        cover: "🌷"
    },
    

    {
        title: "1-100",
        artist: "1-100",
        file: "music/song5.mp3",
        cover: "💌"
    }

];


const audio =
    document.getElementById(
        "audio"
    );


const playBtn =
    document.getElementById(
        "playBtn"
    );


const prevBtn =
    document.getElementById(
        "prevBtn"
    );


const nextBtn =
    document.getElementById(
        "nextBtn"
    );


const shuffleBtn =
    document.getElementById(
        "shuffleBtn"
    );


const repeatBtn =
    document.getElementById(
        "repeatBtn"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const volumeBar =
    document.getElementById(
        "volumeBar"
    );


const currentTimeEl =
    document.getElementById(
        "currentTime"
    );


const durationEl =
    document.getElementById(
        "duration"
    );


const songTitle =
    document.getElementById(
        "songTitle"
    );


const songArtist =
    document.getElementById(
        "songArtist"
    );


const nowCover =
    document.getElementById(
        "nowCover"
    );


let currentSong =
    0;


let isShuffle =
    false;


let isRepeat =
    false;


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(secs).padStart(
            2,
            "0"
        )
    );

}


/* =====================================================
   LOAD SONG
===================================================== */

function loadSong(index) {

    if (!audio) {
        return;
    }


    currentSong =
        index;


    const song =
        songs[currentSong];


    audio.src =
        song.file;


    audio.load();


    if (songTitle) {

        songTitle.textContent =
            song.title;

    }


    if (songArtist) {

        songArtist.textContent =
            song.artist;

    }


    if (nowCover) {

        nowCover.textContent =
            song.cover;

    }


    document
        .querySelectorAll(
            ".playlist-item"
        )
        .forEach(
            (item, itemIndex) => {

                item.classList.toggle(
                    "selected",
                    itemIndex ===
                    currentSong
                );

            }
        );


    if (progressBar) {

        progressBar.value = 0;

    }

}


/* =====================================================
   PLAY
===================================================== */

function playSong() {

    if (!audio) {
        return;
    }


    audio.play()
        .then(() => {

            if (playBtn) {

                playBtn.textContent =
                    "⏸";

            }

        })
        .catch(
            error => {

                console.log(
                    "Audio:",
                    error
                );

            }
        );

}


/* =====================================================
   PAUSE
===================================================== */

function pauseSong() {

    if (!audio) {
        return;
    }


    audio.pause();


    if (playBtn) {

        playBtn.textContent =
            "▶";

    }

}


/* =====================================================
   PLAY BUTTON
===================================================== */

if (playBtn) {

    playBtn.addEventListener(
        "click",
        () => {

            if (
                audio.paused
            ) {

                playSong();

            } else {

                pauseSong();

            }

        }
    );

}


/* =====================================================
   NEXT SONG
===================================================== */

function nextSong() {

    if (isShuffle) {

        let next =
            Math.floor(
                Math.random() *
                songs.length
            );


        if (
            songs.length > 1 &&
            next === currentSong
        ) {

            next =
                (
                    next + 1
                ) %
                songs.length;

        }


        loadSong(next);

    } else {

        currentSong =
            (
                currentSong + 1
            ) %
            songs.length;


        loadSong(currentSong);

    }


    playSong();

}


if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        nextSong
    );

}


/* =====================================================
   PREVIOUS SONG
===================================================== */

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        () => {

            currentSong =
                (
                    currentSong -
                    1 +
                    songs.length
                ) %
                songs.length;


            loadSong(
                currentSong
            );


            playSong();

        }
    );

}


/* =====================================================
   SHUFFLE
===================================================== */

if (shuffleBtn) {

    shuffleBtn.addEventListener(
        "click",
        () => {

            isShuffle =
                !isShuffle;


            shuffleBtn.style.opacity =
                isShuffle
                    ? "1"
                    : ".45";

        }
    );

}


/* =====================================================
   REPEAT
===================================================== */

if (repeatBtn) {

    repeatBtn.addEventListener(
        "click",
        () => {

            isRepeat =
                !isRepeat;


            repeatBtn.style.opacity =
                isRepeat
                    ? "1"
                    : ".45";

        }
    );

}


/* =====================================================
   AUDIO TIME
===================================================== */

if (audio) {

    audio.addEventListener(
        "timeupdate",
        () => {

            if (
                !progressBar
            ) {
                return;
            }


            if (
                audio.duration
            ) {

                progressBar.value =
                    (
                        audio.currentTime /
                        audio.duration
                    ) * 100;

            }


            if (currentTimeEl) {

                currentTimeEl.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }


            if (durationEl) {

                durationEl.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (durationEl) {

                durationEl.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    audio.addEventListener(
        "ended",
        () => {

            if (isRepeat) {

                audio.currentTime =
                    0;

                playSong();

            } else {

                nextSong();

            }

        }
    );

}


/* =====================================================
   PROGRESS BAR
===================================================== */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        () => {

            if (
                !audio ||
                !audio.duration
            ) {
                return;
            }


            audio.currentTime =
                (
                    progressBar.value /
                    100
                ) *
                audio.duration;

        }
    );

}


/* =====================================================
   VOLUME
===================================================== */

if (audio) {

    audio.volume =
        volumeBar
            ? Number(
                volumeBar.value
            )
            : 0.7;

}


if (volumeBar) {

    volumeBar.addEventListener(
        "input",
        () => {

            if (audio) {

                audio.volume =
                    Number(
                        volumeBar.value
                    );

            }

        }
    );

}


/* =====================================================
   PLAYLIST CLICK
===================================================== */

document
    .querySelectorAll(
        ".playlist-item"
    )
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        item.dataset.index
                    );


                loadSong(index);

                playSong();

            }
        );

    });


/* =====================================================
   LOAD FIRST SONG
===================================================== */

loadSong(0);


/* =====================================================
   ENCOURAGEMENT
===================================================== */

const encouragementMessages = {

    tired: [

        "ไม่ต้องเก่งตลอดเวลาก็ได้นะ วันนี้ทำดีที่สุดแล้ว ♡",

        "ถ้าเหนื่อยก็พักก่อนนะ ไม่ต้องรีบ",

        "วันนี้ผ่านอะไรมาเยอะแล้ว เก่งมากเลยนะ 🌷",

        "ไม่เป็นไรเลยถ้าวันนี้จะไม่ไหวบ้าง",

        "พักสักหน่อย แล้วค่อยกลับไปสู้ใหม่นะ",

        "ไม่ต้องแบกทุกอย่างไว้คนเดียวก็ได้นะ",

        "วันนี้ไม่ต้องสมบูรณ์แบบก็ได้",

        "เหนื่อยได้ ร้องไห้ได้ แล้วค่อยยิ้มใหม่นะ",

        "ขอให้คืนนี้เป็นคืนที่ได้พักจริง ๆ นะ 🌙",

        "เก่งมากแล้วที่ยังพยายามมาถึงตรงนี้",

        "ถ้าไม่มีแรงแล้ว มาพักตรงนี้ก่อนได้นะ",

        "ไม่ต้องรีบโต ไม่ต้องรีบเก่งนะ",

        "บางวันแค่ผ่านมันมาได้ก็ถือว่าเก่งแล้ว",

        "ขอให้ความเหนื่อยค่อย ๆ หายไปนะ",

        "อย่าลืมใจดีกับตัวเองด้วยนะ ♡",

        "วันนี้พักได้ ไม่ถือว่าแพ้นะ",

        "ไม่ว่าจะเจออะไร ขอให้คืนนี้ใจเบาลงนะ",

        "ค่อย ๆ หายเหนื่อยนะ คนเก่ง",

        "เธอไม่ได้ต้องเข้มแข็งตลอดเวลาหรอก",

        "ขอให้มีเรื่องเล็ก ๆ ทำให้ยิ้มได้วันนี้",

        "ถ้าเหนื่อยมากก็หยุดพักก่อนนะ",

        "ทุกอย่างไม่จำเป็นต้องเสร็จวันนี้ก็ได้",

        "ไม่ต้องฝืนตัวเองมากเกินไปนะ",

        "ขอให้วันนี้มีใครสักคนทำให้ใจดีขึ้น",

        "เธอทำได้ดีมากแล้วจริง ๆ",

        "พักหายใจลึก ๆ ก่อนนะ",

        "พรุ่งนี้ค่อยเริ่มใหม่ก็ยังทัน",

        "ขอให้ความหนักในใจเบาลงทีละนิด",

        "ไม่เป็นไรนะ เดี๋ยวมันจะค่อย ๆ ดีขึ้น",

        "วันนี้ขอให้เธอได้พักอย่างสบายใจนะ ♡"

    ],


    study: [

        "อ่านทีละนิดก็ได้ ขอแค่ยังไม่ยอมแพ้นะ 📚",

        "ไม่ต้องอ่านให้เก่งที่สุด แค่อ่านให้เข้าใจก็พอ",

        "อีกนิดเดียวเอง สู้ ๆ นะ",

        "เหนื่อยก็พัก แล้วกลับมาใหม่",

        "หนังสือไม่ได้หนีไปไหน ค่อย ๆ อ่านนะ",

        "วันนี้อ่านได้แค่หนึ่งหน้าก็ยังถือว่าอ่าน",

        "ขอให้สิ่งที่อ่านเข้าหัวแบบไม่ต้องท่องซ้ำเยอะนะ",

        "เธอทำได้มากกว่าที่คิดนะ",

        "อย่าเปรียบเทียบตัวเองกับคนอื่นนะ",

        "ค่อย ๆ เก็บทีละบท ทีละหน้า",

        "ความพยายามของเธอมีความหมายนะ",

        "พักสายตาบ้างนะคนเก่ง",

        "อ่านไปพร้อมกับจิบน้ำด้วยนะ 💗",

        "ไม่ต้องเข้าใจทุกอย่างในครั้งเดียว",

        "ผิดได้ ลืมได้ แล้วกลับมาอ่านใหม่",

        "วันนี้ตั้งใจแล้ว เก่งมาก",

        "ขอให้จำสิ่งที่อ่านได้เยอะ ๆ นะ",

        "อีกหน่อยก็จะได้พักแล้ว",

        "ตั้งใจอีกนิดนะ สู้ ๆ 📖",

        "ไม่ต้องกดดันตัวเองมากนะ",

        "การค่อย ๆ ทำก็ยังเป็นการก้าวไปข้างหน้า",

        "วันนี้ขอให้สมองใจดีกับเธอหน่อยนะ",

        "อ่านเสร็จแล้วอย่าลืมชมตัวเองด้วย",

        "เธอเก่งนะที่ยังเปิดหนังสืออยู่",

        "ไม่ต้องรีบ แค่ไม่หยุดก็พอ",

        "ขอให้วันนี้อ่านแล้วเข้าใจง่าย ๆ",

        "เหนื่อยเมื่อไหร่พักได้เสมอ",

        "ความพยายามวันนี้จะกลายเป็นความภูมิใจทีหลัง",

        "อีกหนึ่งหน้า อีกหนึ่งก้าวนะ",

        "สู้ ๆ นะ คนเก่ง เค้าเอาใจช่วยอยู่ตรงนี้ ♡"

    ],


    exam: [

        "ขอให้ข้อสอบออกตรงกับที่อ่านมานะ 📝",

        "ตั้งสติ หายใจลึก ๆ แล้วค่อยทำ",

        "อ่านโจทย์ดี ๆ เธอทำได้",

        "ไม่ต้องกลัวข้อสอบมากเกินไปนะ",

        "ข้อไหนทำได้ทำก่อน ข้อไหนไม่แน่ใจค่อยกลับมา",

        "ขอให้สิ่งที่อ่านมานึกออกตอนทำข้อสอบนะ",

        "เก่งมากแล้วที่เตรียมตัวมาถึงวันนี้",

        "อย่าลืมพักสายตาก่อนเข้าห้องสอบ",

        "ขอให้วันนี้สมองปลอดโปร่งนะ",

        "ไม่ต้องสมบูรณ์แบบ ขอแค่ทำเต็มที่",

        "ถ้าตื่นเต้นก็หายใจช้า ๆ นะ",

        "เชื่อในสิ่งที่ตัวเองเตรียมมานะ",

        "ขอให้เจอแต่ข้อที่คุ้น ๆ",

        "ทำทีละข้อ ไม่ต้องคิดถึงข้อถัดไป",

        "เธอพร้อมกว่าที่คิดนะ",

        "คะแนนไม่สามารถวัดความพยายามทั้งหมดของเธอได้",

        "วันนี้ทำให้ดีที่สุดก็พอ",

        "ขอให้โชคดีอยู่ข้าง ๆ เธอนะ 🍀",

        "ถ้าข้อไหนยาก อย่าเพิ่งตกใจ",

        "ค่อย ๆ อ่าน แล้วตอบอย่างมีสติ",

        "ขอให้จำได้ทุกอย่างที่ต้องใช้",

        "ก่อนสอบพักให้เพียงพอนะ",

        "อย่าลืมพกความมั่นใจเข้าไปด้วย",

        "เธอทำได้แน่นอนในแบบของเธอ",

        "ไม่ว่าผลจะเป็นยังไง เธอก็เก่งนะ",

        "ขอให้ปากกาลื่น สมองลื่น และข้อสอบใจดี",

        "อีกไม่กี่ชั่วโมงก็ผ่านมันไปแล้ว",

        "ตั้งใจนะ เค้าเอาใจช่วยอยู่ตรงนี้",

        "ขอให้ผลออกมาเป็นสิ่งที่ทำให้ยิ้มได้",

        "สู้ ๆ นะ คนเก่ง วันนี้ต้องผ่านไปได้ ♡"

    ],


    workStudy: [

        "เรียนก็หนัก งานก็เยอะ อย่าลืมดูแลตัวเองนะ",

        "ไม่ต้องทำทุกอย่างให้เสร็จพร้อมกันก็ได้",

        "แบ่งทีละอย่าง แล้วค่อย ๆ จัดการนะ",

        "วันนี้ยุ่งมากแล้ว ขอให้ได้พักบ้างนะ 💼",

        "เก่งมากที่พยายามบาลานซ์หลายอย่างพร้อมกัน",

        "ถ้าเหนื่อยให้พัก ไม่ต้องรู้สึกผิดนะ",

        "งานสำคัญ แต่ตัวเองก็สำคัญเหมือนกัน",

        "อย่าลืมกินข้าวด้วยนะ",

        "พักสายตาจากหน้าจอบ้างนะ",

        "ทำเท่าที่ไหวก่อน ไม่ต้องฝืน",

        "หนึ่งงานเสร็จก็ถือว่าเก่งแล้ว",

        "ค่อย ๆ เคลียร์ไปทีละเรื่องนะ",

        "วันนี้วุ่นวายหน่อย แต่เดี๋ยวมันก็ผ่านไป",

        "อย่าลืมหายใจลึก ๆ ระหว่างงานนะ",

        "เธอไม่ได้ต้องเก่งทุกเรื่องพร้อมกัน",

        "ถ้าวันนี้ทำได้ไม่ครบก็ไม่เป็นไร",

        "พรุ่งนี้ยังมีโอกาสแก้ไขเสมอ",

        "เก็บพลังไว้ให้ตัวเองบ้างนะ",

        "งานเยอะไม่ได้แปลว่าเธอทำไม่ดี",

        "เธอพยายามมากกว่าที่ตัวเองคิดนะ",

        "ขอให้วันนี้งานราบรื่นนะ",

        "ขอให้เจอคนใจดีระหว่างวัน",

        "ถ้าเครียดมาก พักสัก 5 นาทีแล้วค่อยกลับมานะ",

        "ไม่ต้องรีบตอบทุกอย่างทันที",

        "ค่อย ๆ ไปก็ได้ ชีวิตไม่ใช่การแข่งขัน",

        "วันนี้ขอให้มีเวลาส่วนตัวบ้างนะ",

        "เธอจัดการได้ทีละเรื่องแน่นอน",

        "อย่าลืมให้รางวัลตัวเองหลังทำงานเสร็จ",

        "คืนนี้ขอให้นอนหลับสบาย",

        "เก่งมากนะที่ผ่านวันที่ยุ่ง ๆ มาได้ ♡"

    ],


    cute: [

        "วันนี้ก็ขอให้เธอยิ้มเยอะ ๆ นะ 🧸",

        "ถ้าวันนี้ไม่มีใครชม งั้นขอชมเองนะว่าเก่งมากเลย",

        "เธอน่ารักกว่าที่ตัวเองคิดนะ 🌸",

        "ขอส่งกอดเล็ก ๆ ไปให้หนึ่งที",

        "อย่าลืมว่าเธอมีคุณค่ามากนะ",

        "วันนี้ขอให้มีเรื่องน่ารัก ๆ เข้ามาหา",

        "ถ้าเหนื่อยก็แวะมาหากันตรงนี้ได้นะ",

        "ยิ้มหน่อยนะ คนเก่ง 😊",

        "ขอให้วันนี้ใจดีกับเธอมาก ๆ",

        "เธอสมควรได้รับความน่ารักเหมือนกันนะ",

        "มอบหัวใจหนึ่งดวงให้เลย 💗",

        "ขอให้มีคนทำให้ยิ้มได้ในวันนี้",

        "วันนี้ขอให้โชคดีแบบน่ารัก ๆ",

        "เก็บรอยยิ้มไว้เยอะ ๆ นะ เพราะรอยยิ้มของเธอน่ารักดี",

        "ขอให้ความน่ารักอยู่กับเธอทั้งวัน",

        "ถ้าไม่มีใครกอด งั้นกอดจากตรงนี้ก่อนนะ 🤗",

        "เธอเก่งมากแล้วนะ",

        "ขอให้มีความสุขกับเรื่องเล็ก ๆ ระหว่างวันที่วุ่นวายนะ 🌷",

        "ไม่ว่าจะเจออะไร ขอให้ยังมีเหตุผลให้ยิ้ม",

        "ขอให้คืนนี้ฝันดีนะ 🌙",

        "ขอให้วันนี้ไม่มีอะไรทำให้ใจเจ็บนะ",

        "เธอไม่จำเป็นต้องสมบูรณ์แบบเพื่อที่จะเป็นคนที่น่ารักนะ 🌸",

        "มีพื้นที่เล็ก ๆ ตรงนี้ไว้ให้เธอมารับกำลังใจเสมอนะ",

        "วันนี้ก็สู้ ๆ นะ คนเก่ง",

        "ขอให้ความเหนื่อยหายไปเร็ว ๆ",

        "ขอให้เธอมีวันที่ใจดีกับตัวเองมาก ๆ",

        "ไม่ว่าผลจะออกมาเป็นยังไง เธอก็ยังเป็นคนเดิมที่น่ารักนะ",

        "ถ้าเหนื่อยแล้ว มาพักตรงนี้ก่อนได้นะ",

        "วันนี้ขอให้เธอมีความสุขมาก ๆ",

        "อยู่ตรงนี้เสมอนะ ♡"

    ]

};


/* =====================================================
   ENCOURAGEMENT ELEMENTS
===================================================== */

const encourageText =
    document.getElementById(
        "encourageText"
    );


const randomEncourageBtn =
    document.getElementById(
        "randomEncourageBtn"
    );


let currentCategory =
    "tired";


let lastEncourageIndex =
    -1;


/* =====================================================
   RANDOM ENCOURAGEMENT
===================================================== */

function randomEncouragement() {

    if (!encourageText) {
        return;
    }


    const messages =
        encouragementMessages[
            currentCategory
        ];


    if (
        !messages ||
        messages.length === 0
    ) {
        return;
    }


    let index;


    do {

        index =
            Math.floor(
                Math.random() *
                messages.length
            );

    } while (
        index ===
            lastEncourageIndex &&
        messages.length > 1
    );


    lastEncourageIndex =
        index;


    encourageText.style.opacity =
        "0";


    encourageText.style.transform =
        "translateY(8px)";


    setTimeout(
        () => {

            encourageText.textContent =
                messages[index];


            encourageText.style.opacity =
                "1";


            encourageText.style.transform =
                "translateY(0)";

        },
        180
    );

}


/* =====================================================
   ENCOURAGEMENT CATEGORY
===================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".encourage-category"
            );


        if (!button) {
            return;
        }


        document
            .querySelectorAll(
                ".encourage-category"
            )
            .forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


        button.classList.add(
            "active"
        );


        currentCategory =
            button.dataset.category;


        lastEncourageIndex =
            -1;


        randomEncouragement();

    }
);


/* =====================================================
   RANDOM BUTTON
===================================================== */

if (randomEncourageBtn) {

    randomEncourageBtn.addEventListener(
        "click",
        randomEncouragement
    );

}


if (encourageText) {

    encourageText.style.transition =
        ".3s ease";

}


/* =====================================================
   TELEGRAM HUG
===================================================== */

/*
    IMPORTANT

    Telegram Bot Token
    ต้องอยู่ใน Google Apps Script

    ห้ามใส่ Bot Token
    ในไฟล์ JavaScript นี้
*/


const TELEGRAM_WEBHOOK_URL =
    "https://script.google.com/macros/s/AKfycbweMiPJjbaFP_WMfElZxg2KJON32-YyBi1d4umEG9EwMKEjgRA_KfeexRM9AdDse86-/exec";


const hugBtn =
    document.getElementById(
        "hugBtn"
    );


const hugStatus =
    document.getElementById(
        "hugStatus"
    );


if (hugBtn) {

    hugBtn.addEventListener(
        "click",
        async () => {

            hugBtn.disabled =
                true;


            hugBtn.classList.add(
                "sent"
            );


            hugBtn.textContent =
                "🤗 กอดแล้วนะ ♡";


            if (hugStatus) {

                hugStatus.textContent =
                    "กำลังส่งกอดไปให้...";

            }


            try {

                const response =
                    await fetch(
                        TELEGRAM_WEBHOOK_URL,
                        {
                            method:
                                "POST",

                            headers:
                                {
                                    "Content-Type":
                                        "text/plain;charset=utf-8"
                                },

                            body:
                                JSON.stringify(
                                    {
                                        type:
                                            "hug"
                                    }
                                )
                        }
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        "Telegram request failed"
                    );

                }


                if (hugStatus) {

                    hugStatus.textContent =
                        "กอดถูกส่งไปแล้วนะ ♡";

                }


            } catch (error) {

                console.error(
                    error
                );


                if (hugStatus) {

                    hugStatus.textContent =
                        "ส่งไม่สำเร็จ ลองอีกครั้งนะ ♡";

                }


                hugBtn.disabled =
                    false;


                hugBtn.classList.remove(
                    "sent"
                );


                hugBtn.textContent =
                    "🤗 กอดหน่อย";


                return;

            }


            setTimeout(
                () => {

                    hugBtn.disabled =
                        false;


                    hugBtn.classList.remove(
                        "sent"
                    );


                    hugBtn.textContent =
                        "🤗 กอดอีกครั้ง";

                },
                4000
            );

        }
    );

}


/* =====================================================
   FINAL SURPRISE
===================================================== */

const openGift =
    document.getElementById(
        "openGift"
    );


const finalMessage =
    document.getElementById(
        "finalMessage"
    );


const finalTitle =
    document.getElementById(
        "finalTitle"
    );


const finalText =
    document.getElementById(
        "finalText"
    );


const gift =
    document.getElementById(
        "gift"
    );


if (openGift) {

    openGift.addEventListener(
        "click",
        () => {

            if (finalMessage) {

                finalMessage.classList.remove(
                    "hidden"
                );

            }


            if (finalTitle) {

                finalTitle.textContent =
                    "จริง ๆ แล้ว... ♡";

            }


            if (finalText) {

                finalText.textContent =
                    "มีบางอย่างที่อยากบอก";

            }


            if (gift) {

                gift.textContent =
                    "💗";

            }


            openGift.textContent =
                "เปิดแล้วนะ ♡";


            openGift.disabled =
                true;

        }
    );

}


/* =====================================================
   INIT
===================================================== */

updatePin();


if (encourageText) {

    encourageText.style.transition =
        ".3s ease";

}