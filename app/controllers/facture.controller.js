const Facture = require("../models/facture.model.js");

// Create and Save a new Facture
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Facture
  const facture = new Facture({
    numeroFacture: req.body.numeroFacture,
    typeFacture: req.body.typeFacture,
    dateFacture: req.body.dateFacture,
    valide: req.body.valide,
    idEtat: req.body.idEtat,
  });

  // Save Facture in the database
  Facture.create(facture, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Facture."
      });
    else res.send(data);
  });
};

// Retrieve all Facture from the database.
exports.findAll = (req, res) => {
  Facture.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving facture."
      });
    else res.send(data);
  });
};

// Find a single Facture with a factureId
exports.findOne = (req, res) => {
  Facture.findById(req.params.factureId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Facture with id ${req.params.factureId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Facture with id " + req.params.factureId
        });
      }
    } else res.send(data);
  });
};

// Update a Facture identified by the factureId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Facture.updateById(
    req.params.factureId,
    new Facture(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Facture with id ${req.params.factureId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Facture with id " + req.params.factureId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Facture with the specified factureId in the request
exports.delete = (req, res) => {
  Facture.remove(req.params.factureId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Facture with id ${req.params.factureId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Facture with id " + req.params.factureId
        });
      }
    } else res.send({ message: `Facture was deleted successfully!` });
  });
};

// Delete all Facture from the database.
exports.deleteAll = (req, res) => {
  Facture.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all facture."
      });
    else res.send({ message: `All Facture were deleted successfully!` });
  });
};
