const sql = require("./db.js");

// constructor
const Client = function (client) {
  this.nomClient = client.nomClient;
  this.mailClient = client.mailClient;
  this.adresse = client.adresse;
};

Client.create = (newClient, result) => {
  console.log(newClient);

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(newClient.mailClient)) {
    sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created client: ", { id: res.insertId, ...newClient });
      result(null, { id: res.insertId, ...newClient });
    });
  }
  else {
    console.log("Adresse eMail non valide");
    result("eMail non valide", null);
    return;
  }


};

Client.findById = (clientId, result) => {
  sql.query(`SELECT * FROM client WHERE idClient = ${clientId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Client with the id
    result({ kind: "not_found" }, null);
  });
};

Client.getAll = result => {
  sql.query("SELECT * FROM client ORDER BY nomClient", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("client: ", res);
    result(null, res);
  });
};

Client.updateById = (id, client, result) => {

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(client.mailClient)) {
    sql.query(
      "UPDATE client SET nomClient = ?, mailClient = ?, adresse = ? WHERE idClient = ?",
      [client.nomClient, client.mailClient, client.adresse, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Client with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated client: ", { id: id, ...client });
        result(null, { id: id, ...client });
      }
    );
  }
  else {
    console.log("Adresse eMail non valide");
    result("eMail non valide", null);
    return;
  }

};

Client.remove = (id, result) => {
  sql.query("DELETE FROM client WHERE idClient = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted client with id: ", id);
    result(null, res);
  });
};

Client.removeAll = result => {
  sql.query("DELETE FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} client`);
    result(null, res);
  });
};

module.exports = Client;
