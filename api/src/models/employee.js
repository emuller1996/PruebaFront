const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numberEmployee: mongoose.Schema.Types.Number,
    name: String,
    lastName : String,
    state : mongoose.Schema.Types.Boolean,
    registrationDate: String,
}, {
    collection: 'employee'
})
module.exports = mongoose.model('employee', employeeSchema)