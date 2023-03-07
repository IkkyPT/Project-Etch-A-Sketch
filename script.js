// Etch-A-Scetch game with basic features as resizing canvas, color-picking, erase, clear the board

const sliderValue = document.getElementsByClassName('numDivs')[0];
const slider = document.getElementById('myRange');
const container = document.querySelector('.container');
let currSlideVal = sliderValue;
let currSlideValInt = parseInt(currSlideVal.innerHTML);

slider.addEventListener('input', function() {
  currSlideVal.innerHTML = '';
  let text = document.createTextNode(slider.value);
  currSlideVal.appendChild(text);
  currSlideValInt = parseInt(currSlideVal.innerHTML);

  container.innerHTML = '';
  createBoard(currSlideValInt);
  setupMenu();
});

// Function to create the drawing board by looping rows through columns
// Creates a grid of square divs with a size calculated based on the slider value
function createBoard(currSlideValInt) {
  for (let i = 0; i < currSlideValInt; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);

    for (let j = 0; j < currSlideValInt; j++) {
      const square = document.createElement('div');
      square.style.width = `calc((464px / ${currSlideValInt}) + 1.01px)`;
      square.style.height = `calc((464px / ${currSlideValInt}) + 1.01px)`;
      square.classList.add('square');
      row.appendChild(square);
    }
  }
}

// Function to set up the drawing menu (Resising, erasing, color-picking and clearing)
function setupMenu() {
  const colorChanger = document.querySelectorAll('.square');
  let isMouseDown = false;
  let isEraserOn = false;
  let currColor = '#000000';
  const colorPicker = document.getElementById('colorPicker');

  colorPicker.addEventListener('input', function() {
    currColor = colorPicker.value;
  });

  colorChanger.forEach((colorSquare) => {
    colorSquare.addEventListener('mousedown', () => {
      isMouseDown = true;
    });

    colorSquare.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    colorSquare.addEventListener('mousemove', () => {
      if (isMouseDown && !isEraserOn && isInsideContainerElement(event)) {
        colorSquare.style.backgroundColor = currColor;
      } else if (isMouseDown && isEraserOn && isInsideContainerElement(event)) {
        colorSquare.style.backgroundColor = 'transparent';
      }
    });

    colorSquare.addEventListener('click', () => {
      if (!isEraserOn) {
        colorSquare.style.backgroundColor = currColor;
      } else {
        colorSquare.style.backgroundColor = "transparent";
      }
    });
  });

  container.addEventListener('mouseleave', () => {
    isMouseDown = false;
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  function isInsideContainerElement(event) {
    return event.target.closest('.container') === container;
  }

  const clearBoard = document.querySelector('#clear');
  clearBoard.addEventListener('click', () => {
    colorChanger.forEach((colorSquare) => {
      colorSquare.style.backgroundColor = 'transparent';
    });
  });

  const eraseBoard = document.querySelector('#eraser');
  eraseBoard.addEventListener('click', () => {
    isEraserOn = !isEraserOn;
  });
}

// UI

const toogle = document.getElementById('eraser');
let isToogleOn = false;

toogle.addEventListener('click', () => {
  isToogleOn = !isToogleOn;
  if (isToogleOn){
    toogle.style.backgroundColor = '#3b3b4f';
    toogle.style.color = 'white';
    toogle.style.border = '2px solid white';
  }
  else {
    toogle.style.backgroundColor = 'white';
    toogle.style.color = 'black';
    toogle.style.border = '2px solid #3b3b4f';
  }
});

//Calling the function in the start of the page
createBoard(currSlideValInt);
setupMenu();