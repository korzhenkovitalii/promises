const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.buttonStart.addEventListener('click', onClickStart);
refs.buttonStop.addEventListener('click', onClickStop);

const DELAY = 1000;
let timerId = null;

//function generates random colors
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStart() {
  refs.buttonStart.setAttribute('disabled', true);
  refs.buttonStop.removeAttribute('disabled');

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

function onClickStop() {
  refs.buttonStop.setAttribute('disabled', true);
  refs.buttonStart.removeAttribute('disabled');
  clearInterval(timerId);
}
