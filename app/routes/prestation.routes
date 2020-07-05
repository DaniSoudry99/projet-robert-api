const sql = require("./db.js");

// constructor
const Etat = function(etat) {
  this.nomEtat = etat.nomEtat;
};

Etat.create = (newEtat, result) => {
  sql.query("INSERT INTO etat SET ?", newEtat, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created etat: ", { id: res.insertId, ...newEtat });
    result(null, { id: res.insertId, ...newEtat });
  });
};

Etat.findById = (etatId, result) => {
  sql.query(`SELECT * FROM etat WHERE idEtat = ${etatId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found etat: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Etat with the id
    result({ kind: "not_found" }, null);
  });
};

Etat.getAll = result => {
  sql.query("SELECT * FROM etat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("etat: ", res);
    result(null, res);
  });
};

Etat.updateById = (id, etat, result) => {
  sql.query(
    "UPDATE etat SET nomEtat = ? WHERE idEtat = ?",
    [etat.nomEtat, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Etat with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated etat: ", { id: id, ...etat });
      result(null, { id: id, ...etat });
    }
  );
};

Etat.remove = (id, result) => {
  sql.query("DELETE FROM etat WHERE idEtat = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Etat with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted etat with id: ", id);
    result(null, res);
  });
};

Etat.removeAll = result => {
  sql.query("DELETE FROM etat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} etat`);
    result(null, res);
  });
};

module.exports = Etat;
