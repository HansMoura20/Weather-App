const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateCity = async (city) => {
  //make sure that the "getCity()" has finished before assigning the value to "cityDets"
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };
};

cityForm.addEventListener('submit', (e) =>{
  //prevent default action so that it does not refresh the page on submit
  e.preventDefault();

  //get city value and trim if there is any white space
  const city = cityForm.city.value.trim();

  //clear the form fields
  cityForm.reset();

  //update the UI with new city
  updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));
});

const updateUI = (data) =>{
  //destructure properties
  const { cityDets, weather } = data;
  console.log(data);
  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <h3 class="my-3">${cityDets.Country.EnglishName}</h3>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};