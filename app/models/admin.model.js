const sql = require("./db.js");
var passwordHash = require('password-hash');

// constructor
const Admin = function (admin) {
    this.nomAdmin = admin.nomAdmin;
    this.mailAdmin = admin.mailAdmin;
    this.passwordAdmin = admin.passwordAdmin;
};

Admin.create = (newAdmin, result) => {
    console.log(newAdmin);

    var hashedPassword = passwordHash.generate(newAdmin.passwordAdmin);
    newAdmin.passwordAdmin = hashedPassword;

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(newAdmin.mailAdmin)) {
        sql.query("INSERT INTO administrateur SET ?", newAdmin, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created admin: ", { id: res.insertId, ...newAdmin });
            result(null, { id: res.insertId, ...newAdmin });
        });
    }
    else {
        console.log("Adresse eMail non valide");
        result("eMail non valide", null);
        return;
    }


};

Admin.findById = (adminId, result) => {
    sql.query(`SELECT * FROM administrateur WHERE idAdmin = ${adminId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found admin: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Admin with the id
        result({ kind: "not_found" }, null);
    });
};

Admin.findByNom = (nomAdmin, passwordAdmin, result) => {
    sql.query(`SELECT * FROM administrateur WHERE nomAdmin = '${nomAdmin}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found admin: ", res[0]);

            // Si le mot de passe est bon :
            if(passwordHash.verify(passwordAdmin, res[0].passwordAdmin)) {
                result(null, res[0]);
                return;
            }
            else {
                console.log("Mot de passe incorect: ", res[0]);
                result(null);
                return;
            }                  
            
        }
        else {
            console.log("admin introuvable: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Admin.getAll = result => {
    sql.query("SELECT * FROM administrateur", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Admin: ", res);
        result(null, res);
    });
};

Admin.updateById = (id, admin, result) => {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(admin.mailAdmin)) {
        sql.query(
            "UPDATE administrateur SET nomAdmin = ?, mailAdmin = ? WHERE idAdmin = ?",
            [admin.nomAdmin, admin.mailAdmin, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Admin with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated admin: ", { id: id, ...admin });
                result(null, { id: id, ...admin });
            }
        );
    }
    else {
        console.log("Adresse eMail non valide");
        result("eMail non valide", null);
        return;
    }


};

Admin.remove = (id, result) => {
    sql.query("DELETE FROM administrateur WHERE idAdmin = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Admin with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted admin with id: ", id);
        result(null, res);
    });
};

Admin.removeAll = result => {
    sql.query("DELETE FROM administrateur", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} admin`);
        result(null, res);
    });
};

module.exports = Admin;
