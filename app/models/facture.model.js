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

Facture.getAllInfo = result => {
  sql.query(
    "select DISTINCT idFacture, facture.numeroFacture, dateFacture, etat.nomEtat, nomConsultant, nomClient from facture, consultation, etat, consultant, client where facture.numeroFacture = consultation.numeroFacture AND etat.idEtat = facture.idEtat and consultant.idConsultant = consultation.idConsultant and client.idClient = consultation.idClient order by dateFacture desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facture: ", res);
    result(null, res);
  });
};

Facture.getInfoFacture = (factureId, result) => {
  sql.query(
    "select adresse, nomClient, mailClient, dateFacture, facture.numeroFacture, etat.nomEtat from facture, consultation, etat, consultant, client where facture.numeroFacture = consultation.numeroFacture AND etat.idEtat = facture.idEtat and consultant.idConsultant = consultation.idConsultant and client.idClient = consultation.idClient and idFacture = ?",
    [factureId],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facture: ", res);
    result(null, res);
  });
};

Facture.factureAFaireSql = (result) => {
  sql.query(
    "select distinct idClient from consultation where numeroFacture = 'FA0000'",
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facture: ", res);
    result(null, res);
  });
};

Facture.factureMaxSql = (result) => {
  sql.query(
    "select max(numeroFacture) as max from consultation",
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facture: ", res);
    result(null, res);
  });
};

Facture.getInfoConsultationClient = (numeroFacture, result) => {
  sql.query(
    "select date, duree, nomConsultant, libellePrestation, montant from consultation, consultant, prestation where consultation.idConsultant = consultant.idConsultant and consultation.idPrestation = prestation.idPrestation and numeroFacture = ?", 
    [numeroFacture],
    (err, res) => {
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
