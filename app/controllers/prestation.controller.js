const Prestation = require("../models/prestation.model.js");

// Create and Save a new Prestation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Prestation
  const prestation = new Prestation({
    libellePrestation: req.body.libellePrestation
  });

  // Save Prestation in the database
  Prestation.create(prestation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Prestation."
      });
    else res.send(data);
  });
};

// Retrieve all Prestation from the database.
exports.findAll = (req, res) => {
  Prestation.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving prestation."
      });
    else res.send(data);
  });
};

// Find a single Prestation with a prestationId
exports.findOne = (req, res) => {
  Prestation.findById(req.params.prestationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prestation with id ${req.params.prestationId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Prestation with id " + req.params.prestationId
        });
      }
    } else res.send(data);
  });
};

// Update a Prestation identified by the prestationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Prestation.updateById(
    req.params.prestationId,
    new Prestation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Prestation with id ${req.params.prestationId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Prestation with id " + req.params.prestationId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Prestation with the specified prestationId in the request
exports.delete = (req, res) => {
  Prestation.remove(req.params.prestationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prestation with id ${req.params.prestationId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Prestation with id " + req.params.prestationId
        });
      }
    } else res.send({ message: `Prestation was deleted successfully!` });
  });
};

// Delete all Prestation from the database.
exports.deleteAll = (req, res) => {
  Prestation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all prestation."
      });
    else res.send({ message: `All Prestation were deleted successfully!` });
  });
};
