const sql = require("./db.js");

// constructor
const Consultation = function (consultation) {
  this.date = consultation.date;
  this.heureArrivee = consultation.heureArrivee;
  this.duree = consultation.duree;
  this.facturer = consultation.facturer;
  this.montant = consultation.montant;
  this.idConsultant = consultation.idConsultant;
  this.idClient = consultation.idClient;
  this.idPrestation = consultation.idPrestation;
  this.numeroFacture = consultation.numeroFacture;
};

Consultation.create = (newConsultation, result) => {
  console.log(newConsultation);

    sql.query("INSERT INTO consultation SET ?", newConsultation, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created consultation: ", { id: res.insertId, ...newConsultation });
      result(null, { id: res.insertId, ...newConsultation });
    });

};

Consultation.findById = (consultationId, result) => {
  sql.query(`SELECT * FROM consultation WHERE idConsultation = ${consultationId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found consultation: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Consultation with the id
    result({ kind: "not_found" }, null);
  });
};

Consultation.findByIdAll = (consultantId, result) => {
  sql.query(`SELECT idConsultation, date, nomClient, libellePrestation 
            FROM consultation, client, prestation 
            WHERE prestation.idPrestation = consultation.idPrestation AND client.idClient = consultation.idClient AND idConsultant = ${consultantId} ORDER BY date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found consultation: ", res);
      result(null, res);
      return;
    }

    // not found Consultation with the id
    result({ kind: "not_found" }, null);
  });
};

Consultation.getAll = result => {
  sql.query("SELECT * FROM consultation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("consultation: ", res);
    result(null, res);
  });
};

Consultation.updateById = (id, consultation, result) => {

    sql.query(
      "UPDATE consultation SET date = ?, heureArrivee = ?, duree = ?, facturer = ?, montant = ?, idClient = ?, idPrestation = ?, numeroFacture = ? WHERE idConsultation = ?",
      [consultation.date, consultation.heureArrivee, consultation.duree, consultation.facturer, consultation.montant, consultation.idClient, consultation.idPrestation, consultation.numeroFacture, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Consultation with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated consultation: ", { id: id, ...consultation });
        result(null, { id: id, ...consultation });
      }
    );

};

Consultation.remove = (id, result) => {
  sql.query("DELETE FROM consultation WHERE idConsultation = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Consultation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted consultation with id: ", id);
    result(null, res);
  });
};

Consultation.removeAll = result => {
  sql.query("DELETE FROM consultation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} consultation`);
    result(null, res);
  });
};

module.exports = Consultation;
