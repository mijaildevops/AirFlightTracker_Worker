const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 

const user = process.env.USERDB
const password = process.env.PASSWORDDB
const dbName = process.env.DBNAME
const srv = `mongodb+srv://${user}:${password}@cluster0.y2h7gww.mongodb.net/${dbName}?retryWrites=true&w=majority`

const conexionDb = async (requestId) => {
  // Establecer la conexión con la base de datos de MongoDB
  mongoose.connect(srv, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log(`   - ${requestId} --> Conexión exitosa a MongoDB`);      
    })
    .catch(error => {
      console.log(`   - [${requestId}]Error al conectar a MongoDB:`, error);
    });

}
module.exports = {
    conexionDb
  }; 
