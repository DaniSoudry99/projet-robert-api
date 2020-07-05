const Prestation = require("../models/Prestation.model.js");

// Create and Save a new Presation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Presation
  const Prestation= new prestation({
    nomPresation: req.body.nomPresation
  });

  // Save prestation in the database
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
          err.message || "Some error occurred while retrieving Prestation."
      });
    else res.send(data);
  });
};

// Find a single Prestation with a prestationId
exports.findOne = (req, res) => {
  Prestation.findById(req.params.PrestationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Prestation with id ${req.params.PrestationId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Prestation with id " + req.params.PrestationId
        });
      }
    } else res.send(data);
  });
};

// Update a Prestation identified by the PrestationId in the request
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
            message: `Not found Prestation with id ${req.params.PrestationId}.`
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

// Delete a Prestation with the specified etatId in the request
exports.delete = (req, res) => {
  Prestation.remove(req.params.prestationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found prestation with id ${req.params.prestationId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Etat with id " + req.params.prestationId
        });
      }
    } else res.send({ message: `prestation was deleted successfully!` });
  });
};

// Delete all prestation from the database.
exports.deleteAll = (req, res) => {
  Prestation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Prestation."
      });
    else res.send({ message: `All Prestation were deleted successfully!` });
  });
};
