const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new error('Error al iniciar la base de datos');
    }
}


module.exports = {
    dbConnection
}