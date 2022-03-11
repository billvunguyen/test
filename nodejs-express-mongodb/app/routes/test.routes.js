module.exports = app => {
    const test = require("../controllers/test.controller.js");
    var router = require("express").Router();
    // Create a new data
    router.post("/", test.create);
    // Retrieve all data
    router.get("/", test.findAll);
    // Retrieve all published data
    router.get("/published", test.findAllPublished);
    // Retrieve a single data with id
    router.get("/:id", test.findOne);
    // Update data with id
    router.put("/:id", test.update);
    // Delete data with id
    router.delete("/:id", test.delete);
    // Delete all data
    router.delete("/", test.deleteAll);
    app.use('/api/test', test);
};