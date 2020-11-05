const key ='';

//1.getcity information
const getCity = async (city) =>{
  //this is the base url that we want to make a request
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

  const query = `?apikey=${key}&q=${city}`;

  //combine the base and query to fetch the resource
  //this returns a promise
  const response = await fetch(base + query);
  //get the data
  const data = await response.json();

  return data[0];
};


//2.get weather information
const getWeather = async (id) =>{
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

  

