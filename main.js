'use strict'

let gridWidth = 16;
let mode = 'rgb';
mode = 'greyscale';
createGrid(gridWidth);

let btnNew = document.querySelector('#btnNew');
btnNew.addEventListener('click', newGrid);
let btnModeRGB = document.querySelector('#btnModeRGB');
btnModeRGB.addEventListener('click', () => setMode('rgb'));

let btnModeGreyscale = document.querySelector('#btnModeGreyscale');
btnModeGreyscale.addEventListener('click', () => setMode('greyscale'));

function newGrid() {
    let userInput = +prompt('How many squares per side?', 0);
    if (isFinite(userInput) && userInput > 0) {
        clearOldGrid();
        gridWidth = userInput;
        createGrid(gridWidth);
    }
}

function clearOldGrid() {
    let container = document.querySelector('#container');
    container.innerHTML = '';
}

function createGrid(gridWidth) {
    for (let i = 0; i < gridWidth * gridWidth; i++) {
        createSquareDiv(i, gridWidth);
    }
}

function createSquareDiv(id, gridWidth) {
    let newDiv = document.createElement('div');
    let width = (100 / gridWidth) + 'vmin';

    newDiv.di = id;
    newDiv.style.width = width;
    newDiv.style.height = width;

    let gridRow = Math.floor(id / gridWidth) + 1;
    let gridColumn = id % gridWidth + 1;
    newDiv.style.gridRowStart = gridRow;
    newDiv.style.gridRowEnd = gridRow + 1;
    newDiv.style.gridColumnStart = gridColumn;
    newDiv.style.gridColumnEnd = gridColumn + 1;

    if (mode == 'greyscale') {
        newDiv.style.backgroundColor = 'rgb(225, 225, 225)';
    }
    newDiv.classList.add('paintingarea')

    newDiv.addEventListener('mouseover', pixelTrail)

    let container = document.querySelector('#container');
    container.style.width = (100 / gridWidth) * gridWidth + 'vmin';
    container.style.height = (100 / gridWidth) * gridWidth + 'vmin';

    container.appendChild(newDiv);
}

function pixelTrail(e) {
    e.target.classList.add('pixeltrail');
    if (mode == 'rgb') {
        e.target.style.backgroundColor = getRandomRGB();
    } else if (mode == 'greyscale') {
        nextScaleColor(e.target);
    }
}

function getRandomRGB() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`;
}

function nextScaleColor(element) {
    let scale = [];
    for (let i = 0; i < 10; i++) {
        scale.push(`rgb(${i*25}, ${i*25}, ${i*25})`);
    }
    let current = element.style.backgroundColor;
    let index = scale.indexOf(current);
    if(index > 0) {
        element.style.backgroundColor = scale[index-1];
    }
}

function setMode(newMode) {
    mode = newMode
    createGrid(gridWidth);
}



setMode('rgb');
setMode('greyscale')
