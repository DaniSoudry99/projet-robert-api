const Client = require("../models/client.model.js");

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Client
  const client = new Client({
    nomClient: req.body.nomClient,
    mailClient: req.body.mailClient,
    adresse: req.body.adresse
  });

  // Save Client in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(201).send({
        message:
          err.message || "Erreur, eMail non valide"
      }); 
    else res.send(data);
  });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving client."
      });
    else res.send(data);
  });
};

// Find a single Client with a clientId
exports.findOne = (req, res) => {
  Client.findById(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.clientId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Client with id " + req.params.clientId
        });
      }
    } else res.send(data);
  });
};

// Update a Client identified by the clientId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Client.updateById(
    req.params.clientId,
    new Client(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(201).send({
            message: `Not found Client with id ${req.params.clientId}.`
          });
        } else {
          res.status(201).send({
            message: "Adresse eMail invalide"
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Client with the specified clientId in the request
exports.delete = (req, res) => {
  Client.remove(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.clientId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Client with id " + req.params.clientId
        });
      }
    } else res.send({ message: `Client was deleted successfully!` });
  });
};

// Delete all Client from the database.
exports.deleteAll = (req, res) => {
  Client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all client."
      });
    else res.send({ message: `All Client were deleted successfully!` });
  });
};
