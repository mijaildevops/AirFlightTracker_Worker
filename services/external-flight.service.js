const axios = require('axios');
const { DateTime } = require('luxon');

function getCurrentDateTime() {
  const now = DateTime.local();
  const formattedDateTime = now.toFormat('yyyyMMddHHmmss');
  return formattedDateTime;
}

const getNewFlightStatus = async(limit, flight_status=null, airline_iata=null, arr_scheduled_time_dep=null) => {
  const accessKey = '4109add0f9aa94b8aedfe96811bf7cab';
  const currentDateTime = getCurrentDateTime();
  console.log(` - Get New Flight Status:  ${currentDateTime}`)
  //
  let  apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}&limit=${limit}`
  if (flight_status!= null){
    apiUrl = `${apiUrl}&flight_status=${flight_status}` 
  }
  if (airline_iata!= null){
    apiUrl = `${apiUrl}&airline_iata=${airline_iata}` 
  }
  if (arr_scheduled_time_dep!= null){
    apiUrl = `${apiUrl}&arr_scheduled_time_dep=${arr_scheduled_time_dep}` 
  }
  //
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const flights = data.data;
    return flights;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getNewFlightStatus
}; 