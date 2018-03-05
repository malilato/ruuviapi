var Ruuvi = require('../models/ruuvi-model.js');
var ruuviConfig = require('../../config/ruuvi-config.js');

exports.create = function(req, res) {
    if(req.get("Authorization") !== ruuviConfig.authSecret) {
      return res.status(401).send({message: "Authorization header not accepted"});
    }
    // Create and Save a new Ruuvi data
    if(!req.body.sensorMac) {
        return res.status(400).send({message: "sensorMac can not be empty"});
    }
    if(!req.body.temperature) {
        return res.status(400).send({message: "temperature can not be empty"});
    }
    if(!req.body.humidity) {
        return res.status(400).send({message: "humidity can not be empty"});
    }
    if(!req.body.pressure) {
        return res.status(400).send({message: "pressure can not be empty"});
    }
    if(!req.body.sensorIdentifier) {
        return res.status(400).send({message: "sensorIdentifier can not be empty"});
    }
    var ruuvi = new Ruuvi({sensorMac: req.body.sensorMac, temperature: req.body.temperature
    , humidity: req.body.humidity, pressure: req.body.pressure, sensorIdentifier: req.body.sensorIdentifier});

    ruuvi.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while saving the Ruuvi-data."});
        } else {
            res.send(data);
        }
    });
};

exports.findLastDay = function(req, res) {
    // Retrieve and return latest 144 items from database
    Ruuvi.find().sort({createdAt: -1}).limit(144).exec(function(err, ruuvi) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving ruuvi datas."});
        } else {
            res.send(ruuvi);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all ruuvi data from the database.
    Ruuvi.find(function(err, ruuvis){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving ruuvi datas."});
        } else {
            res.send(ruuvis);
        }
    });
};

exports.findLatest = function(req, res) {
    // Find the latest ruuvi data insert
    Ruuvi.findOne().sort({createdAt: -1}).exec(function(err, ruuvi) {
        if(err) {
            console.log(err);

            return res.status(500).send({message: "Error retrieving latest ruuvi data"});
        }

        if(!ruuvi) {
            return res.status(404).send({message: "Latest ruuvi data not found"});
        }

        res.send(ruuvi);
    });
};
