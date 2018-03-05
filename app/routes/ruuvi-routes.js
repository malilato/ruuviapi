module.exports = function(app) {

    var ruuvis = require('../controllers/ruuvi-controller.js');

    // Create a new Note
    app.post('/ruuvis', ruuvis.create);

    // Retrieve all Notes
    app.get('/ruuvis/findAll', ruuvis.findAll);

    // Retrieve a single Note with noteId
    app.get('/ruuvis/findLatest', ruuvis.findLatest);

    // Retrieve a single Note with noteId
    app.get('/ruuvis/findLastDay', ruuvis.findLastDay);

}
