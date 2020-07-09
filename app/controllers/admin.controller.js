const Admin = require("../models/admin.model.js");

// Create and Save a new Admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Admin
  const admin = new Admin({
    nomAdmin: req.body.nomAdmin,
    mailAdmin: req.body.mailAdmin,
    passwordAdmin: req.body.passwordAdmin
  });

  // Save Admin in the database
  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the admin."
      });
    else res.send(data);
  });
};

// Retrieve all Admin from the database.
exports.findAll = (req, res) => {
  Admin.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving admin."
      });
    else res.send(data);
  });
};

// Find a single Admin with a adminId
exports.findOne = (req, res) => {
  Admin.findById(req.params.adminId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.adminId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with id " + req.params.adminId
        });
      }
    } else res.send(data);
  });
};

// Find a single Admin with a nomAdmin
exports.login = (req, res) => {
  console.log(req.body);
  
  Admin.findByNom(req.body.nomAdmin, req.body.passwordAdmin, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(201).send({
          message: `Not found Admin with id ${req.params.nomAdmin}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with id " + req.params.nomAdmin
        });
      }
    } else res.send(data);
  });
  
};

// Update a Admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Admin.updateById(
    req.params.adminId,
    new Admin(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Admin with id ${req.params.adminId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Admin with id " + req.params.adminId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Admin with the specified adminId in the request
exports.delete = (req, res) => {
  Admin.remove(req.params.adminId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.adminId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Admin with id " + req.params.adminId
        });
      }
    } else res.send({ message: `Admin was deleted successfully!` });
  });
};

// Delete all Admin from the database.
exports.deleteAll = (req, res) => {
  Admin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all admin."
      });
    else res.send({ message: `All Admin were deleted successfully!` });
  });
};
