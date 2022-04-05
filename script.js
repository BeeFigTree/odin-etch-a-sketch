const SIZE = 16;
const CANVAS = document.querySelector(".canvas-container");
const COLOR_PICKER = document.querySelector("#currColor");
const COLOR_MODE = document.querySelector('#color');
const RAINBOW_MODE = document.querySelector("#rainbow");
const ERASER_MODE = document.querySelector("#erase")
const CLEAR_CANVAS = document.querySelector("#clear");
const SHADE_MODE = document.querySelector("#shade");

let color = "black";
let mousedown = false;
let settings = [COLOR_MODE, RAINBOW_MODE, CLEAR_CANVAS, ERASER_MODE, SHADE_MODE]
const settingHandler = (e) => {
    removeActiveClass();
    addActiveClass(e);
};


//Remove the class selected when a new mode is selected
const removeActiveClass = () => {
    let toRemoveActiveClass = document.querySelector(".selected") ? document.querySelector(".selected") : document.querySelector('.rainbow-selected');
    let classToRemove = toRemoveActiveClass.id === "rainbow" ? 'rainbow-selected' : 'selected';
    toRemoveActiveClass.classList.remove(classToRemove);
};

const addActiveClass = (e) => {
    if(e.target.id === 'rainbow') {
        e.target.classList.add('rainbow-selected');
    } else {
        e.target.classList.add('selected');
    }
};

settings.forEach(setting => {
    console.log(setting)
    setting.addEventListener("click", (e) => {
        settingHandler(e);
    });
});



COLOR_PICKER.addEventListener('change', (e) => {
    color = e.target.value;
})

let makeGrid = (rows, cols) => {
    CANVAS.style.setProperty('--grid-rows', rows);
    CANVAS.style.setProperty('--grid-cols', cols);
    for(let i = 0; i < (rows * cols); i++) {
        let PIXEL = document.createElement('div');
        PIXEL.addEventListener('mousedown', (e) => {
            e.target.style.background = color;
            mousedown = true;
        })
        PIXEL.addEventListener("mouseup", (e) => {
            mousedown = false;
        })
        PIXEL.addEventListener("mouseover", (e) => {
            if (mousedown === false) return
            e.target.style.background = color;
        })
        CANVAS.appendChild(PIXEL).className = 'pixel';
    }
}
makeGrid(SIZE, SIZE)



