const Etat = require("../models/etat.model.js");

// Create and Save a new Etat
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Etat
  const etat = new Etat({
    nomEtat: req.body.nomEtat
  });

  // Save Etat in the database
  Etat.create(etat, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Etat."
      });
    else res.send(data);
  });
};

// Retrieve all Etat from the database.
exports.findAll = (req, res) => {
  Etat.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving etat."
      });
    else res.send(data);
  });
};

// Find a single Etat with a etatId
exports.findOne = (req, res) => {
  Etat.findById(req.params.etatId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Etat with id ${req.params.etatId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Etat with id " + req.params.etatId
        });
      }
    } else res.send(data);
  });
};

// Update a Etat identified by the etatId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Etat.updateById(
    req.params.etatId,
    new Etat(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Etat with id ${req.params.etatId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Etat with id " + req.params.etatId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Etat with the specified etatId in the request
exports.delete = (req, res) => {
  Etat.remove(req.params.etatId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Etat with id ${req.params.etatId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Etat with id " + req.params.etatId
        });
      }
    } else res.send({ message: `Etat was deleted successfully!` });
  });
};

// Delete all Etat from the database.
exports.deleteAll = (req, res) => {
  Etat.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all etat."
      });
    else res.send({ message: `All Etat were deleted successfully!` });
  });
};
