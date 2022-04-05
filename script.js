let SIZE = 16;
const CANVAS = document.querySelector(".canvas-container");
const COLOR_PICKER = document.querySelector("#currColor");
const COLOR_MODE = document.querySelector("#color");
const RAINBOW_MODE = document.querySelector("#rainbow");
const ERASER_MODE = document.querySelector("#erase")
const CLEAR_CANVAS = document.querySelector("#clear");
const SIZE_SLIDER = document.querySelector("#size");
const SLIDER_SIZE = document.querySelector('.currSize');
let currentMode = "color";
let color = "black";
let mousedown = false;
let settings = [COLOR_MODE, RAINBOW_MODE, ERASER_MODE]

const getRandomInt = () => {
    return Math.floor(Math.random() * 256);
}

const settingHandler = (e) => {
    removeActiveClass();
    addActiveClass(e);
    currentMode = e.target.id;
};

CLEAR_CANVAS.addEventListener('click', (e) => {
    clearCanvas(e);
})

const clearCanvas = () => {
    let pixels = document.querySelectorAll('.pixel');
    Array.from(pixels).forEach(pixel => {
        pixel.style.background = 'white';
    })
}

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

SIZE_SLIDER.addEventListener('change', (e) => {
    SIZE = e.target.value;
    SLIDER_SIZE.innerText = SIZE;
    clearCanvas();
    makeGrid(SIZE, SIZE)
})

settings.forEach(setting => {
    setting.addEventListener("click", (e) => {
        settingHandler(e);
    });
});

const drawHandler = (e) => {
    let currentElement = e.target.style;
    if(currentMode === 'color') {
        currentElement.background = color;
    } else if(currentMode === 'rainbow') {
        currentElement.background = 'rgb(' + getRandomInt() + ',' + getRandomInt() + ',' + getRandomInt() +')';
    } else {
       currentElement.background = 'white';
    }
}

COLOR_PICKER.addEventListener('change', (e) => {
    color = e.target.value;
})

let makeGrid = (rows, cols) => {
    CANVAS.style.setProperty('--grid-rows', rows);
    CANVAS.style.setProperty('--grid-cols', cols);
    for(let i = 0; i < (rows * cols); i++) {
        let PIXEL = document.createElement('div');
        PIXEL.addEventListener('mousedown', (e) => {
            mousedown = true;
        })
        PIXEL.addEventListener("mouseup", (e) => {
            mousedown = false;
        })
        PIXEL.addEventListener("mouseenter", (e) => {
            if (mousedown === false) return
            drawHandler(e);
        })
        CANVAS.appendChild(PIXEL).className = 'pixel';
    }
}
makeGrid(SIZE, SIZE)

CANVAS.addEventListener("mouseleave", () => {
    mousedown = false;
})


