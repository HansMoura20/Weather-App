const key ='SwYQ4WtEP7sTDGwXMppK1ExcyA2YCe0a';

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

getCity('manchester')
  .then(data => console.log(data))
  .catch(err => console.log(err));