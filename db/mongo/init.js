const mongoose = require('mongoose');

let { host, port} = process.env;
console.log(`mongodb://${host}:${port}/test`)
mongoose.connect(`mongodb://${host}:${port}/test`, {useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Failed to connect to mongodb`);
    console.error(err);
});

db.once('open', ()=> console.log('Database connection to mongodb was successfull'));

module.exports = mongoose;