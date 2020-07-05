const sql = require("./prestation.js");

// constructor
const Prestation = function(prestation) {
  this.nomPrestation = prestation.nomPrestation;
};

prestation.create = (newEtat, result) => {
  sql.query("INSERT INTO etat SET ?", newPrestation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Prestation: ", { id: res.insertId, ...newPrestation });
    result(null, { id: res.insertId, ...newPrestation });
  });
};

Prestation.findById = (prestationId, result) => {
  sql.query(`SELECT * FROM etat WHERE idprestation = ${prestationId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found prestation: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Prestation with the id
    result({ kind: "not_found" }, null);
  });
};

Prestation.getAll = result => {
  sql.query("SELECT * FROM prestation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("prestation: ", res);
    result(null, res);
  });
};

Prestation.updateById = (id, etat, result) => {
  sql.query(
    "UPDATE etat SET nomPrestation = ? WHERE idprestation = ?",
    [etat.nomPrestation, id],
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

      console.log("updated prestation: ", { id: id, ...prestation});
      result(null, { id: id, ...prestation});
    }
  );
};

Prestation.remove = (id, result) => {
  sql.query("DELETE FROM etat WHERE idprestation= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Prestation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted prestation with id: ", id);
    result(null, res);
  });
};

Prestation.removeAll = result => {
  sql.query("DELETE FROM prestation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} prestation`);
    result(null, res);
  });
};

module.exports = prestation;
