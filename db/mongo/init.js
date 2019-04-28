// Import library
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

// Connect to mongodb
let { MONGODB_HOST, MONGODB_PORT} = process.env;
mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/test`, { useNewUrlParser: true });

// Check db connection
let db = mongoose.connection;
db.on('error', (err) => {
    console.log(`Failed to connect to mongodb`);
    console.error(err);
});
db.once('open', ()=> console.log('Database connection to mongodb was successfull'));

//Create schemas
let { Schema } = mongoose;

/**
 * Schema to create a counter
 */

let counterSchema = new Schema({
    _id         : { type : String, required: true},
    count       : { type : Number, default: 0}
});

/**
 * Schema to create a hash
 */

let hashSchema = new Schema({
    _id         : Number,
    url         : String,
    created_at  : Date
});

/**
 * Create models for the schemas
 */
let Counter = mongoose.model('Counter', counterSchema);

/**
 * A prehook to increase the counter on each addition 
 */
hashSchema.pre('save', function(next) {
    let doc = this;
    console.log(doc);
    
    Counter.findOneAndUpdate({ _id : 'url_count'}, { $inc : { count : 1 }})
    .then(counter => {
        doc._id = counter.count;
        doc.created_at = new Date();
        next();
    })
    .catch(err => {
        console.error(err);
    })
});
let Hash = mongoose.model('Hashes', hashSchema);

/**
 * Create a counter if it does not exists 
 */
Counter.findOne( { _id : 'url_count' }, (err, doc) => {
    if (err || !doc){
        console.log("Creating counter");
        let counter = new Counter({
            _id : 'url_count',
            count: 10000
        });
        counter.save();
    }
});

module.exports = {
    Hash
};