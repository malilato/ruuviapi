var mongoose = require('mongoose');

var RuuviSchema = mongoose.Schema({
    sensorMac: String,
    temperature: Number,
    humidity: Number,
    pressure: Number,
    sensorIdentifier: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('RuuviModel', RuuviSchema);
