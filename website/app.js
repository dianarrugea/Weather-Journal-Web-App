/* Global Variables */

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();


// Personal API Key for OpenWeatherMap API
const baseURL= "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=54462a8f0240054e012e6da7a2372460";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
    function performAction(e){
        const newZip =  document.getElementById('zip').value;
        const feelings = document.getElementById(`feelings`).value;
        
        getWeatherInfo(baseURL, newZip, apiKey)
        
        .then(function(data) {
          console.log (data);
          //Adding the data to the POST request
          postData(`/add`, {date:newDate, temp:data.main.temp, content: feelings});
        })
        .then(updateUI);
      };

/* Function to GET Web API Data*/
  const getWeatherInfo = async (baseURL, newZip, apiKey) => {
       const res = await fetch(baseURL+newZip+apiKey);
          try {
            const data = await res.json();
            console.log(res);
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
    document.getElementById(`date`).innerHTML = `Date: ${allData.date}`;
    document.getElementById(`temp`).innerHTML = `Temperature: ${allData.temperature}`;
    document.getElementById(`content`).innerHTML = `I feel: ${allData.userResponse}`; 
  }catch(error) {
    console.log("error", error);
  }
}

