const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) =>{
  const cityDets = data.cityDets;
  const weather = data.weather;

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  //remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

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