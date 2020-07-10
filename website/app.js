/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
let baseURL= "https://api.openweathermap.org/data/2.5/weather?zip="
let apiKey = "&appid=54462a8f0240054e012e6da7a2372460";


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
    function performAction(e){
        const newZip =  document.getElementById('zip').value;
        const feelings = document.getElementById(`feelings`).value;
        getWeatherInfo(baseURL, zip, apiKey)
        
        .then(function(data) {
          console.log (data);
          //Adding the data to the POST request
          postData(`/addInfo`, {date:newDate, temp:data.list[0].main.temp, content:feelings});
          updateUI();
        })
      };

/* Function to GET Web API Data*/
  const getWeatherInfo = async (baseURL, zip, apiKey) => {
       const res = await fetch(baseURL+zip+apiKey);
          try {
            const data = await res.json();
            console.log(data)
            return data;
          }  catch(error) {
            console.log("error", error);
          }
        }

   
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header     
      body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch(`/all`);
  try{
    const allData = await request.json();
    document.getElementById(`date`).innerHTML = `Date: $(allData[0].date)`;
    document.getElementById(`temp`).innerHTML = `Temperature: $(allData[0].temp)`;
    document.getElementById(`content`).innerHTML = `I feel: $(allData[0].content)`; 
  }catch(error) {
    console.log("error", error);
  }
}
