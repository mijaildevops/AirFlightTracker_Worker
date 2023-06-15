// Requiring module
const mongoose = require('mongoose');
  
// External_Flights Modal Schema
const ExternalFlightsSchema = new mongoose.Schema({
    requestId: {type:String, require: true},
    flights:{},
});
  
// Flights Modal Schema
const FlightsSchema = new mongoose.Schema({
    requestId: {type:String, require: true}, 
    flights:{},
    key:{type:String, require: true},
    active: {type:String, require: true},
});

// Airlines Modal Schema
const AirlinesSchema = new mongoose.Schema({
    name: {type:String, require: true}, 
    iata:{type:String, require: true},
    icao:{type:String, require: true},
    active: {type:String, require: true},
});

// Route Modal Schema
const RoutesSchema = new mongoose.Schema({
    departure: {}, 
    arrival:{},
    active: {type:Boolean, require: true},
});


// Creating model objects
const ExternalFlightModel = mongoose.model('External_flight', ExternalFlightsSchema);
const FlightModel = mongoose.model('Flight', FlightsSchema);
const AirlinesModel = mongoose.model('Airlines', AirlinesSchema);
const RoutesModel = mongoose.model('Routes', RoutesSchema);
  
// Exporting our model objects
module.exports = {
    ExternalFlightModel, 
    FlightModel, 
    AirlinesModel,
    RoutesModel,
}