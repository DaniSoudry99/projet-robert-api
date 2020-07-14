const Consultation = require("../models/consultation.model.js");

// Create and Save a new Consultation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Consultation
  const consultation = new Consultation({
    date: req.body.date,
    heureArrivee: req.body.heureArrivee,
    duree: req.body.duree,
    facturer: req.body.facturer,
    montant: req.body.montant,
    idConsultant: req.body.idConsultant,
    idClient: req.body.idClient,
    idPrestation: req.body.idPrestation,
    numeroFacture: req.body.numeroFacture,
  });

  // Save Consultation in the database
  Consultation.create(consultation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Consultation."
      });
    else res.send(data);
  });
};

// Retrieve all Consultation from the database.
exports.findAll = (req, res) => {
  Consultation.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consultation."
      });
    else res.send(data);
  });
};

// Find a single Consultation with a consultationId
exports.findOne = (req, res) => {
  Consultation.findById(req.params.consultationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consultation with id ${req.params.consultationId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Consultation with id " + req.params.consultationId
        });
      }
    } else res.send(data);
  });
};

// Consultation d'un consultant avec les clients et les prestations
exports.findConsultant = (req, res) => {
  Consultation.findByIdAll(req.body.consultantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consultation with id ${req.body.consultantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Consultation with id " + req.body.consultantId
        });
      }
    } else res.send(data);
  });
};

// Update a Consultation identified by the consultationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Consultation.updateById(
    req.params.consultationId,
    new Consultation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Consultation with id ${req.params.consultationId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Consultation with id " + req.params.consultationId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Consultation with the specified consultationId in the request
exports.delete = (req, res) => {
  Consultation.remove(req.params.consultationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consultation with id ${req.params.consultationId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Consultation with id " + req.params.consultationId
        });
      }
    } else res.send({ message: `Consultation was deleted successfully!` });
  });
};

// Delete all Consultation from the database.
exports.deleteAll = (req, res) => {
  Consultation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all consultation."
      });
    else res.send({ message: `All Consultation were deleted successfully!` });
  });
};
