const sql = require("./db.js");

// constructor
const Facture = function (facture) {
  this.numeroFacture = facture.numeroFacture;
  this.typeFacture = facture.typeFacture;
  this.dateFacture = facture.dateFacture;
  this.valide = facture.valide;
  this.idEtat = facture.idEtat;
};

Facture.create = (newFacture, result) => {
  console.log(newFacture);

    sql.query("INSERT INTO facture SET ?", newFacture, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created facture: ", { id: res.insertId, ...newFacture });
      result(null, { id: res.insertId, ...newFacture });
    });

};

Facture.findById = (factureId, result) => {
  sql.query(`SELECT * FROM facture WHERE idFacture = ${factureId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found facture: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Facture with the id
    result({ kind: "not_found" }, null);
  });
};

Facture.getAll = result => {
  sql.query("SELECT * FROM facture", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facture: ", res);
    result(null, res);
  });
};

Facture.updateById = (id, facture, result) => {

    sql.query(
      "UPDATE facture SET numeroFacture = ?, typeFacture = ?, dateFacture = ?, valide = ?, idEtat = ?",
      [facture.numeroFacture, facture.typeFacture, facture.dateFacture, facture.valide, facture.idEtat, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Facture with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated facture: ", { id: id, ...facture });
        result(null, { id: id, ...facture });
      }
    );

};

Facture.remove = (id, result) => {
  sql.query("DELETE FROM facture WHERE idFacture = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Facture with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted facture with id: ", id);
    result(null, res);
  });
};

Facture.removeAll = result => {
  sql.query("DELETE FROM facture", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} facture`);
    result(null, res);
  });
};

module.exports = Facture;
