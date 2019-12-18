const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://m001-student:<password>@sandbox-wtclz.mongodb.net/test?retryWrites=true&w=majority",
{useNewUrlParser=true,dbName='ppl'})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Sambung")
});

let fintechSchema = new mongoose.Schema({
    id: String,
    balance : Number
})

let fintech = mongoose.model('fintech',fintechSchema,'fintech')
fintech.create({
    id:"ABANG",balance:25000
})
module.exports = fintech