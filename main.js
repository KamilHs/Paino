//List of Notes
const notes = [
    "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
    "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5",
    "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6", "A6", "Bb6", "B6"
];


const keyboard = [
    "q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u",
    "i", "9", "o", "0", "p", "z", "s", "x", "d", "c", "f", "v",
    "b", "h", "n", "j", "m", ",", "l", ".", ";", "/", "'"
]

// let array = [];

let numberOfOctaves = 4;
let audiosContainer = document.getElementById("audios-container");
let keysContainer = document.getElementById("keys-container");

let isMousePressed = false;

let octave = 4;

let offset = 12;

let widthOfWhite = window.innerWidth / (octave * 7);
let widthOfBlack = widthOfWhite / 2;

let heightOfWhite = widthOfWhite * 4;
let heightOfBlack = widthOfBlack * 4;

let marginOfBlack = -widthOfBlack / 2;

let fontSize = widthOfBlack / 1.5;


document.addEventListener('keydown', function (e) {
    if (e.repeat) return;

    let i = keyboard.indexOf(e.key);


    if (i != -1) {
        this.getElementsByClassName('key')[i + offset].classList.add('active');
        play(i + offset);
    }
})

document.addEventListener('keyup', function (e) {
    let i = keyboard.indexOf(e.key);
    if (i != -1) {
        this.getElementsByClassName('key')[i + offset].classList.remove('active');

    }
})

keysContainer.addEventListener('mouseleave', e => isMousePressed = false);


for (let i = 0; i < notes.length; i++) {
    let audio = document.createElement("audio");
    audio.id = notes[i];
    audio.classList.add("audio");
    audio.src = "notes/" + notes[i] + ".mp3";
    audio.preload = true;
    audiosContainer.appendChild(audio);

    let key = document.createElement('div');
    let textContainer = document.createElement('span');


    key.dataset.note = notes[i];

    textContainer.classList.add('text');
    key.classList.add("key");

    textContainer.style.fontSize = fontSize + "px";

    if (i >= offset)
        textContainer.textContent = keyboard[i - 12];

    if (notes[i].length == 3) {
        key.classList.add("black")
        key.style.width = widthOfBlack + "px";
        key.style.height = heightOfBlack + "px";
        key.style.margin = "0" + marginOfBlack + "px";
    }
    else {
        key.classList.add("white");
        key.style.width = widthOfWhite + "px";
        key.style.height = heightOfWhite + "px";
    }

    let timeout;

    key.addEventListener('mouseenter', e => {
        if (isMousePressed) {
            clearTimeout(timeout);
            key.classList.add('active');
            play(i);
        }
    })
    key.addEventListener('mouseleave', e => {
        key.classList.remove('active')
        timeout = setTimeout(() => audio.pause(), 3000);
    })

    key.addEventListener('mousedown', e => {
        clearTimeout(timeout);
        play(i);
        key.classList.add('active');
        isMousePressed = true;
    });
    key.addEventListener('mouseup', e => {
        key.classList.remove('active');
        isMousePressed = false;
        timeout = setTimeout(() => audio.pause(), 3000);

    });

    key.appendChild(textContainer);
    keysContainer.appendChild(key);
}

function play(i) {
    let playedAudio = document.getElementsByClassName('audio')[i];
    playedAudio.play();
    playedAudio.currentTime = 0;
}