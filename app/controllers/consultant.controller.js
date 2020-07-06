const Consultant = require("../models/consultant.model.js");

// Create and Save a new Consultant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Consultant
  const consultant = new Consultant({
    nomConsultant: req.body.nomConsultant,
    mailConsultant: req.body.mailConsultant,
    passwordConsultant: req.body.passwordConsultant
  });

  // Save Consultant in the database
  Consultant.create(consultant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the consultant."
      });
    else res.send(data);
  });
};

// Retrieve all Consultant from the database.
exports.findAll = (req, res) => {
  Consultant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consultant."
      });
    else res.send(data);
  });
};

// Find a single Consultant with a consultantId
exports.findOne = (req, res) => {
  Consultant.findById(req.params.consultantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consultant with id ${req.params.consultantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Consultant with id " + req.params.consultantId
        });
      }
    } else res.send(data);
  });
};

// Find a single Consultant with a nomConsultant
exports.login = (req, res) => {
  Consultant.findByNom(req.body.nomConsultant, req.body.passwordConsultant, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(201).send({
          message: `Not found Consultant with id ${req.params.nomConsultant}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Consultant with id " + req.params.nomConsultant
        });
      }
    } else res.send(data);
  });
  
};

// Update a Consultant identified by the consultantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Consultant.updateById(
    req.params.consultantId,
    new Consultant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Consultant with id ${req.params.consultantId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Consultant with id " + req.params.consultantId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Consultant with the specified consultantId in the request
exports.delete = (req, res) => {
  Consultant.remove(req.params.consultantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Consultant with id ${req.params.consultantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Consultant with id " + req.params.consultantId
        });
      }
    } else res.send({ message: `Consultant was deleted successfully!` });
  });
};

// Delete all Consultant from the database.
exports.deleteAll = (req, res) => {
  Consultant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all consultant."
      });
    else res.send({ message: `All Consultant were deleted successfully!` });
  });
};
