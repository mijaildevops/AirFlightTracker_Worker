const mongoose = require('mongoose');
const cron = require("node-cron");
const { v4: uuidv4 } = require('uuid');
const { getNewFlightStatus } = require ('./services/external-flight.service');
const { conexionDb } = require('./config/db')
const Models = require('./models/model')
const dotenv = require('dotenv').config(); 


const getFlightService = async () => {
    const dateActual = new Date();
    const requestId = uuidv4();
    //
    limit = 100
    flightStatus = 'active'
    airline = null
    console.log( ` - ${requestId} --> La función se está ejecutando --> ${dateActual} `);
    //
    await conexionDb(requestId)
    try{
        // Get flights
        const flights = await getNewFlightStatus(limit, flightStatus, airline)
        const saveFlights = new Models.ExternalFlightModel({ requestId: requestId, flights:  flights});
        await saveFlights.save();
        // update
        await Models.FlightModel.updateMany({}, { active: false });
        await Models.AirlinesModel.updateMany({}, { active: false });
        await Models.RoutesModel.updateMany({}, { active: false });
        //
        const processFlights = await Promise.all(
            flights.map(async (flight) => {
                let flightNumber = `${flight.airline.iata}_${flight.flight.number}`
                let route = `${flight.departure.iata}-${flight.arrival.iata}`
                let key = `${flightNumber}_${route}`
                console.log(`    - Process key: ${key}`)
                // save flight
                const saveFlight = new Models.FlightModel({ requestId: requestId, flights:  flight, key: key, active: true});
                await saveFlight.save();
                // airlines
                const airlineStatus = await  Models.AirlinesModel.findOne({ name: flight.airline.name }).exec()
                if (airlineStatus){
                    console.log(`        -- The  airline ${ flight.airline.name} Existe`)
                    await Models.AirlinesModel.updateMany({ name: flight.airline.name }, { $set: { active: true } });
                }else{
                    console.log(`        -- Save New airline ${ flight.airline.name} Existe`)
                    const saveAirline = new Models.AirlinesModel({ name: flight.airline.name, iata:  flight.airline.iata, icao: flight.airline.icao, active:true});
                    await saveAirline.save();
                }
                // Routes
                //const routeStatus = await  Models.RoutesModel.findOne({ name: flight.airline.name }).exec()
                const saveRoute = new Models.RoutesModel({ departure: {'airport': flight.departure.airport, 'iata': flight.departure.iata}, arrival: {'airport': flight.arrival.airport, 'iata': flight.arrival.iata}, active: true});
                await saveRoute.save();
                
            })
        )
    } catch (error) {
        console.log(error);
    }

    mongoose.disconnect();
    console.log(` - Process Finalizado: ${requestId}`)
}

if(process.env.NODE_ENV == 'production'){
    console.log('RUN PROD 7 Horas')
    cron.schedule('10 */7 * * *', () => {
        getFlightService();
    });
} else {
    console.log('RUN TEST cada minuto')
    cron.schedule('*/1 * * * *', () => {
        getFlightService();
    });
}
