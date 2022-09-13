import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';  

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', 'true');
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    // console.log(selectedDates[0]);
    if (options.defaultDate.getTime() < selectedDates[0].getTime()) {
      refs.startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onClick);
function onClick() {
  refs.startBtn.setAttribute('disabled', 'true');

  const timerId = setInterval(() => {
    const currentDate = Date.now();

    deltaTime = selectedDate - currentDate;
    if (currentDate > selectedDate) {
      clearInterval(timerId);
    }
    const timeComponents = convertMs(deltaTime);
    console.log(timeComponents);
    updateTimer(timeComponents);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = `${days}`;
  refs.hours.innerHTML = `${hours}`;
  refs.minutes.innerHTML = `${minutes}`;
  refs.seconds.innerHTML = `${seconds}`;
}
