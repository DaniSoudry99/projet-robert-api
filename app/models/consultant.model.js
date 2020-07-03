const sql = require("./db.js");
var passwordHash = require('password-hash');

// constructor
const Consultant = function (consultant) {
    this.nomConsultant = consultant.nomConsultant;
    this.mailConsultant = consultant.mailConsultant;
    this.passwordConsultant = consultant.passwordConsultant;
};

Consultant.create = (newConsultant, result) => {
    console.log(newConsultant);

    var hashedPassword = passwordHash.generate(newConsultant.passwordConsultant);
    newConsultant.passwordConsultant = hashedPassword;

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(newConsultant.mailConsultant)) {
        sql.query("INSERT INTO consultant SET ?", newConsultant, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created consultant: ", { id: res.insertId, ...newConsultant });
            result(null, { id: res.insertId, ...newConsultant });
        });
    }
    else {
        console.log("Adresse eMail non valide");
        result("eMail non valide", null);
        return;
    }


};

Consultant.findById = (consultantId, result) => {
    sql.query(`SELECT * FROM consultant WHERE idConsultant = ${consultantId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found consultant: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Consultant with the id
        result({ kind: "not_found" }, null);
    });
};

Consultant.getAll = result => {
    sql.query("SELECT * FROM consultant", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Consultant: ", res);
        result(null, res);
    });
};

Consultant.updateById = (id, consultant, result) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(consultant.mailConsultant)) {
        sql.query(
            "UPDATE consultant SET nomConsultant = ?, mailConsultant = ? WHERE idConsultant = ?",
            [consultant.nomConsultant, consultant.mailConsultant, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Consultant with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated consultant: ", { id: id, ...consultant });
                result(null, { id: id, ...consultant });
            }
        );
    }
    else {
        console.log("Adresse eMail non valide");
        result("eMail non valide", null);
        return;
    }

};

Consultant.remove = (id, result) => {
    sql.query("DELETE FROM consultant WHERE idConsultant = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Consultant with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted consultant with id: ", id);
        result(null, res);
    });
};

Consultant.removeAll = result => {
    sql.query("DELETE FROM consultant", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} consultant`);
        result(null, res);
    });
};

module.exports = Consultant;
