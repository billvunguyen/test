const db = require("../models");
const Test = db.test;
// Create and save data.
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({message: "Name can not be empty!"});
        return;
    }
    if (!req.body.type) {
        res.status(400).send({message: "Type can not be empty!"});
        return;
    }
    if (!req.body.price) {
        res.status(400).send({message: "Price can not be empty!"});
        return;
    }
    if (!req.body.warranty_years) {
        res.status(400).send({message: "Warranty years can not be empty!"});
        return;
    }
    if (!req.body.available) {
        res.status(400).send({message: "Available status can not be empty!"});
        return;
    }
    // Create data
    const test = new Test ({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.warranty_years,
        available: req.body.available
    });
    // Save data in the database
    test
        .save(test)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating the data."
            });
        });
};
// Retrieve all data from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i"} } : {};
    Test.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving data."
            });
        });
};
// Find a single data with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Test.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found data with id " + id});
            } else {
                res.send(data);
            }
        })
};
// Update data by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Test.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update with id=${id}. Maybe data was not found.`
                });
            } else {
                res.send({ message: "Data was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating data with id=" + id
            });
        });
};
// Delete data with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Test.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete data with id=${id}. Maybe data was not found.`
                });
            } else {
                res.send({
                    message: "Data was deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Cound not delete data with id=" + id
            });
        });
};
// Delete all data from the database
exports.deleteAll = (req, res) => {
    Test.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} All data were deleted successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while removing all data"
            });
        });
};
// Find all published data
exports.findAllPublished = (req, res) => {
    Test.find({ published : true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while retrieving data."
            });
        });
};